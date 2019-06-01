#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform float dd_time;
uniform vec2 dd_randseed0;
uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 grid = vec2(100);
  vec2 idx = grid_index(st, grid);
  st = grid_xy(st, grid);
  float h = noise(random2(dd_randseed0 + idx) + 0.2 * dd_time);
  gl_FragColor = vec4(hsb2rgb(vec3(h, 1.0, 1.0)),1.0);
}