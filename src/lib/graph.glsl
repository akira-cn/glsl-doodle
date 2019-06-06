#ifndef M_GRAPH

#define M_GRAPH

#pragma include <stdlib>
#pragma include <shaper>
#pragma include <transform>

/**
  有向距离场
 */
#ifndef SDF
#define SDF float
#endif

/**
  定义： Unit Distance Field 单位距离场，值从 0.0~1.0，无限远处为0.0，最近处为1.0
  stroke 和 fill 的时候取距离场的切面
 */
#ifndef UDF
#define UDF float
#endif

/**
  PLOT宏，用来绘制连续函数曲线
  注意：PLOT适合绘制连续曲线，在局部不连续处可能失真

  参数：
    function f  曲线方程 y = f(x)
    vec2 st     当前绘图坐标
    float step  曲线采样间隔
    float th    线条宽度
    float smth  边缘模糊率，用于消除锯齿
  
  返回值：
    UDF  距离场
*/
#ifndef PLOT
#define PLOT(f, st, step) sdf_plot(st, vec2(st.x - step, f(st.x - step)), vec2(st.x, f(st.x)), vec2(st.x + step, f(st.x + step)))
#endif

#ifndef SPRITE
#define SPRITE(quad, f) if(quad.x >= 0.0 && quad.x <= 1.0) f(quad);
#endif

/**
  点到直线的距离
 */
SDF sdf_line(vec2 p, vec2 v1, vec2 v2) {
  vec2 pd = p - v1;
  vec2 pd2 = p - v2;
  vec2 seg = v2 - v1;

  return (pd.x * seg.y - pd.y * seg.x) / length(seg);
}

SDF sdf_line(vec2 p, vec2 v) {
  return sdf_line(p, vec2(0), v);
}

/**
  点到线段的距离

  参数：
    vec2 p  点坐标
    vec2 v1 线段端点坐标
    vec2 v2 线段端点坐标

  返回值：
    float   距离
 */
SDF sdf_seg(vec2 p, vec2 v1, vec2 v2) {
  vec2 pd = p - v1;
  vec2 pd2 = p - v2;
  vec2 seg = v2 - v1;

  float l = length(seg);
  float d = abs(pd.x * seg.y - pd.y * seg.x) / l;
  float proj = (pd.x * seg.x + pd.y * seg.y) / l;

  if(proj >= 0.0 && proj <= l) return d;

  return min(length(pd), length(pd2));
}

SDF sdf_seg(vec2 p, vec2 v) {
  return sdf_seg(p, vec2(0), v);
}

/**
  取 p 到线段 v1v2 和 v2v3 两者中最近的距离

  参数：
    vec2 p 点坐标
    vec2 v1 线段端点坐标
    vec2 v2 线段端点坐标
    vec2 v3 线段端点坐标

  返回值：
    SDF 距离
 */
SDF sdf_plot(vec2 p, vec2 v1, vec2 v2, vec2 v3) {
  float d1 = sdf_seg(p, v1, v2);
  float d2 = sdf_seg(p, v2, v3);

  return min(d1, d2);
}

UDF stroke(SDF d, float d0, float w, float smth) {
  float th = 0.5 * w;
  smth = smth * w;
  float start = d0 - th;
  float end = d0 + th; 
  return smoothstep(start, start + smth, d) - smoothstep(end - smth, end, d);
}

UDF stroke(SDF d, float w, float smth) {
  return stroke(d, 0.0, w, smth);
}

UDF stroke(SDF d, float w) {
  return stroke(d, 0.0, w, 0.0);
}

/**
  三角形的 SDF
 */
SDF sdf_triangle(vec2 st, vec2 a, vec2 b, vec2 c) {
  vec2 va = a - b;
  vec2 vb = b - c;
  vec2 vc = c - a;

  float d1 = sdf_line(st, a, b);
  float d2 = sdf_line(st, b, c);
  float d3 = sdf_line(st, c, a);

  // 三角形内切圆半径
  float l = abs(va.x * vb.y - va.y * vb.x) / (length(va) + length(vb) + length(vc));

  if(d1 >= 0.0 && d2 >= 0.0 && d3 >= 0.0 || d1 <= 0.0 && d2 <= 0.0 && d3 <= 0.0) {
    return min(abs(d1), min(abs(d2), abs(d3))) / l;
  }

  d1 = sdf_seg(st, a, b);
  d2 = sdf_seg(st, b, c);
  d3 = sdf_seg(st, c, a);
  return -min(abs(d1), min(abs(d2), abs(d3))) / l;
}

