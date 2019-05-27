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

void main()
{
  // gl_FragColor = vec4(abs(sin(dd_time)),0.0,0.0,1.0);
  // vec2 st = gl_FragCoord.xy / dd_resolution;
	// gl_FragColor = vec4(st, 0.0, 1.0);
  vec2 grid = vec2(3, 3);
  // vec2 idx = grid_index(gl_FragCoord.xy / dd_resolution, grid);
  
  vec2 pos = vec2(100.0 + 100.0 * sin(dd_time));
  box2 box = rect_to_box(pos, vec2(300.0, 300.0));

  box = rotate_box(box, pos, PI / 4.0);
  box = scale_box(box, pos, vec2(1.5));

  // vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 st = box_d(gl_FragCoord.xy, box);

  if(st.x >= 0.0 && st.x <= 1.0) {
    vec2 idx = grid_index(st, grid);
    // st = grid_xy(st, grid);
    st = lerp(st, vec2(-10, -10), vec2(10, 10));

    // float r = - PI * dd_time * 0.2 * (idx.x * 5.0 + idx.y + 1.0);
    // mat2 m = mat2(sin(r), cos(r), cos(r), -sin(r));

    // st = m * st;
    float pct = circle(st, vec2(0, 0), 8.0, 0.1);

    // vec3 color = pct * vec3(1.0, 1.0, 1.0);

    // float t = dd_time;
    vec3 color = mix(vec3(1.0), random_color(idx + dd_randseed), pct);
    // vec3 color = random_color(idx + dd_randseed);
    gl_FragColor = vec4(color, 1.0);
    // mix_color(pct, vec4(random_color(idx + dd_randseed), 1.0));
  }
}