#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <pattern>

uniform vec2 dd_resolution;

float f1(in float x) {
  return cubic_bezier(x, 0.253, 0.720, 0.720, 0.250);
}

float fx(in float x) {
  return 0.0;
}

void main() {
  // gl_FragColor = vec4(abs(sin(dd_time)),0.0,0.0,1.0);
  // vec2 st = gl_FragCoord.xy / dd_resolution;
	// gl_FragColor = vec4(st, 0.0, 1.0);
  vec2 grid = vec2(5, 5);
	vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 idx = grid_index(st, grid);
  
  // st = grid_xy(st, grid);
  st = mix(vec2(-2, -2), vec2(2, 2), st);

  float stp = 0.1;
  float thick = 0.8;
  float smth = 0.2;

  // PLOT func, field, step, thick, smooth
  float px = PLOT(fx, st, 0.01);
  float py = abs(sdf_line(st, vec2(0.0, 0.0), vec2(0.0, 1.0)));
  float p1 = PLOT(f1, st, 0.01);

  vec3 cx = stroke(px, 0.01, 0.2) * vec3(1.0);
  vec3 cy = stroke(py, 0.01, 0.2) * vec3(1.0);
  vec3 c1 = stroke(p1, 0.05, 0.2) * vec3(1.0, 1.0, 0.0);

	gl_FragColor = vec4(cx + cy + c1, 1.0);
}