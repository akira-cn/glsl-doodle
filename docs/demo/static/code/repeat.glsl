#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  st = fract(st * 10.0);

  float d = sdf_line(st, vec2(1.0));
  d = fill(d);

  gl_FragColor.rgb = d * vec3(1.0);
  gl_FragColor.a = 1.0;
}