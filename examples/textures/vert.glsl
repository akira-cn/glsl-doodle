#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <pattern>

attribute vec4 a_position;
attribute vec2 a_vertexTextureCoord;

varying highp vec2 vTextureCoord;

uniform float dd_time;
uniform vec2 dd_randseed;

void main() {
  vec2 idx = grid_index(vec2(a_position.x, a_position.y), vec2(10.0, 10.0));

  gl_PointSize = 1.0;
  gl_Position.x = a_position.x;
  gl_Position.y = a_position.y;
  gl_Position.z = a_position.z;
  gl_Position.w = 1.0;

  vTextureCoord = a_vertexTextureCoord;
}