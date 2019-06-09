#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  vec2 a = vec2(0.2, 0.2);
  vec2 b = vec2(0.2, 0.7);
  vec2 c = vec2(0.7, 0.7);
  vec2 d = vec2(0.7, 0.2);

  float d1 = sdf_line(st, a, b);
  float d2 = sdf_line(st, b, c);
  float d3 = sdf_line(st, c, d);
  float d4 = sdf_line(st, d, a);
  
  d1 = step(0.0, d1);
  d2 = step(0.0, d2);
  d3 = step(0.0, d3);
  d4 = step(0.0, d4);

  gl_FragColor.rgb = d1 * d2 * d3 * d4 *vec3(1.0);
  gl_FragColor.a = 1.0;
}