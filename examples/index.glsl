#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>
#pragma include "./common.glsl"

#define PI 3.14159265

uniform vec2 abc;
uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;
uniform vec2 dd_randseed0;

void main()
{
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 grid = vec2(10, 10);
  vec2 idx = grid_index(st, grid);
  st = grid_xy(st, grid);
  // st = scale(st, vec2(0, 0), vec2(2.0));
  // box2 box = create_box(vec2(0), dd_resolution);
  // box = rotate(box, center(box), PI / 4.0);
  // vec2 st = box_quad(gl_FragCoord.xy, box) * dd_resolution;

  box2 box = create_box();
  box = scale(box, center(box), vec2(random(idx, 0.1, 0.9)));
  st = box_quad(st, box);
  // st = st * 2.0;

  float pct = rect(st, vec2(0), vec2(1.0), 0.0);
  // color(pct, vec3(1.0, 0, 0));
  color(pct, random_color3(idx + 1001.0));
}