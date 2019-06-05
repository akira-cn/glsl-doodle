#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <pattern>

uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;

void main() {
  // gl_FragColor = vec4(abs(sin(dd_time)),0.0,0.0,1.0);
  // vec2 st = gl_FragCoord.xy / dd_resolution;
	// gl_FragColor = vec4(st, 0.0, 1.0);
  vec2 grid = vec2(10, 10);
	vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 idx = grid_index(st, grid);
  
  st = grid_xy(st, grid);
  st = mix(vec2(-10, -10), vec2(10, 10), st);

  float r = - PI * dd_time * 0.2 * (idx.x * 5.0 + idx.y + 1.0);
  mat2 m = mat2(sin(r), cos(r), cos(r), -sin(r));

  st = m * st;

  float d = sdf_seg(st, vec2(-3.0, -3.0), vec2(3.0, 3.0));
  d = stroke(d, 5.0, 0.15);

  // float t = dd_time;
  // vec3 color = pct * random_color(idx + dd_randseed);
  // vec3 color = random_color3(idx + dd_randseed);
	gl_FragColor = vec4(vec3(d), 1.0);
}