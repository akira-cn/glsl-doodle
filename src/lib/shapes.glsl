#ifndef MOD_SHAPES

#define MOD_SHAPES

/** 
  小图形
 */
UDF shape_blade(vec2 st, vec2 center, float num) {
  vec2 pt = polar(st, vec2(center));
  float x = pt.x;
  float y = cos(pt.y * num);
  return smoothstep(x - 0.01, x + 0.01, y);  
}

UDF shape_blade3(vec2 st, vec2 center) {
  return shape_blade(st, center, 3.0);
}

UDF shape_blade3(vec2 st) {
  return shape_blade(st, vec2(0.5), 3.0);
}

UDF shape_blade4(vec2 st, vec2 center) {
  return shape_blade(st, center, 4.0);
}

UDF shape_blade4(vec2 st) {
  return shape_blade(st, vec2(0.5), 4.0);
}

UDF shape_blade5(vec2 st, vec2 center) {
  return shape_blade(st, center, 5.0);
}

UDF shape_blade5(vec2 st) {
  return shape_blade(st, vec2(0.5), 5.0);
}

UDF shape_infinity(vec2 st, vec2 center) {
  return shape_blade(st, center, 2.0);
}

UDF shape_infinity(vec2 st) {
  return shape_blade(st, vec2(0.5), 2.0);
}

UDF shape_clover(vec2 st, vec2 center, float num) {
  vec2 pt = polar(st, vec2(center));
  float x = pt.x;
  float y = abs(cos(pt.y * num * 0.5));
  return smoothstep(x - 0.01, x + 0.01, y);  
}

UDF shape_bean(vec2 st, vec2 center) {
  return shape_clover(st, center, 1.0);
}

UDF shape_bean(vec2 st) {
  return shape_clover(st, vec2(0.5), 1.0);
}

UDF shape_apple(vec2 st, vec2 center) {
  return shape_clover(vec2(st.y - 0.2, st.x), center, 1.3);
}

UDF shape_apple(vec2 st) {
  return shape_clover(vec2(st.y - 0.2, st.x), vec2(0.5), 1.3);
}

UDF shape_clover3(vec2 st, vec2 center) {
  return shape_clover(st, center, 3.0);
}

UDF shape_clover3(vec2 st) {
  return shape_clover(st, vec2(0.5), 3.0);
}

UDF shape_clover4(vec2 st, vec2 center) {
  return shape_clover(st, center, 4.0);
}

UDF shape_clover4(vec2 st) {
  return shape_clover(st, vec2(0.5), 4.0);
}

UDF shape_clover5(vec2 st, vec2 center) {
  return shape_clover(st, center, 5.0);
}

UDF shape_clover5(vec2 st) {
  return shape_clover(st, vec2(0.5), 5.0);
}

UDF shape_flower(vec2 st, vec2 center, float num) {
  vec2 pt = polar(st, vec2(center));
  float x = pt.x;
  float y = abs(cos(pt.y * num * 0.5)) * 0.5 + 0.3;
  return smoothstep(x - 0.01, x + 0.01, y);  
}

UDF shape_gourd(vec2 st, vec2 center) {
  return shape_flower(vec2(st.y, st.x), center, 1.7);
}

UDF shape_gourd(vec2 st) {
  return shape_flower(vec2(st.y, st.x), vec2(0.5), 1.7);
}

UDF shape_flower3(vec2 st, vec2 center) {
  return shape_flower(st, center, 3.0);
}

UDF shape_flower3(vec2 st) {
  return shape_flower(st, vec2(0.5), 3.0);
}

UDF shape_flower4(vec2 st, vec2 center) {
  return shape_flower(st, center, 4.0);
}

UDF shape_flower4(vec2 st) {
  return shape_flower(st, vec2(0.5), 4.0);
}

UDF shape_flower5(vec2 st, vec2 center) {
  return shape_flower(st, center, 5.0);
}

UDF shape_flower5(vec2 st) {
  return shape_flower(st, vec2(0.5), 5.0);
}

UDF shape_bud(vec2 st, vec2 center, float num) {
  vec2 pt = polar(st, vec2(center));
  float x = pt.x;
  float y = smoothstep(-0.5, 1.0, cos(pt.y * num)) * 0.2 + 0.5;
  return smoothstep(x - 0.01, x + 0.01, y);  
}

UDF shape_bud5(vec2 st, vec2 center) {
  return shape_bud(st, center, 5.0);
}

