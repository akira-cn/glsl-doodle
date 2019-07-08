#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 center = vec2(0.5);
  float d = distance(st, center);
  gl_FragColor.rgb = step(0.25, d) * vec3(1.0);
  gl_FragColor.a = 1.0;
}