#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  vec2 a = vec2(0.2, 0.3);
  vec2 b = vec2(0.5, 0.7);
  vec2 c = vec2(0.7, 0.3);

  float d = sdf_triangle(st, a, b, c);
  d = fill(d, 0.1);

  gl_FragColor.rgb = d * vec3(1.0);
  gl_FragColor.a = 1.0;
}