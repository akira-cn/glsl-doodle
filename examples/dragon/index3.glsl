#pragma textureCube https://p4.ssl.qhimg.com/t01eb48da1b3e7c8de4.jpg
#pragma textureCube https://p1.ssl.qhimg.com/t01a365f7cfc83ebbb3.jpg
#pragma textureCube https://p0.ssl.qhimg.com/t01db68930648b8ba1e.jpg
#pragma textureCube https://p4.ssl.qhimg.com/t015cde123f5635367b.jpg
#pragma textureCube https://p2.ssl.qhimg.com/t019196e11c3e2175c0.jpg
#pragma textureCube https://p0.ssl.qhimg.com/t01e9aea217eb52dde0.jpg
#pragma texture https://p1.ssl.qhimg.com/t01cf27d8f7c45281b4.png

uniform samplerCube dd_sampler0;
uniform sampler2D dd_sampler1;

vec2 Path(vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
	f = f*f*(3.-2.*f);
	return textureLod(iChannel1, (p+vec2(37.5,17.5) + f)/256.0, 0.).xy;
}

#define S(x) vec4(Path(x*vec2(.04,.1))*vec2(6,9),0,0)

void mainImage( out vec4 o, in vec2 C ) {
    vec4 p = vec4(C.xy,0,0)/iResolution.xyxy-.5, d=p, t, c, s;
    p.z += iTime*8.;
    p -= S(p.z);
    float x, r, w, i;
    for(i=1.5; i>0.; i-=.01)
    {
        // Select one of 5 type of wood beam separation
        vec2 z = (p.zz-2.)*.25;
        z = Path(z - fract(z))*4.+.5;
        z = (z - fract(z))/10.;
        z = mix(z, vec2(1.), step(vec2(.4), z));      
        z *= step(4., mod(p.z-2., 8.));
		float f = mix(z.x, z.y, step(p.x, 0.));                
        
        t = abs(mod(c=p+S(p.z), 8.)-4.);
        w = step(0., c.y);
        r = (step(2.6, t.x) - step(2.8, t.x)) * w;        
        s = texture(iChannel0, (c.y*t.x > 3. ? t.zxy:t.yzx)-3.);
        x = min(t.x + f, t.y)-s.x * (1.-r) - r*.8;  
                       
        if(x < .01) break;
        p -= d*x*.5;
     }
    w = step(t.x, 0.8) * step(2.8, t.z) + step(2.8, t.x) * step(0., c.y);
	o = p.wyyw*.02 + 1.3* mix(s, vec4(.8), r) * mix(vec4(1), vec4(1,.5,.2,1), w ) * i/p.w;
}