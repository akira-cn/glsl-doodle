#ifndef M_STDLIB

#define M_STDLIB

#define PI 3.141592653589793
#define FLT_EPSILON 0.000001

// https://math.stackexchange.com/questions/1098487/atan2-faster-approximation
float atan2(in float dy, in float dx) {
  float ax = abs(dx);
  float ay = abs(dy);
  float a = min(ax, ay) / (max(ax, ay) + FLT_EPSILON);
  float s = a * a;
  float r = ((-0.0464964749 * s + 0.15931422) * s - 0.327622764) * s * a + a;
  if(ay > ax) r = 1.57079637 - r;
  if(dx < 0.0) r = PI - r;
  if(dy < 0.0) r = -r;
  return r;
}

float atan2(in vec2 v) {
  return atan2(v.y, v.x);
}

/**
  从 v1 到 v2 的逆时针夹角, 0 ~ 2 * PI
 */
float angle(in vec2 v1, in vec2 v2) {
  float ang = atan2(v1) - atan2(v2);
  if(ang < 0.0) ang += 2.0 * PI;
  return ang;
}

float angle(in vec2 v) {
  return angle(v, vec2(1.0, 0.0));
}

float lerp(in float s, in float e, in float p) {
  return s * (1.0 - p) + e * p;
}

vec2 lerp(in vec2 s, in vec2 e, in float p) {
  return s * (1.0 - p) + e * p;
}

vec2 lerp(in vec2 s, in vec2 e, in vec2 p) {
  return s * (vec2(1.0, 1.0) - p) + e * p;
}

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(vec2 st, float a, float b) {
  float p = random(st);
  return lerp(a, b, p);
}

vec3 random_color3(vec2 st) {
  return vec3(random(st), random(st + 1.0), random(st + 2.0));
}

#endif