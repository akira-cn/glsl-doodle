#ifndef M_GRAPH

#define M_GRAPH

#define PLOT(f, st, step, th, smth) plot_d(plot_distance(st, vec2(st.x - step, f(st.x - step)), vec2(st.x, f(st.x)), vec2(st.x + step, f(st.x + step))), th, smth)

#define SPRITE(quad, f) if(quad.x >= 0.0 && quad.x <= 1.0) f(quad);

// Get the distance that point between lineSeg(v1, v2)
float seg_distance(in vec2 p, in vec2 v1, in vec2 v2) {
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
  float d1 = seg_distance(p, v1, v2);
  float d2 = seg_distance(p, v2, v3);

  return min(d1, d2);
}

// plot_d by distance field
float plot_d(in float d, in float thick, in float smth){
  float th = 0.5 * thick;
  smth = smth * thick;
  return smoothstep(-th, smth - th, d) - smoothstep(th - smth, th, d);
}

float line_seg(in vec2 st, in vec2 v1, in vec2 v2, in float thick, in float smth) {
  float y = seg_distance(st, v1, v2);
  return plot_d(y, thick, smth);
}

float rect(in vec2 st, in vec2 p, in vec2 wh, in float smth) {
  vec2 v = (st - p) / wh; // show 0 ~ 1
  float x = v.x;
  float y = v.y;

  if(x >= 0.0 && x <= 1.0 && y >= 0.0 && y <= 1.0) {
    float d = 2.0 * min(min(y, 1.0 - y), min(x, 1.0 - x)); // 1 ~ 0
    return smoothstep(0.0, smth, d);
  }
  return 0.0;
}

float circle(in vec2 st, in vec2 c, in float r, in float smth) {
  float d = length(st - c);
  return plot_d(d, 2.0 * r, smth);
}

float triangle(in vec2 st, in vec2 a, in vec2 b, in vec2 c, in float smth) {
  float pa = (b.x - a.x) * (st.y - a.y) - (b.y - a.y) * (st.x - a.x);
  float pb = (c.x - b.x) * (st.y - b.y) - (c.y - b.y) * (st.x - b.x);
  float pc = (a.x - c.x) * (st.y - c.y) - (a.y - c.y) * (st.x - c.x);

  if(pa >= 0.0 && pb >= 0.0 && pc >= 0.0 || pa <= 0.0 && pb <= 0.0 && pc <= 0.0) {
    float d = min(min(seg_distance(st, a, b), seg_distance(st, b, c)), seg_distance(st, c, a));
    return smoothstep(0.0, smth, d);
  } 
  return 0.0; 
}

struct box2 {
  vec2 a;
  vec2 b;
  vec2 c;
  vec2 d;
};

box2 create_box(in vec2 center, in vec2 size) {
  vec2 a = center + size * vec2(-0.5, -0.5);
  vec2 b = center + size * vec2(0.5, -0.5);
  vec2 c = center + size * vec2(0.5, 0.5);
  vec2 d = center + size * vec2(-0.5, 0.5);

  return box2(a, b, c, d);
}

// whether a point is in a CONVEX quadrangle
// bool in_convex_quadrangle(in vec2 p, in vec2 a, in vec2 b, in vec2 c, in vec2 d) {
//   float pa = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
//   float pb = (c.x - b.x) * (p.y - b.y) - (c.y - b.y) * (p.x - b.x);
//   float pc = (d.x - c.x) * (p.y - c.y) - (d.y - c.y) * (p.x - c.x);
//   float pd = (a.x - d.x) * (p.y - d.y) - (a.y - d.y) * (p.x - d.x);

//   return (pa >= 0.0 && pb >= 0.0 && pc >= 0.0 && pd >= 0.0) || (pa <= 0.0 && pb <= 0.0 && pc <= 0.0 && pd <= 0.0);
// }

vec2 box_quad(in vec2 p, in box2 box) {
  vec2 v1 = box.b - box.a;
  vec2 v2 = box.d - box.a;

  vec2 vp = p - box.a;

  float d1 = vp.x * v1.y - vp.y * v1.x;
  float d2 = vp.x * v2.y - vp.y * v2.x;

  if(d1 * d2 <= 0.0) {
    float p1 = (vp.x * v1.x + vp.y * v1.y) / pow(length(v1), 2.0);
    float p2 = (vp.x * v2.x + vp.y * v2.y) / pow(length(v2), 2.0);

    if(p1 >= 0.0 && p1 <= 1.0 && p2 >= 0.0 && p2 <= 1.0) {
      return vec2(p1, p2);
    }
  }

  return vec2(-1.0);
}

vec2 transform(in vec2 v0, in vec2 origin, mat3 matrix) {
  vec3 v1 = vec3(v0 - origin, 1.0);
  return vec2(v1 * matrix) + origin;
}

vec2 translate(in vec2 v0, in vec2 xy) {
  mat3 m = mat3(1, 0, xy.x, 0, 1, xy.y, 0, 0, 1);
  return transform(v0, vec2(0.0, 0.0), m);
}

vec2 scale(in vec2 v0, in vec2 origin, in vec2 scale) {
  mat3 m = mat3(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);
  return transform(v0, origin, m);
}

vec2 rotate(in vec2 v0, in vec2 origin, float ang) {
  float sinA = sin(ang);
  float cosA = cos(ang);
  mat3 m = mat3(cosA, sinA, 0, -sinA, cosA, 0, 0, 0, 1);
  return transform(v0, origin, m);
}

vec2 skew(in vec2 v0, in vec2 origin, in vec2 skew) {
  mat3 m = mat3(1, tan(skew.y), 0, tan(skew.x), 1, 0, 0, 0, 1);
  return transform(v0, origin, m);
}

box2 transform(in box2 box, in vec2 origin, mat3 matrix) {
  return box2(
    transform(box.a, origin, matrix),
    transform(box.b, origin, matrix),
    transform(box.c, origin, matrix),
    transform(box.d, origin, matrix)
  );
}

box2 translate(in box2 box, in vec2 xy) {
  return box2(
    translate(box.a, xy), 
    translate(box.b, xy), 
    translate(box.c, xy), 
    translate(box.d, xy)
  );
}

box2 scale(in box2 box, in vec2 origin, in vec2 scaleXY) {
  return box2(
    scale(box.a, origin, scaleXY), 
    scale(box.b, origin, scaleXY), 
    scale(box.c, origin, scaleXY), 
    scale(box.d, origin, scaleXY)
  );
}

box2 rotate(in box2 box, in vec2 origin, float ang) {
  return box2(
    rotate(box.a, origin, ang),
    rotate(box.b, origin, ang),
    rotate(box.c, origin, ang),
    rotate(box.d, origin, ang)
  );
}

box2 skew(in box2 box, in vec2 origin, in vec2 skewXY) {
  return box2(
    skew(box.a, origin, skewXY),
    skew(box.b, origin, skewXY),
    skew(box.c, origin, skewXY),
    skew(box.d, origin, skewXY)
  );
}

#endif