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
  float x = st.x;
  float d1 = sdf_line(
    st, 
    vec2(x - 0.01, f(x - 0.01)), 
    vec2(x, f(x))
  );
  float d2 = sdf_line(
    st, 
    vec2(x, f(x)), 
    vec2(x + 0.01, f(x + 0.01))
  );
  float d = min(d1, d2);
  gl_FragColor.rgb = (step(-0.005, d) - step(0.005, d)) * vec3(1.0);
  gl_FragColor.a = 1.0;
}