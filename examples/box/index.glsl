#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 abc;
uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

void draw(in vec2 st) {
  vec2 grid = vec2(3, 3);
  vec2 idx = grid_index(st, grid);
  st = mix(vec2(-10, -10), vec2(10, 10), st);
  float pct = sdf_circle(st, vec2(0, 0), 8.0);
  color(fill(pct, 0.05), random3(idx + dd_randseed0));
}

void main()
{ 
  vec2 pos = vec2(100.0 + 100.0 * sin(dd_time));

  box2 box = create_box(pos, 300.0, 300.0);
  box = rotate(box, center(box), PI / 4.0);
  // box = scale(box, pos, vec2(1.5));
  // box = skew(box, pos, vec2(0.25, 0.0));
  // box = translate(box, vec2(150.0, 150.0));

  vec2 st = box_quad(gl_FragCoord.xy, box);

  SPRITE(st, draw);
}