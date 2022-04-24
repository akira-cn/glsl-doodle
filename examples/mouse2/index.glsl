#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>

uniform vec2 dd_resolution;
uniform vec4 dd_mousePosition;
uniform vec3 dd_mouseDown;
uniform vec2 dd_keyEvent;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec3 color = vec3(0.0);

  if(dd_mousePosition.x > 0.0) {
    float d = sdf_circle(st, dd_mousePosition.xy, 0.15);
    if(d > 0.0) color = d * vec3(1.0, dd_mousePosition.z, 0);
  }
  if(dd_mouseDown.x > 0.0) {
    float d = sdf_circle(st, dd_mouseDown.xy, 0.15);
    if(d >= 0.0) color += d * vec3(0.0, dd_mouseDown.z, 1.0);
  }

  if(dd_keyEvent.x == 65.0 && dd_keyEvent.y == 1.0) {
    color = vec3(1, 0, 0);
  }

  gl_FragColor = vec4(color, 1.0);
}