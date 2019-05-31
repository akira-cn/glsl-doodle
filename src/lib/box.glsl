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
vec2 center(in box2 box) {
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
box2 create_box(in vec2 point, float w, float h, in vec2 anchor) {
  vec2 size = vec2(w, h);
  vec2 a = point + size * (vec2(0.0) - anchor);
  vec2 b = point + size * (vec2(1.0, 0.0) - anchor);
  vec2 c = point + size * (vec2(1.0) - anchor);
  vec2 d = point + size * (vec2(0.0, 1.0) - anchor);

  return box2(a, b, c, d);  
}

box2 create_box(in vec2 point, float w, float h) {
  return create_box(point, w, h, vec2(0.0));
}

box2 create_box(in vec2 point, float wh) {
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

#endif