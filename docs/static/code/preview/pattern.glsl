#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_randseed0;
uniform vec2 dd_resolution;

uniform sampler2D dd_sampler0;

varying vec2 vTextureCoord;

void main() {
  vec2 st =  gl_FragCoord.xy / dd_resolution.xy;
  float d = sdf_circle(st, vec2(0.5), 0.5);
  d = fill(d);
  if(d > 0.0) {
    vec2 grid = vec2(4.0, 4.0);
    vec2 overlaps[4]; 
    grid_overlap(st, grid, overlaps);
    float d3 = 0.0;
    for(int i = 0; i < 4; i++) {
      vec2 st2 = overlaps[i];
      st2 *= 0.6;
      // st2 = skew(st2, vec2(0), vec2(1.0, 0.0));
      st2 = rotate(st2, vec2(0.0), - PI / 3.0);
      float d2 = shape_hypocycloid(st2, vec2(0), 4);
      d3 = udf_union(d3, d2);
    }
    color(d3, vec3(0.376, 0.337, 0.619));
  }
}