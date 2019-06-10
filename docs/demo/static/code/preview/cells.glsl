#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;
uniform vec2 dd_randseed0;

// https://thebookofshaders.com/12/
void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution.xy;
  st.x *= dd_resolution.x / dd_resolution.y;
  
  vec3 color = vec3(.0);

  // Tile the space
  vec2 grid = vec2(6.0, 6.0);
  vec2 i_st = grid_index(st, grid);
  vec2 f_st = grid_xy(st, grid);

  float m_dist = 1.0;  // minimun distance

  for (int y= -1; y <= 1; y++) {
    for (int x= -1; x <= 1; x++) {
      // Neighbor place in the grid
      vec2 neighbor = vec2(float(x), float(y));

      // Random position from current + neighbor place in the grid
      vec2 point = random2(i_st + neighbor);

      // Animate the point
      point = 0.5 + 0.5 * sin(dd_time + 6.2831 * point);

      // Vector between the pixel and the point
      vec2 diff = neighbor + point - f_st;

      // Distance to the point
      float dist = length(diff);

      // Keep the closer distance
      m_dist = min(m_dist, dist);
    }
  }

  // Draw the min distance (distance field)
  color += m_dist;

  // Draw cell center
  color += 1.0 - step(0.02, m_dist);

  // Draw grid
  // color.r += step(0.98, f_st.x) + step(0.98, f_st.y);

  // Show isolines
  // color -= step(.7,abs(sin(27.0*m_dist)))*.5;

  gl_FragColor = vec4(color, 1.0);
}
