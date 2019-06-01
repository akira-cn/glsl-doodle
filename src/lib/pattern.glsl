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

#ifndef OCTAVES
#define OCTAVES 6
#endif

/* --- effects --- */

/**
  云雾
 */
float mist(in vec2 st) {
  //Initial values
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 0.0;

  // Loop of octaves
  for(int i = 0; i < OCTAVES; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

/**
  分形
 */
float juila_set(in vec2 st, in vec2 center, in float dist, in vec2 c, in float scale) {
  const int max_iterations = 255;
  vec2 uv = 2.5 * (st - center);
  int count = max_iterations;

  for(int i = 0; i < max_iterations; i++) {
    uv = c + vec2(uv.x * uv.x - uv.y * uv.y, uv.x * uv.y * 2.0);
    if(dot(uv, uv) > 4.0) {
      count = i;
      break;
    }
  }
  return float(count) * scale;
}

#endif