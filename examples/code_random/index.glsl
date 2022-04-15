#pragma texture /code_random/rgba-noise.png
#pragma texture /code_random/slider.glsl

uniform sampler2D dd_sampler0;
uniform sampler2D dd_sampler1;

// Created by sebastien durand - 11/2016
//-------------------------------------------------------------------------------------
// Based on "Type 2 Supernova" by Duke (https://www.shadertoy.com/view/lsyXDK) 
// Sliders from IcePrimitives by Bers (https://www.shadertoy.com/view/MscXzn)
// License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
//-------------------------------------------------------------------------------------

#define SPIRAL_NOISE_ITER 8
//#define SHANE_ORGANIC  // from: https://www.shadertoy.com/view/MsjBDR

float hash( const in vec3 p ) {
    return fract(sin(dot(p,vec3(127.1,311.7,758.5453123)))*43758.5453123);
}

float pn(in vec3 x) {
    vec3 p = floor(x), f = fract(x);
	f *= f*(3.-f-f);
	vec2 uv = (p.xy+vec2(37,17)*p.z) + f.xy,
	     rg = textureLod( iChannel0, (uv+.5)/256., -100.).yx;
	return 2.4*mix(rg.x, rg.y, f.z)-1.;
}

//-------------------------------------------------------------------------------------
// otaviogood's noise from https://www.shadertoy.com/view/ld2SzK
//--------------------------------------------------------------
// This spiral noise works by successively adding and rotating sin waves while increasing frequency.
// It should work the same on all computers since it's not based on a hash function like some other noises.
// It can be much faster than other noise functions if you're ok with some repetition.
const float nudge = 20.;	// size of perpendicular vector
float normalizer = 1.0 / sqrt(1.0 + nudge*nudge);	// pythagorean theorem on that perpendicular to maintain scale
float SpiralNoiseC(vec3 p, vec4 id) {
    float iter = 2., n = 2.-id.x; // noise amount
    for (int i = 0; i < SPIRAL_NOISE_ITER; i++) {
        // add sin and cos scaled inverse with the frequency
        n += -abs(sin(p.y*iter) + cos(p.x*iter)) / iter;	// abs for a ridged look
        // rotate by adding perpendicular and scaling down
        p.xy += vec2(p.y, -p.x) * nudge;
        p.xy *= normalizer;
        // rotate on other axis
        p.xz += vec2(p.z, -p.x) * nudge;
        p.xz *= normalizer;  
        // increase the frequency
        iter *= id.y + .733733;
    }
    return n;
}

#ifdef SHANE_ORGANIC
float map(vec3 p, vec4 id) {
    float k = 2.*id.w +.1;  // p/=k;
    p *=(.5+4.*id.y);
    return k*(.1+abs(dot(p = cos(p*.6 + sin(p.zxy*1.8)), p) - 1.1)*3. + pn(p*4.5)*.12);
}
#else
float map(vec3 p, vec4 id) {
	float k = 2.*id.w +.1; //  p/=k;
    return k*(.5 + SpiralNoiseC(p.zxy*.4132+333., id)*3. + pn(p*8.5)*.12);
}
#endif

//-------------------------------------------------------------------------------------
// Based on [iq: https://www.shadertoy.com/view/MsS3Wc]
//-------------------------------------------------------------------------------------
vec3 hsv2rgb(float x, float y, float z) {	
	return z+z*y*(clamp(abs(mod(x*6.+vec3(0,4,2),6.)-3.)-1.,0.,1.)-1.);
}

//-------------------------------------------------------------------------------------
// Based on "Type 2 Supernova" by Duke (https://www.shadertoy.com/view/lsyXDK) 
//-------------------------------------------------------------------------------------
vec4 renderSuperstructure(vec3 ro, vec3 rd, const vec4 id) {
    const float max_dist=20.;
	float ld, td=0., w, d, t, noi, lDist, a,         
    	  rRef = 2.*id.x,
          h = .05+.25*id.z;
   
    vec3 pos, lightColor;   
    vec4 sum = vec4(0);
   	
    t = .3*hash(vec3(hash(rd))+iTime); 

    for (int i=0; i<200; i++)  {
		// Loop break conditions.
	    if(td>.9 ||  sum.a > .99 || t>max_dist) break;
        
        // Color attenuation according to distance
        a = smoothstep(max_dist,0.,t);
        
        // Evaluate distance function
        d = abs(map(pos = ro + t*rd, id))+.07;
        
        // Light calculations 
        lDist = max(length(mod(pos+2.5,5.)-2.5), .001); // TODO add random offset
        noi = pn(0.03*pos);
        lightColor = mix(hsv2rgb(noi,.5,.6), 
                         hsv2rgb(noi+.3,.5,.6), 
                         smoothstep(rRef*.5,rRef*2.,lDist));
        sum.rgb += a*lightColor/exp(lDist*lDist*lDist*.08)/30.;
		
        if (d<h) {
			td += (1.-td)*(h-d)+.005;  // accumulate density
            sum.rgb += sum.a * sum.rgb * .25 / lDist;  // emission	
			sum += (1.-sum.a)*.05*td*a;  // uniform scale density + alpha blend in contribution 
        } 
		
        td += .015;
        t += max(d * .08 * max(min(lDist,d),2.), .01);  // trying to optimize step size
    }
    
    // simple scattering
    sum *= 1. / exp(ld*.2)*.9;
   	sum = clamp(sum, 0., 1.);   
    sum.xyz *= sum.xyz*(3.-sum.xyz-sum.xyz);
	return sum;
}

// ---------------------------------------------------
// Bers : https://www.shadertoy.com/view/MscXzn
// ---------------------------------------------------
vec4 processSliders(in vec2 uv, out vec4 sliderVal) {
    sliderVal = textureLod(iChannel1,vec2(0),0.0);
    if(length(uv.xy)>1.) {
    	return textureLod(iChannel1,uv.xy/iResolution.xy,0.0);
    }
    return vec4(0);
}

#define R(p, a) p=cos(a)*p+sin(a)*vec2(p.y, -p.x)

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{   
    vec4 sliderVal, cSlider = processSliders(fragCoord, sliderVal);
    vec2 m = iMouse.xy/iResolution.xy;
    vec3 ro = vec3(15.+iTime, cos(.1*iTime), 15.+iTime),
		 rd = normalize(vec3((fragCoord.xy-0.5*iResolution.xy)/iResolution.y, 1.));
   
    R(rd.zx, 3.*m.x);
    R(rd.yx, 1.5*m.y);
    R(rd.xz, iTime*.1);
	   
    // Super Structure
	vec4 col = renderSuperstructure(ro, rd, sliderVal);

    //Apply slider overlay
    fragColor = vec4(mix(col.xyz + 0.5*vec3(.1,.2,.3),cSlider.rgb,cSlider.a), 1.);
}
