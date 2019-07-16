// https://www.shadertoy.com/view/MdX3zr

#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>

uniform vec2 dd_resolution;
uniform float dd_time;

float sphere(vec3 p, vec4 spr)
{
  return length(spr.xyz-p) - spr.w;
}

float flame(vec3 p)
{
  float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,1.));
  return d + (noise(p+vec3(.0,dd_time*2.,0.)) + noise(p*3.)*.5)*.25*(p.y) ;
}

float scene(vec3 p)
{
  return min(100.-length(p) , abs(flame(p)) );
}

vec4 raymarch(vec3 org, vec3 dir)
{
  float d = 0.0, glow = 0.0, eps = 0.02;
  vec3  p = org;
  bool glowed = false;
  
  for(int i=0; i<64; i++)
  {
  	d = scene(p) + eps;
  	p += d * dir;
  	if( d>eps )
  	{
  		if(flame(p) < .0)
  			glowed=true;
  		if(glowed)
       			glow = float(i)/64.;
  	}
  }
  return vec4(p,glow);
}

void main()
{
  vec2 v = -1.0 + 2.0 * gl_FragCoord.xy / dd_resolution.xy;
  v.x *= dd_resolution.x/dd_resolution.y;

  vec3 org = vec3(0., -2., 4.);
  vec3 dir = normalize(vec3(v.x*1.6, -v.y, -1.5));

  vec4 p = raymarch(org, dir);
  float glow = p.w;

  vec3 col = mix(vec3(1.,.5,.1), vec3(0.1,.5,1.), p.y*.02+.4);
  
  gl_FragColor.rgb = mix(vec3(0.), col, pow(glow*2.,4.));
  gl_FragColor.a = 1.0;
  //fragColor = mix(vec4(1.), mix(vec4(1.,.5,.1,1.),vec4(0.1,.5,1.,1.),p.y*.02+.4), pow(glow*2.,4.));
}
