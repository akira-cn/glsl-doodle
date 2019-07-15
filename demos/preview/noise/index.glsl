#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>
#pragma include <pattern>

uniform float dd_time;
uniform vec2 dd_randseed0;
uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  st = mix(vec2(-10, -10), vec2(10, 10), st);
  
  float d = distance(st, vec2(0));
  d *= noise(dd_randseed0 + st + dd_time);
  d = fill(d, 1.0);

  gl_FragColor = vec4(vec3(d), 1.0);
}