#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>

uniform vec2 dd_resolution;

float f1(float x) {
  return x * x;
}

float f2(float x) {
  return sin(x * 2.0 * PI);
}

float f3(float x) {
  return smoothstep(0.1, 0.9, x);
}

float f4(float x) {
  return 0.1 / (x + 0.02);
}

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  st = mix(vec2(-5), vec2(5), st);
  float d1 = PLOT(f1, st, 0.01);
  float d2 = PLOT(f2, st, 0.01);
  float d3 = PLOT(f3, st, 0.01);
  float d4 = PLOT(f4, st, 0.01);

  vec3 color1 = (step(-0.05, d1) - step(0.05, d1)) * vec3(1.0, 0.0, 1.0);
  vec3 color2 = (step(-0.05, d2) - step(0.05, d2)) * vec3(1.0, 1.0, 0.0);
  vec3 color3 = (step(-0.05, d3) - step(0.05, d3)) * vec3(0.0, 1.0, 0.0);
  vec3 color4 = (step(-0.05, d4) - step(0.05, d4)) * vec3(0.0, 1.0, 1.0);

  gl_FragColor.rgb = color1 + color2 + color3 + color4;
  gl_FragColor.a = 1.0;
}