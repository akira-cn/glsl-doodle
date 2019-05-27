#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

#define PI 3.14159265

uniform vec2 abc;
uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;

void main()
{
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 grid = vec2(10, 10);
  vec2 idx = grid_index(st, grid);

  st = grid_xy(st, grid);
  st = lerp(vec2(-10, -10), vec2(10, 10), st);
  
  float pct = 1.0;

  if(grid_odd_row(idx, grid)) {
    st = scale(st, vec2(0, 0), vec2(-1.0, -1.0));
  }

  if(grid_odd(idx, grid)) {
    pct = triangle(st, vec2(10, -10), vec2(10, 10), vec2(-10, 10), 0.05);
  } else {
    pct = triangle(st, vec2(-10, -10), vec2(-10, 10), vec2(10, 10), 0.05);
  }

  color(pct, random_color3(idx));
}