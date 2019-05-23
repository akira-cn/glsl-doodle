#ifndef STDLIB

#define STDLIB

vec2 grid_xy(in vec2 st, in vec2 rc) {
  return fract(st * rc);
}

vec2 grid_index(in vec2 st, in vec2 rc) {
  return floor(st * rc);
}

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 random_color(vec2 st) {
  return vec3(random(st), random(st + 1.0), random(st + 2.0));
}

#endif