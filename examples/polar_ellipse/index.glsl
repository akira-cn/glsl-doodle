#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

#define PI 3.14159265

uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;
uniform vec2 dd_randseed0;

void main()
{
	vec2 st = gl_FragCoord.xy / dd_resolution.xy;

  st = polar(st, vec2(0.5));

	vec3 color = vec3(ellipse(st, vec2(0.5), 0.5, 0.3, 0.2));

	gl_FragColor = vec4(color, 1.0);
}