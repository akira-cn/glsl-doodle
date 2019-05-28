#ifndef M_GRAPH

#define M_GRAPH

#pragma include <stdlib>

/**
  定义： Unit Distance Field 单位距离场，值从 0.0~1.0，无限远处为0.0，最近处为1.0
  着色的时候取距离场的切面
 */
#define UDF float

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
#define PLOT(f, st, step, th, smth) distance_to_udf(plot_distance(st, vec2(st.x - step, f(st.x - step)), vec2(st.x, f(st.x)), vec2(st.x + step, f(st.x + step))), th, smth)

#define SPRITE(quad, f) if(quad.x >= 0.0 && quad.x <= 1.0) f(quad);

/**
  求点到线段的距离

  参数：
    vec2 p  点坐标
    vec2 v1 线段端点坐标
    vec2 v2 线段端点坐标

  返回值：
    float   距离
 */
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

/**
  取 p 到线段 v1v2 和 v2v3 两者中最近的距离

  参数：
    vec2 p 点坐标
    vec2 v1 线段端点坐标
    vec2 v2 线段端点坐标
    vec2 v3 线段端点坐标

  返回值：
    float 距离
 */
float plot_distance(in vec2 p, in vec2 v1, in vec2 v2, in vec2 v3) {
  float d1 = seg_distance(p, v1, v2);
  float d2 = seg_distance(p, v2, v3);

  return min(d1, d2);
}

/**
  将距离转换为单位距离场：UDF

  参数：
    float d 距离
    float w 范围
    float smth 边缘模糊率
 */
UDF distance_to_udf(in float d, in float w, in float smth) {
  float th = 0.5 * w;
  smth = smth * w;
  return smoothstep(-th, smth - th, d) - smoothstep(th - smth, th, d);
}

/**
  计算线段的 UDF

  参数：
    vec2 st     当前坐标
    vec2 v1     线段端点
    vec2 v2     线段端点
    float width 线段宽度
    float smth  边缘模糊率

  返回值：
    UDF 距离场
 */
UDF line_seg(in vec2 st, in vec2 v1, in vec2 v2, in float width, in float smth) {
  float y = seg_distance(st, v1, v2);
  return distance_to_udf(y, width, smth);
}

/**
  计算矩形的 UDF

  参数：
    vec2 st     当前坐标
    vec2 p      矩形左下角坐标
    vec2 wh     矩形宽高
    float smth  边缘模糊率

  返回值：
    UDF 距离场
 */
UDF rect(in vec2 st, in vec2 p, in vec2 wh, in float smth) {
  vec2 v = (st - p) / wh; // show 0 ~ 1
  float x = v.x;
  float y = v.y;

  if(x >= 0.0 && x <= 1.0 && y >= 0.0 && y <= 1.0) {
    float d = 2.0 * min(min(y, 1.0 - y), min(x, 1.0 - x)); // 1 ~ 0
    return smoothstep(0.0, smth, d);
  }
  return 0.0;
}

/**
  计算圆的 UDF

  参数：
    vec2 st     当前坐标
    vec2  c     圆心
    float r     半径
    float smth  边缘模糊率

  返回值：
    UDF 距离场
 */
UDF circle(in vec2 st, in vec2 c, in float r, in float smth) {
  float d = length(st - c);
  return distance_to_udf(d, 2.0 * r, smth);
}

/**
  计算扇形的 UDF
 */
UDF arc(in vec2 st, in vec2 c, in float r, in float sAng, in float eAng, in float smth) {
  float ang = angle(st - c);
  float d = length(st - c) / r;

  if(d <= 1.0 && ang >= sAng && ang < eAng) {
    vec2 v1 = vec2(r * cos(sAng), r * sin(sAng)) + c;
    vec2 v2 = vec2(r * cos(eAng), r * sin(eAng)) + c;

    float d1 = seg_distance(st, c, v1) / r;
    float d2 = seg_distance(st, c, v2) / r;
    float d3 = 1.0 - d;

    // return distance_to_udf(d, 2.0 * r, smth);
    return smoothstep(0.0, smth, min(d1, min(d2, d3)));
  }
  return 0.0;
}

/**
  计算椭圆的 UDF

  参数：
    vec2 st     当前坐标
    vec2  c     中心
    float a     x轴半径
    float b     y轴半径
    float smth  边缘模糊率

  返回值：
    UDF 距离场
 */
UDF ellipse(in vec2 st, in vec2 c, in float a, in float b, in float smth) {
  vec2 p = st - c;
  float dd = 1.0 - pow(p.x / a, 2.0) - pow(p.y / b, 2.0);
  
  if(dd >= 0.0) {
    return smoothstep(0.0, smth * smth, dd);
  }
  return 0.0;
}

