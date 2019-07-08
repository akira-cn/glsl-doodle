#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  
  st = fract(st * 5.0);
  st = abs(mix(vec2(-1), vec2(1), st)); 

  float d = sdf_line(st, vec2(1.0));
  d = step(0.0, d);

  gl_FragColor.rgb = d * vec3(1.0);
  gl_FragColor.a = 1.0;
}