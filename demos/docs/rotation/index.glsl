#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <transform>

uniform vec2 dd_resolution;
uniform float dd_time;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  st = rotate(st, vec2(0.5), PI * dd_time / 5.0);
  float d1 = fill(sdf_circle(st, vec2(0.5), 0.4));
  float d2 = shape_star(st, vec2(0.5));
  float d = udf_complement(d1, d2);

  gl_FragColor.rgb = d * vec3(1.0);
  gl_FragColor.a = 1.0;
}