SDF sdf_rect(vec2 st, vec2 p, float w, float h) {
  vec2 a = p;
  vec2 b = p + vec2(w, 0.0);
  vec2 c = p + vec2(w, h);
  vec2 d = p + vec2(0.0, h);

  float d1 = sdf_line(st, a, b);
  float d2 = sdf_line(st, b, c);
  float d3 = sdf_line(st, c, d);
  float d4 = sdf_line(st, d, a);

  float l = min(w, h) * 0.5; // 矩形短边

  if(d1 >= 0.0 && d2 >= 0.0 && d3 >= 0.0 && d4 >= 0.0 ||
     d1 <= 0.0 && d2 <= 0.0 && d3 <= 0.0 && d4 <= 0.0) {
    return min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;
  }

  d1 = sdf_seg(st, a, b);
  d2 = sdf_seg(st, b, c);
  d3 = sdf_seg(st, c, d);
  d4 = sdf_seg(st, d, a);

  return -min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;
}

SDF sdf_circle(vec2 st, vec2 c, float r) {
  return 1.0 - length(st - c) / r;
}

SDF sdf_ellipse(vec2 st, vec2 c, float a, float b) {
  vec2 p = st - c;
  return 1.0 - sqrt(pow(p.x / a, 2.0) + pow(p.y / b, 2.0));
}

SDF sdf_ellipse(vec2 st, vec2 c, float a, float b, float sAng, float eAng) {
  vec2 ua = vec2(cos(sAng), sin(sAng));
  vec2 ub = vec2(cos(eAng), sin(eAng));

  float d1 = sdf_line(st, c, ua + c);
  float d2 = sdf_line(st, c, ub + c);

  float d3 = sdf_ellipse(st, c, a, b);
  float r = min(a, b);

  vec2 v = st - c;
  float ang = angle(v, vec2(1.0, 0));

  if(eAng - sAng > 2.0 * PI) {
    return d3;
  }

  if(ang >= sAng && ang <= eAng) { // 两个向量夹角中间的部分
    float m = max(a, b);
    float d11 = sdf_seg(st, c, ua * m + c);
    float d12 = sdf_seg(st, c, ub * m + c);
    if(d3 >= 0.0) {
      return min(abs(d11 / r), min(abs(d12 / r), d3));
    }
    return d3;
  }
  
  float pa = dot(ua, v); // 求投影
  float pb = dot(ub, v);

  if(pa < 0.0 && pb < 0.0) {
    return -length(st - c) / r;
  }

  if(d1 > 0.0 && pa >= 0.0) {
    vec2 va = pa * ua;
    float da = pow(va.x / a, 2.0) + pow(va.y / b, 2.0);
    if(d3 > 0.0 || da <= pow(1.0 + abs(d1 / r), 2.0)) {
      return -abs(d1 / r);
    } else {
      return d3;
    }
  }

  if(d2 < 0.0 && pb >= 0.0) {
    vec2 vb = pb * ub;
    float db = pow(vb.x / a, 2.0) + pow(vb.y / b, 2.0);
    if(d3 >= 0.0 || db <= pow(1.0 + abs(d2 / r), 2.0)) {
      return -abs(d2 / r);
    } else {
      return d3;
    }
  }
}

SDF sdf_arc(vec2 st, vec2 c, float r, float sAng, float eAng) {
  return sdf_ellipse(st, c, r, r, sAng, eAng);
}

