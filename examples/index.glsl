#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <pattern>
#pragma include "./common.glsl"

#define PI 3.14159265

uniform vec2 abc;
uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;

float fx(in float x) {
  return 0.0;
}

float fy(in float x) {
  return 9999999.99 * x;
}

float f1(in float x) {
  return floor(x);
}

float f2(in float x) {
  return sin(2.0 * x) / x;
}

float f3(in float x) {
  return sqrt(1.0 - x * x);
}

float f4(in float x) {
  return -x - sin(x);
}

float f5(in float x) {
  return log(x);
}

void main()
{
  // gl_FragColor = vec4(abs(sin(dd_time)),0.0,0.0,1.0);
  // vec2 st = gl_FragCoord.xy / dd_resolution;
	// gl_FragColor = vec4(st, 0.0, 1.0);
  vec2 grid = vec2(10, 10);
	vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 idx = grid_index(st, grid);
  
  st = grid_xy(st, grid);
  st = lerp(st, vec2(-10, -10), vec2(10, 10));

  float r = - PI * dd_time * 0.2 * (idx.x * 5.0 + idx.y + 1.0);
  mat2 m = mat2(sin(r), cos(r), cos(r), -sin(r));

  st = m * st;

  vec3 color = line_seg(st, vec2(-3.0, -3.0), vec2(3.0, 3.0), 1.0) * vec3(1.0, 1.0, 1.0);

  // float t = dd_time;
  // vec3 color = pct * random_color(idx + dd_randseed);
  // vec3 color = random_color(idx + dd_randseed);
	gl_FragColor = vec4(color, 1.0);
}