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

  vec3 color = vec3(0.0);

  st = polar(st);

  // Map the angle (-PI to PI) to the Hue (from 0 to 1)
  // and the Saturation to the radius
  color = hsb2rgb(vec3((0.5 * st.y / PI) + 0.5, st.x, 1.0));

  gl_FragColor = vec4(color, 1.0);
}