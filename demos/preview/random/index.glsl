#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 grid = vec2(10, 10);
  vec2 idx = grid_index(st, grid);

  st = grid_xy(st, grid);
  st = mix(vec2(-10, -10), vec2(10, 10), st);
  
  float pct = 1.0;

  if(random(idx + dd_randseed0) > 0.5) {
    if(grid_odd_row(idx, grid)) {
      st = scale(st, vec2(-1.0, -1.0));
    }

    if(grid_odd(idx, grid)) {
      pct = sdf_triangle(st, vec2(10, -10), vec2(10, 10), vec2(-10, 10));
    } else {
      pct = sdf_triangle(st, vec2(-10, -10), vec2(-10, 10), vec2(10, 10));
    }

    color(fill(pct, 0.05), random3(idx));
  }
}