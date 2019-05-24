#ifndef M_PATTERN

#define M_PATTERN

vec2 grid_xy(in vec2 st, in vec2 rc) {
  return fract(st * rc);
}

vec2 grid_index(in vec2 st, in vec2 rc) {
  return floor(st * rc);
}

#endif