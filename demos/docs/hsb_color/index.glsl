#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  vec3 color = vec3(0.0);

  st = polar(st);

  // Map the angle (-PI to PI) to the Hue (from 0 to 1)
  // and the Saturation to the radius
  color = HSB((0.5 * st.y / PI) + 0.5, st.x, 1.0);

  gl_FragColor = vec4(color, 1.0);
}