#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution.xy;
  st = mix(vec2(-10, -10), vec2(10, 10), st);
  gl_FragColor = vec4(vec3(mist(st + dd_randseed0)), 1.0);
}