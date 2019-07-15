#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>

uniform vec2 dd_resolution;
uniform vec2 dd_mousePosition;
uniform int dd_mouseButtons;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec3 color = vec3(0.0);

  if(dd_mousePosition.x > 0.0) {
    float d = sdf_circle(st, dd_mousePosition, 0.15);
    color = d * vec3(1.0, float(dd_mouseButtons), 0);
  }

  gl_FragColor = vec4(color, 1.0);
}