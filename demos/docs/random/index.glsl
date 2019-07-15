#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  gl_FragColor.rgb = random(st) * vec3(1.0);
  gl_FragColor.a = 1.0;
}