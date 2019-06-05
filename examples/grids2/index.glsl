#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 grid = vec2(10, 10);
  vec2 idx = grid_index(st, grid);
  st = grid_xy(st, grid);

  box2 box = create_box();
  box = scale(box, center(box), vec2(random(idx, 0.1, 0.9)));
  st = box_quad(st, box);

  float pct = sdf_rect(st, vec2(0), 1.0, 1.0);
  color(fill(pct, 0.0), random3(idx + dd_randseed0));
}