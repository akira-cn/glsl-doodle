#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>

uniform vec2 dd_resolution;

float f(float x) {
  // return sin(x * 2.0 * PI);
  // return cos(x * 2.0 * PI);
  // return 2.0 * x;
  // return 0.1 / (x + 0.02);
  // return smoothstep(0.1, 0.9, x);
  return x * x;
}

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  st = mix(vec2(-5), vec2(5), st);
  float d = PLOT(f, st, 0.01);
  gl_FragColor.rgb = (step(-0.05, d) - step(0.05, d)) * vec3(1.0);
  gl_FragColor.a = 1.0;
}