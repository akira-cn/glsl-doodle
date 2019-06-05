#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

void main() {
	vec2 st = gl_FragCoord.xy / dd_resolution.xy;

  st = polar(st, vec2(0.5));

	float d = sdf_ellipse(st, vec2(0.5), 0.5, 0.3);
	vec3 color = vec3(fill(d, 0.02));

	gl_FragColor = vec4(color, 1.0);
}