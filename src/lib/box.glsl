#ifndef MOD_BOX

#define MOD_BOX

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
vec2 center(box2 box) {
  return (box.a + box.c) * 0.5;
}

/**
  创建 box2

  参数：
    vec2 point  参考点
    float w 宽
    float h 高
    vec2 anchro 锚

  返回值：
    box2
 */
box2 create_box(vec2 point, float w, float h, vec2 anchor) {
  vec2 size = vec2(w, h);
  vec2 a = point + size * (vec2(0.0) - anchor);
  vec2 b = point + size * (vec2(1.0, 0.0) - anchor);
  vec2 c = point + size * (vec2(1.0) - anchor);
  vec2 d = point + size * (vec2(0.0, 1.0) - anchor);

  return box2(a, b, c, d);  
}

box2 create_box(vec2 point, float w, float h) {
  return create_box(point, w, h, vec2(0.0));
}

box2 create_box(vec2 point, float wh) {
  return create_box(point, wh, wh, vec2(0.0));
}

box2 create_box(float w, float h) {
  return create_box(vec2(0.0), w, h, vec2(0.0));
}

box2 create_box(float wh) {
  return create_box(vec2(0.0), wh, wh, vec2(0.0));
}

box2 create_box() {
  return create_box(vec2(0.0), 1.0, 1.0, vec2(0.0));
}

/**
  求一个坐标点 p 在 box 中的相对坐标值 （0 ~ 1）

  参数：
    vec2 p    坐标点
    box2 box  当前 box 对象
  
  返回值：
    vec2 单位坐标值
 */
vec2 box_quad(vec2 p, box2 box) {
  vec2 a = box.a;
  vec2 b = box.b;
  vec2 c = box.c;
  vec2 d = box.d;

  float d1 = sdf_line(p, a, b);
  float d2 = sdf_line(p, b, c);
  float d3 = sdf_line(p, c, d);
  float d4 = sdf_line(p, d, a);

  if(d1 >= 0.0 && d2 >= 0.0 && d3 >= 0.0 && d4 >= 0.0 ||
     d1 <= 0.0 && d2 <= 0.0 && d3 <= 0.0 && d4 <= 0.0) {
    
    vec2 v1 = b - a;
    vec2 v2 = d - a;
    vec2 vp = p - a;

    float l1 = length(v1);
    float l2 = length(v2);
    float p1 = dot(vp, v1) / l1;
    float p2 = dot(vp, v2) / l2;

    float ang = angle(v2, v1);
    float x = (p1 - abs(d1) / tan(ang));
    float y = (p2 - abs(d4) / tan(ang));

    x /= l1;
    y /= l2;

    return vec2(x, y);
  }

  return vec2(-1.0);
}

box2 transform(box2 box, mat3 matrix) {
  return box2(
    transform(box.a, matrix),
    transform(box.b, matrix),
    transform(box.c, matrix),
    transform(box.d, matrix)
  );
}

box2 translate(box2 box, vec2 xy) {
  return box2(
    translate(box.a, xy), 
    translate(box.b, xy), 
    translate(box.c, xy), 
    translate(box.d, xy)
  );
}

box2 scale(box2 box, vec2 origin, vec2 scaleXY) {
  return box2(
    scale(box.a, origin, scaleXY), 
    scale(box.b, origin, scaleXY), 
    scale(box.c, origin, scaleXY), 
    scale(box.d, origin, scaleXY)
  );
}

box2 scale(box2 box, vec2 scaleXY) {
  return box2(
    scale(box.a, scaleXY), 
    scale(box.b, scaleXY), 
    scale(box.c, scaleXY), 
    scale(box.d, scaleXY)
  );
}

box2 rotate(box2 box, vec2 origin, float ang) {
  return box2(
    rotate(box.a, origin, ang),
    rotate(box.b, origin, ang),
    rotate(box.c, origin, ang),
    rotate(box.d, origin, ang)
  );
}

box2 rotate(box2 box, float ang) {
  return box2(
    rotate(box.a, ang),
    rotate(box.b, ang),
    rotate(box.c, ang),
    rotate(box.d, ang)
  );
}

box2 skew(box2 box, vec2 origin, vec2 skewXY) {
  return box2(
    skew(box.a, origin, skewXY),
    skew(box.b, origin, skewXY),
    skew(box.c, origin, skewXY),
    skew(box.d, origin, skewXY)
  );
}

box2 skew(box2 box, vec2 skewXY) {
  return box2(
    skew(box.a, skewXY),
    skew(box.b, skewXY),
    skew(box.c, skewXY),
    skew(box.d, skewXY)
  );
}

#endif