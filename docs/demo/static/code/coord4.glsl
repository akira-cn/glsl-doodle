#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  float d = smoothstep(0.0, 0.3, st.x) - smoothstep(0.7, 1.0, st.x);
  gl_FragColor.rgb = d * vec3(1.0);
  gl_FragColor.a = 1.0;
}