UDF ellipse(in vec2 st, in vec2 c, in float a, in float b, in float sAng, in float eAng, in float smth) {
  vec2 p = st - c;
  float ang = angle(st - c);
  float dd = pow(p.x / a, 2.0) + pow(p.y / b, 2.0);

  vec2 v1 = vec2(a * cos(sAng), b * sin(sAng)) + c;
  vec2 v2 = vec2(a * cos(eAng), b * sin(eAng)) + c;
  return line_seg(st, c, v1, 0.01, 0.002) + line_seg(st, c, v2, 0.01, 0.002);

  if(dd <= 1.0 && ang >= sAng && ang < eAng) {
    vec2 v1 = vec2(a * cos(sAng), b * sin(sAng)) + c;
    vec2 v2 = vec2(a * cos(eAng), b * sin(eAng)) + c;
    
    float d1 = seg_distance(st, c, v1) / max(a, b);
    float d2 = seg_distance(st, c, v2) / max(a, b);
    float d3 = 1.0 - dd;

    return smoothstep(0.0, smth, min(d1, min(d2, d3)));
    // return smoothstep(0.0, smth, d3);
  }
  return 0.0;
}


bool in_triangle(in vec2 p, in vec2 a, in vec2 b, in vec2 c) {
  float pa = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
  float pb = (c.x - b.x) * (p.y - b.y) - (c.y - b.y) * (p.x - b.x);
  float pc = (a.x - c.x) * (p.y - c.y) - (a.y - c.y) * (p.x - c.x);

  return pa >= 0.0 && pb >= 0.0 && pc >= 0.0 || pa <= 0.0 && pb <= 0.0 && pc <= 0.0;
}

/**
  计算三角形的 UDF

  参数：
    vec2 st     当前坐标
    vec2  a     顶点
    vec2  b     顶点
    vec2  c     顶点
    float smth  边缘模糊率

  返回值：
    UDF 距离场
 */
UDF triangle(in vec2 st, in vec2 a, in vec2 b, in vec2 c, in float smth) {
  if(in_triangle(st, a, b, c)) {
    float d = min(min(seg_distance(st, a, b), seg_distance(st, b, c)), seg_distance(st, c, a));
    return smoothstep(0.0, smth, d);
  } 
  return 0.0; 
}

/**
  计算菱形的 UDF
 */
UDF rhombus(in vec2 st, in vec2 cr, float w, float h, in float smth) {
  vec2 a = cr - vec2(0.5 * w, 0);
  vec2 b = cr - vec2(0, 0.5 * h);
  vec2 c = cr + vec2(0.5 * w, 0);
  vec2 d = cr + vec2(0, 0.5 * h);

  if(in_triangle(st, a, b, c) || in_triangle(st, a, c, d)) {
    float d = min(seg_distance(st, a, b), (min(seg_distance(st, b, c), min(seg_distance(st, c, d), seg_distance(st, d, a)))));
    return smoothstep(0.0, smth, d);
  }
  return 0.0;
}

/**
  box2 由四个点构成矩形或平行四边形
 */
struct box2 {
  vec2 a;
  vec2 b;
  vec2 c;
  vec2 d;
};

/**
  求 box2 的中心点
 */
vec2 center(in box2 box) {
  return (box.a + box.c) * 0.5;
}

/**
  创建 box2

  参数：
    vec2 point  参考点
    vec2 size   宽高
    vec2 anchro 锚

  返回值：
    box2
 */
box2 create_box(in vec2 point, in vec2 size, in vec2 anchor) {
  vec2 a = point + size * (vec2(0.0) - anchor);
  vec2 b = point + size * (vec2(1.0, 0.0) - anchor);
  vec2 c = point + size * (vec2(1.0) - anchor);
  vec2 d = point + size * (vec2(0.0, 1.0) - anchor);

  return box2(a, b, c, d);  
}

box2 create_box(in vec2 point, in vec2 size) {
  return create_box(point, size, vec2(0.0));
}

box2 create_box(in vec2 size) {
  return create_box(vec2(0.0), size, vec2(0.0));
}

box2 create_box() {
  return create_box(vec2(0.0), vec2(1.0), vec2(0.0));
}

/**
  求一个坐标点 p 在 box 中的相对坐标值 （0 ~ 1）

  参数：
    vec2 p    坐标点
    box2 box  当前 box 对象
  
  返回值：
    vec2 单位坐标值
 */
