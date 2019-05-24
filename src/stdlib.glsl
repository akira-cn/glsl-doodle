#ifndef M_STDLIB

#define M_STDLIB

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 random_color(vec2 st) {
  return vec3(random(st), random(st + 1.0), random(st + 2.0));
}

vec2 lerp(in vec2 p, in vec2 s, in vec2 e) {
  return s * (vec2(1.0, 1.0) - p) + e * p;
}

#endif