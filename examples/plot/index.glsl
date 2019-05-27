#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <pattern>

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
  // return 0.0;
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
  vec2 grid = vec2(5, 5);
	vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 idx = grid_index(st, grid);
  
  // st = grid_xy(st, grid);
  st = lerp(vec2(-10, -10), vec2(10, 10), st);

  float stp = 0.1;
  float thick = 0.8;
  float smth = 0.2;

  // PLOT func, field, step, thick, smooth
  float px = PLOT(fx, st, 0.1, 0.1, 0.2);
  float py = PLOT(fy, st, 0.1, 0.1, 0.2);

  float p1 = PLOT(f1, st, stp, thick, smth);
  float p2 = PLOT(f2, st, stp, thick, smth);
  float p3 = PLOT(f3, st, stp, thick, smth);
  float p4 = PLOT(f4, st, stp, thick, smth);
  float p5 = PLOT(f5, st, stp, thick, smth);

  vec3 cx = px * vec3(1.0, 1.0, 1.0);
  vec3 cy = py * vec3(1.0, 1.0, 1.0);

  vec3 c1 = p1 * vec3(0, 1.0, 0);
  vec3 c2 = p2 * vec3(0, 1.0, 1.0);
  vec3 c3 = p3 * vec3(1.0, 1.0, 0);
  vec3 c4 = p4 * vec3(1.0, 0, 1.0);
  vec3 c5 = p5 * vec3(1.0, 0, 0);
  // float t = dd_time;
  // vec3 color = pct * random_color3(idx + dd_randseed);
  // vec3 color = random_color3(idx + dd_randseed);
	gl_FragColor = vec4(cx + cy + c1 + c2 + c3 + c4 + c5, 1.0);
  // gl_FragColor = vec4(c3, 1.0);
}