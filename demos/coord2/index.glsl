#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  gl_FragColor.rgb = step(0.5, st.x) * vec3(1.0);
  gl_FragColor.a = 1.0;
}