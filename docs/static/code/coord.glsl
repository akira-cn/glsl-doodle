#ifdef GL_ES
precision mediump float;
#endif

void main() {
  vec2 st = gl_FragCoord.xy;
  if(st.x > 256.0) {
    gl_FragColor = vec4(1.0);
  } else {
    gl_FragColor = vec4(0, 0, 0, 1.0);
  }
}