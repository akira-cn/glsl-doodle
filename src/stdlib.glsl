#ifndef M_STDLIB

#define M_STDLIB

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// float random(vec2 st, float a, float b) {
//   float p = random(st);
//   return lerp(a, b, p);
// }

vec3 random_color3(vec2 st) {
  return vec3(random(st), random(st + 1.0), random(st + 2.0));
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

#endif