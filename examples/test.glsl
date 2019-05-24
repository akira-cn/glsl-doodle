#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include "./common.glsl"

#define PI 3.14159

uniform vec2 abc;
uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct, float thick){
  return  smoothstep( pct - thick, pct, st.y) -
          smoothstep( pct, pct + thick, st.y);
}

void main()
{
  // gl_FragColor = vec4(abs(sin(dd_time)),0.0,0.0,1.0);
  // vec2 st = gl_FragCoord.xy / dd_resolution;
	// gl_FragColor = vec4(st, 0.0, 1.0);

	vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 grid = vec2(5, 5);
  vec2 idx = grid_index(st, grid);

  // st = grid_xy(st, grid);

  float t = dd_time;

  // float y = (sin(4.0 * PI * (st.x + t)) + 1.0) * 0.5;
  // float y = mod(st.x, 0.5);
  float y = st.x;

  // float x = 2.0 * (st.x - 0.5);
  // float y = sin(4.0 * st.x) / st.x;
  // float y = 100.0 * st.x;
  // Plot a line
  float pct = plot(st, y, 0.04);

  vec3 color = pct * random_color(idx + dd_randseed);
  // vec3 color = random_color(idx + dd_randseed);
	gl_FragColor = vec4(color,1.0);
}