SDF sdf_rhombus(vec2 st, vec2 cr, float w, float h) {
  vec2 a = cr - vec2(0.5 * w, 0);
  vec2 b = cr - vec2(0, 0.5 * h);
  vec2 c = cr + vec2(0.5 * w, 0);
  vec2 d = cr + vec2(0, 0.5 * h);

  vec2 va = a - b;
  vec2 vb = b - c;
  vec2 vc = c - d;
  vec2 vd = d - a;

  float d1 = sdf_line(st, a, b);
  float d2 = sdf_line(st, b, c);
  float d3 = sdf_line(st, c, d);
  float d4 = sdf_line(st, d, a);

  float l = min(w, h) * 0.5; // 矩形短边

  if(d1 >= 0.0 && d2 >= 0.0 && d3 >= 0.0 && d4 >= 0.0 ||
     d1 <= 0.0 && d2 <= 0.0 && d3 <= 0.0 && d4 <= 0.0) {
    return min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;
  }

  d1 = sdf_seg(st, a, b);
  d2 = sdf_seg(st, b, c);
  d3 = sdf_seg(st, c, d);
  d4 = sdf_seg(st, d, a);

  return -min(abs(d1), min(abs(d2), min(abs(d3), abs(d4)))) / l;  
}

/**
  正多边形(含内摆线)
 */
SDF regular_polygon(vec2 st, vec2 center, float r, float rotation, const int edges, bool hypocycloid) {
  vec2 p = st - center;
  vec2 v0 = vec2(0, r); // 第一个顶点
  v0 = rotate(v0, -rotation);

  float a = 2.0 * PI / float(edges); // 每条边与中心点的夹角

  float ang = angle(v0, p); // 取夹角
  ang = floor(ang / a); // 在哪个区间

  vec2 v1 = rotate(v0, a * ang); // 左顶点
  vec2 v2 = rotate(v0, a * (ang + 1.0)); // 右顶点

  float c_a = cos(0.5 * a);

  float l = r * c_a;

  float d = sdf_line(p, v1, v2);
  
  if(hypocycloid && d >= 0.0) {
    vec2 c = (v1 + v2) / 2.0;
    float r2 = r * tan(0.5 * a);
    vec2 ce = c / (c_a * c_a); // 外部圆心

    d = (distance(p, ce) - r2) / (length(ce) - r2);
    return d;
  }
  
  return d / l; 
}

SDF regular_polygon(vec2 st, vec2 center, float r, float rotation, const int edges) {
  return regular_polygon(st, center, r, rotation, edges, false);
}

SDF regular_polygon(vec2 st, vec2 center, float r, const int edges, bool hypocycloid) {
  return regular_polygon(st, center, r, 0.0, edges, true);
}

SDF regular_polygon(vec2 st, vec2 center, float r, const int edges) {
  return regular_polygon(st, center, r, 0.0, edges, false);
}

UDF fill(SDF d, float start, float end, float smth_start, float smth_end) {
  smth_start = (end - start) * smth_start;
  smth_end = (end - start) * smth_end;
  return smoothstep(start, start + smth_start, d) - smoothstep(end - smth_end, end, d);
}

UDF fill(SDF d, float start, float end, float smth) {
  return fill(d, start, end, smth, smth);
}

UDF fill(SDF d, float start, float smth) {
  return fill(d, start, 1.0, smth, 0.0);
}

UDF fill(SDF d, float smth) {
  return fill(d, 0.0, 1.0, smth, 0.0);
}

UDF fill(SDF d) {
  return fill(d, 0.0, 1.0, 0.0, 0.0);
}

/**
  complement(d1, d2, d3...) = complement(union(d1, d2, d3...), intersect(d1, d2, d3...))
 */

UDF udf_intersect(UDF d1, UDF d2) {
  if(d1 > 0.0 && d2 > 0.0) {
    return min(d1, d2);
  }
  return 0.0;
}

UDF udf_union(UDF d1, UDF d2) {
  if(d1 > 0.0 || d2 > 0.0) {
    return max(d1, d2);
  }
  return 0.0;
}

// 无法消除锯齿
UDF udf_complement(UDF d1, UDF d2) {
  if(d1 > 0.0 && d2 == 0.0 || d1 == 0.0 && d2 > 0.0) return 1.0;
  return 0.0;
}

#pragma include <box>
#pragma include <shapes>

#endif