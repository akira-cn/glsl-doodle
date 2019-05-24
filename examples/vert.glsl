#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <pattern>

attribute vec4 vPosition;

uniform float dd_time;
uniform vec2 dd_randseed;

void main()
{
  vec2 idx = grid_index(vec2(vPosition.x, vPosition.y), vec2(10.0, 10.0));

  gl_PointSize = 1.0;
  gl_Position.x = vPosition.x;
  gl_Position.y = vPosition.y;
  gl_Position.z = vPosition.z;
  gl_Position.w = 1.0;
}