UDF shape_bud5(vec2 st) {
  return shape_bud(st, vec2(0.5), 5.0);
}

UDF shape_bud8(vec2 st, vec2 center) {
  return shape_bud(st, center, 8.0);
}

UDF shape_bud8(vec2 st) {
  return shape_bud(st, vec2(0.5), 8.0);
}

UDF shape_bud10(vec2 st, vec2 center) {
  return shape_bud(st, center, 10.0);
}

UDF shape_bud10(vec2 st) {
  return shape_bud(st, vec2(0.5), 10.0);
}

UDF shape_bud12(vec2 st, vec2 center) {
  return shape_bud(st, center, 12.0);
}

UDF shape_bud12(vec2 st) {
  return shape_bud(st, vec2(0.5), 12.0);
}

// TODO: 处理锯齿
UDF shape_star(vec2 st, vec2 center) {
  float r = 0.45;
  float d = regular_polygon(st, center, r, 5);
  float a = -2.0 * PI / 5.0;

  d = fill(d, 0.01);

  vec2 v0 = vec2(0, r);
  
  for(int i = 0; i < 5; i++) {
    vec2 v1 = rotate(v0, float(i) * a);
    vec2 v2 = rotate(v0, float(i + 1) * a);
    float l = length(v2 - v1);

    float c = 0.5 / cos(PI / 5.0);

    vec2 p = rotate(v2, v1, -PI / 5.0);
    p += (1.0 - c) * (v1 - p);

    float d2 = sdf_triangle(st - center, v1, v2, p);

    d2 = fill(d2, 0.01);

    d = udf_complement(d, d2);
  }

  return d;
}

UDF shape_regular_polygon(vec2 st, vec2 center, const int edges) {
  float d = regular_polygon(st, center, 0.45, edges);
  return fill(d, 0.01);
}

UDF shape_star(vec2 st) {
  return shape_star(st, vec2(0.5));
}

UDF shape_triangle(vec2 st, vec2 center) {
  return shape_regular_polygon(st, center, 3);
}

UDF shape_triangle(vec2 st) {
  return shape_regular_polygon(st, vec2(0.5), 3);
}

UDF shape_rhombus(vec2 st, vec2 center) {
  return shape_regular_polygon(st, center, 4);
}

UDF shape_rhombus(vec2 st) {
  return shape_regular_polygon(st, vec2(0.5), 4);
}

UDF shape_pentagon(vec2 st, vec2 center) {
  return shape_regular_polygon(st, center, 5);
}

UDF shape_pentagon(vec2 st) {
  return shape_regular_polygon(st, vec2(0.5), 5);
}

UDF shape_hexagon(vec2 st, vec2 center) {
  return shape_regular_polygon(st, center, 6);
}

UDF shape_hexagon(vec2 st) {
  return shape_regular_polygon(st, vec2(0.5), 6);
}

UDF shape_heptagon(vec2 st, vec2 center) {
  return shape_regular_polygon(st, center, 7);
}

UDF shape_heptagon(vec2 st) {
  return shape_regular_polygon(st, vec2(0.5), 7);
}

UDF shape_octagon(vec2 st, vec2 center) {
  return shape_regular_polygon(st, center, 8);
}

UDF shape_octagon(vec2 st) {
  return shape_regular_polygon(st, vec2(0.5), 8);
}

UDF shape_hypocycloid(vec2 st, vec2 center, const int edges) {
  float d = regular_polygon(st, center, 0.45, edges, true);
  return fill(d, 0.01);
}

UDF shape_hypocycloid(vec2 st, const int edges) {
  return shape_hypocycloid(st, vec2(0.5), edges);
}

UDF shape_cross(vec2 st, vec2 center, float w, float h) {
  vec2 p1 = center - 0.5 * vec2(w, h);
  vec2 p2 = center - 0.5 * vec2(h, w);
  float d1 = sdf_rect(st, p1, w, h);
  float d2 = sdf_rect(st, p2, h, w);
  return fill(udf_union(d1, d2), 0.01);
}

UDF shape_cross(vec2 st, vec2 center) {
  return shape_cross(st, center, 0.8, 0.2);
}

UDF shape_cross(vec2 st, float w, float h) {
  return shape_cross(st, vec2(0.5), w, h);
}

UDF shape_cross(vec2 st) {
  return shape_cross(st, vec2(0.5), 0.8, 0.2);
}

#endif