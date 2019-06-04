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

uniform sampler2D dd_sampler0;

varying vec2 vTextureCoord;

void main() {
  vec2 st =  gl_FragCoord.xy / dd_resolution.xy;

  box2 box = create_box(vec2(0.25), 0.5, 0.5);

  // box.a = vec2(0.25, 0.25);
  // box.b = vec2(0.75, 0.25);
  // box.c = vec2(0.75, 0.75) + vec2(0.2, 0);
  // box.d = vec2(0.25, 0.75) + vec2(0.2, 0);

  // box = rotate(box, vec2(0.5), PI / 10.0);
  // box = translate(box, vec2(0.1, 0.0));
  // box = scale(box, vec2(0.5), vec2(1.5, 1.0));
  box = skew(box, vec2(0.5), vec2(0.7, 0.0));

  st = box_quad(st, box);
  
  // st = rotate(st, vec2(0.5), PI / 10.0);
  // st = skew(st, vec2(0.5), vec2(0.5, 0.0));
  // st = scale(st, vec2(0.5), vec2(1.0, 1.0));
  
  float d = sdf_rect(st, vec2(0.25), 0.5, 0.5);
  // d = sdf_arc(st, vec2(0.25), 0.5, 0.0, PI / 2.0);
  d = fill(d);

  color(d, vec3(0.376, 0.337, 0.619));
}