vec2 box_quad(in vec2 p, in box2 box) {
  vec2 v1 = box.b - box.a;
  vec2 v2 = box.d - box.a;

  vec2 vp = p - box.a;

  float d1 = vp.x * v1.y - vp.y * v1.x;
  float d2 = vp.x * v2.y - vp.y * v2.x;

  if(d1 * d2 <= 0.0) {
    float l1 = length(v1);
    float l2 = length(v2);
    float p1 = (vp.x * v1.x + vp.y * v1.y) / pow(l1, 2.0);
    float p2 = (vp.x * v2.x + vp.y * v2.y) / pow(l2, 2.0);

    if(p1 >= 0.0 && p1 <= 1.0 && p2 >= 0.0 && p2 <= 1.0) {
      return vec2(p1, p2);
    }
  }

  return vec2(-1.0);
}

/**
  计算向量和 box 的 transform
 */
vec2 transform(in vec2 v0, mat3 matrix) {
  return vec2(vec3(v0, 1.0) * matrix);
}

vec2 translate(in vec2 v0, in vec2 xy) {
  mat3 m = mat3(1, 0, xy.x, 0, 1, xy.y, 0, 0, 1);
  return transform(v0, m);
}

vec2 scale(in vec2 v0, in vec2 origin, in vec2 scale) {
  mat3 m = mat3(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);
  return transform(v0 - origin, m) + origin;
}

vec2 scale(in vec2 v0, in vec2 scaleXY) {
  return scale(v0, vec2(0.0), scaleXY);
}

vec2 rotate(in vec2 v0, in vec2 origin, float ang) {
  float sinA = sin(ang);
  float cosA = cos(ang);
  mat3 m = mat3(cosA, sinA, 0, -sinA, cosA, 0, 0, 0, 1);
  return transform(v0 - origin, m) + origin;
}

vec2 rotate(in vec2 v0, float ang) {
  return rotate(v0, vec2(0.0), ang);
}

vec2 skew(in vec2 v0, in vec2 origin, in vec2 skew) {
  mat3 m = mat3(1, tan(skew.y), 0, tan(skew.x), 1, 0, 0, 0, 1);
  return transform(v0 - origin, m) + origin;
}

vec2 skew(in vec2 v0, in vec2 skewXY) {
  return skew(v0, vec2(0.0), skewXY);
}

box2 transform(in box2 box, mat3 matrix) {
  return box2(
    transform(box.a, matrix),
    transform(box.b, matrix),
    transform(box.c, matrix),
    transform(box.d, matrix)
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

box2 scale(in box2 box, in vec2 scaleXY) {
  return box2(
    scale(box.a, scaleXY), 
    scale(box.b, scaleXY), 
    scale(box.c, scaleXY), 
    scale(box.d, scaleXY)
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

box2 rotate(in box2 box, float ang) {
  return box2(
    rotate(box.a, ang),
    rotate(box.b, ang),
    rotate(box.c, ang),
    rotate(box.d, ang)
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

box2 skew(in box2 box, in vec2 skewXY) {
  return box2(
    skew(box.a, skewXY),
    skew(box.b, skewXY),
    skew(box.c, skewXY),
    skew(box.d, skewXY)
  );
}

/**
  将直角坐标转为极坐标
 */
vec2 polar(vec2 st, vec2 c) {
  vec2 p = c - st;
  float r = length(p) * 2.0;
  float a = atan(p.y, p.x);

  return vec2(r, a);  
}

/**
  complement(d1, d2, d3...) = complement(union(d1, d2, d3...), intersect(d1, d2, d3...))
 */

UDF udf_intersect(in UDF d1, in UDF d2) {
  if(d1 > 0.0 && d2 > 0.0) {
    return max(d1, d2);
  }
  return 0.0;
}

UDF udf_union(in UDF d1, in UDF d2) {
  if(d1 > 0.0 || d2 > 0.0) {
    return max(d1, d2);
  }
  return 0.0;
}

UDF udf_complement(in UDF d1, in UDF d2) {
  if(d1 > 0.0 && d2 > 0.0) {
    if(d1 == 1.0 && d2 < 1.0) {
      return 1.0 - d2;
    }
    if(d1 < 1.0 && d2 == 1.0) {
      return 1.0 - d1;
    }
    if(d1 < 1.0 && d2 < 1.0) {
      if(d1 > d2) {
        if(d1 < 1.0 - d2) {
          return d1;
        }
        return 1.0 - d2;
      }
      if(d2 < 1.0 - d1) {
        return d2;
      }
      return 1.0 - d1;
    }
    return 0.0;
  }
  if(d1 > 0.0) return d1;
  if(d2 > 0.0) return d2;
  return 0.0;
}

#endif