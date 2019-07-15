#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  float d = juila_set(st, vec2(0.5), 2.5, vec2(-0.8, 0.156), 0.01);
  gl_FragColor = vec4(vec3(d), 1.0);
}