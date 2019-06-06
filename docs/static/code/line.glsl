#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 dd_resolution;

float line_dist(vec2 p, vec2 l) {
  float d = cross(vec3(p, 0.0), vec3(l, 0.0)).z / length(l);
  return abs(d);
}

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 line = vec2(0.5);
  float d = line_dist(st, line);
  gl_FragColor.rgb = step(0.01, d) * vec3(1.0);
  gl_FragColor.a = 1.0;
}