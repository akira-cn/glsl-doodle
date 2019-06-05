#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;

void main()
{
  vec2 st = gl_FragCoord.xy / dd_resolution.xy;
  st.x *= dd_resolution.x / dd_resolution.y;

  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st * 2.0 - 1.0;

  // Make the distance field
  d = length(abs(st) - 0.3);
  // d = length(min(abs(st) - 0.3, 0.0));
  // d = length(max(abs(st) - 0.3, 0.0));

  // Visualize the distance field
  gl_FragColor = vec4(vec3(fract(d * 30.0)), 1.0);

  // Drawing with the distance field
  // gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  // gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}