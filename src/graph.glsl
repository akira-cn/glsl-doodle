#ifndef M_GRAPH

#define M_GRAPH

#define PLOT(f, st, step, th) plot_v(plot_distance(st, vec2(st.x - step, f(st.x - step)), vec2(st.x, f(st.x)), vec2(st.x + step, f(st.x + step))), th)

// Get the distance that point between lineSeg(v1, v2)
float point_distance(in vec2 p, in vec2 v1, in vec2 v2) {
  vec2 pd = p - v1;
  vec2 pd2 = p - v2;
  vec2 seg = v2 - v1;

  float l = length(seg);
  float d = abs(pd.x * seg.y - pd.y * seg.x) / l;
  float proj = (pd.x * seg.x + pd.y * seg.y) / l;

  if(proj >= 0.0 && proj <= l) return d;

  return min(length(pd), length(pd2));
}

float plot_distance(in vec2 p, in vec2 v1, in vec2 v2, in vec2 v3) {
  float d1 = point_distance(p, v1, v2);
  float d2 = point_distance(p, v2, v3);

  return min(d1, d2);  
}

// Plot a line on Y using a value between 0.0 - 1.0
float plot_v(in float v, in float thick){
  float smth = min(0.618 * thick, 3.0);
  return  smoothstep(-thick, -smth, v) - smoothstep(smth, thick, v);
}

float line_seg(in vec2 st, in vec2 v1, in vec2 v2, in float th) {
  float y = point_distance(st, v1, v2);
  return plot_v(y, th);
}

#endif