#ifndef MOD_TRANSFORM

#define MOD_TRANSFORM

/**
  计算向量和 box 的 transform
 */
vec2 transform(vec2 v0, mat3 matrix) {
  return vec2(matrix * vec3(v0, 1.0));
}

vec2 translate(vec2 v0, vec2 xy) {
  mat3 m = mat3(1, 0, 0, 0, 1, 0, xy.x, xy.y, 1);
  return transform(v0, m);
}

vec2 scale(vec2 v0, vec2 origin, vec2 scale) {
  mat3 m = mat3(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);
  return transform(v0 - origin, m) + origin;
}

vec2 scale(vec2 v0, vec2 scaleXY) {
  return scale(v0, vec2(0.0), scaleXY);
}

vec2 rotate(vec2 v0, vec2 origin, float ang) {
  float sinA = sin(ang);
  float cosA = cos(ang);
  mat3 m = mat3(cosA, -sinA, 0, sinA, cosA, 0, 0, 0, 1);
  return transform(v0 - origin, m) + origin;
}

vec2 rotate(vec2 v0, float ang) {
  return rotate(v0, vec2(0.0), ang);
}

vec2 skew(vec2 v0, vec2 origin, vec2 skew) {
  mat3 m = mat3(1, tan(skew.y), 0, tan(skew.x), 1, 0, 0, 0, 1);
  return transform(v0 - origin, m) + origin;
}

vec2 skew(vec2 v0, vec2 skewXY) {
  return skew(v0, vec2(0.0), skewXY);
}

#endif