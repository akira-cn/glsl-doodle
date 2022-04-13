#pragma texture /fireworks/sampler0.png
uniform sampler2D dd_sampler0;

#define NUM_PARTICLES	75
#define NUM_FIREWORKS	5

vec3 pow3(vec3 v, float p)
{
    return pow(abs(v), vec3(p));
}

vec2 noise(vec2 tc)
{
    return (3.6*texture(iChannel0, tc).xy-1.).xy + 0.3;
}

vec3 fireworks(vec2 p)
{
    vec3 color = vec3(0., 0., 0.);
    
    for(int fw = 0; fw < NUM_FIREWORKS; fw++)
    {
        vec2 pos = noise(vec2(0.82, 0.11)*float(fw))*1.5;
    	float time = mod(iTime*3., 6.*(1.+noise(vec2(0.123, 0.987)*float(fw)).x));
        for(int i = 0; i < NUM_PARTICLES; i++)
    	{
        	vec2 dir = noise(vec2(0.512, 0.133)*float(i));
            dir.y -=time * 0.1;
            float term = 1./length(p-pos-dir*time)/50.;
            color += pow3(vec3(
                term * noise(vec2(0.123, 0.133)*float(i)).y,
                0.8 * term * noise(vec2(0.533, 0.133)*float(i)).x,
                0.5 * term * noise(vec2(0.512, 0.133)*float(i)).x),
                          1.25);
        }
    }
    return color;
}

// vec3 fireworks(vec2 p)
// {
//     vec3 color = vec3(0., 0., 0.);
    
//     for(int fw = 0; fw < NUM_FIREWORKS; fw++)
//     {
//         // vec2 pos = noise(vec2(0.82, 0.11)*float(fw))*1.5;
//     	// float time = mod(iTime*3., 6.*(1.+noise(vec2(0.123, 0.987)*float(fw)).x));
//         for(int i = 0; i < NUM_PARTICLES; i++)
//     	{
//         	// vec2 dir = noise(vec2(0.512, 0.133)*float(i));
//             // dir.y -=time * 0.1;
//             float term = 1./length(p)/50.;
//             color += pow3(vec3(
//                 term * noise(vec2(0.123, 0.133)*float(i)).y,
//                 0.0,
//                 0.0),
//                           1.25);
//         }
//     }
//     return color;
// }


vec3 flag(vec2 p)
{
    vec3 color;
    
    p.y += sin(p.x*1.3+iTime)*0.1;
    
    if(p.y > 0.) 	color = vec3(1.);
    else			color = vec3(1., 0., 0.);
    
    color *= sin(3.1415/2. + p.x*1.3+iTime)*0.3 + 0.7;
    
    return color * 0.15;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 p = 2. * fragCoord / iResolution.xy - 1.;
    p.x *= iResolution.x / iResolution.y;
    
  vec3 color = fireworks(p); // + flag(p);
  fragColor = vec4(color, 1.);
}