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

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  st.x += random(dd_randseed0) + 0.1 * dd_time; 
  gl_FragColor = vec4(hsb2rgb(vec3(mist(st), 1.0, 1.0)),1.0);
}