#ifndef M_PATTERN

#define M_PATTERN

vec2 grid_xy(in vec2 st, in vec2 grid) {
  return fract(st * grid);
}

vec2 grid_index(in vec2 st, in vec2 grid) {
  return floor(st * grid);
}

bool grid_odd_row(in vec2 idx, in vec2 grid) {
  return mod(idx.y, 2.0) != 0.0;
}

bool grid_even_row(in vec2 idx, in vec2 grid) {
  return mod(idx.y, 2.0) == 0.0;
}

bool grid_odd_col(in vec2 idx, in vec2 grid) {
  return mod(idx.x, 2.0) != 0.0;
}

bool grid_even_col(in vec2 idx, in vec2 grid) {
  return mod(idx.x, 2.0) == 0.0;
}

bool grid_odd(in vec2 idx, in vec2 grid) {
  return mod(idx.x, 2.0) != 0.0 && mod(idx.y, 2.0) == 0.0
    || mod(idx.x, 2.0) == 0.0 && mod(idx.y, 2.0) != 0.0;
}

bool grid_even(in vec2 idx, in vec2 grid) {
  return !grid_odd(idx, grid);
}

#endif