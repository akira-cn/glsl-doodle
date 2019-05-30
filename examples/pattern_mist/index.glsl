#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;
uniform vec2 dd_randseed0;
uniform int dd_rendercount;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution.xy;
  st = mix(vec2(-5, -5), vec2(5, 5), st);
  gl_FragColor = vec4(vec3(mist(st + dd_randseed0)), 1.0);
}