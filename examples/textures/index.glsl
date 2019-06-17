#ifdef GL_ES
precision mediump float;
#endif

#pragma texture https://p4.ssl.qhimg.com/t012170360e1552ce17.png
#pragma texture https://p3.ssl.qhimg.com/t01a01fe1b96d05edcd.png

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

varying highp vec2 vTextureCoord;
uniform sampler2D dd_sampler0;
uniform sampler2D dd_sampler1;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 grid = vec2(10, 10);
  vec2 idx = grid_index(st, grid);
  st = grid_xy(st, grid);

  box2 box = create_box();
  box = scale(box, center(box), vec2(random(idx, 0.1, 0.9)));
  st = box_quad(st, box);
  // st = st * 2.0;

  float pct = sdf_rect(st, vec2(0), 1.0, 1.0);
  // color(pct, vec3(1.0, 0, 0));
  // color(pct, random_color3(idx + 1001.0));

  gl_FragColor = fill(pct, 0.0) * texture2D(dd_sampler0, vTextureCoord) * texture2D(dd_sampler1, vTextureCoord);
}