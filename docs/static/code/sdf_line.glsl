#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 line = vec2(0.5);
  float d = sdf_line(st, line);
  d = stroke(d, 0.02);
  gl_FragColor.rgb = d * vec3(1.0);
  gl_FragColor.a = 1.0;
}