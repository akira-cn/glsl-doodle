#ifndef M_COLOR

#define M_COLOR

#ifndef UDF
#define UDF float
#endif

void color(in UDF d, in vec4 c1, vec4 c2) {
  if(d > 0.0) {
    gl_FragColor = mix(c2, c1, d);
  }
}

void color(in UDF d, in vec4 c1, in vec3 c2) {
  color(d, c1, vec4(c2, 1.0));
}

void color(in UDF d, in vec3 c1, in vec4 c2) {
  color(d, vec4(c1, 1.0), c2);
}

void color(in UDF d, in vec3 c1, in vec3 c2) {
  color(d, vec4(c1, 1.0), vec4(c2, 1.0));
}

void color(in UDF d, in vec4 c) {
  color(d, c, gl_FragColor);
}

void color(in UDF d, in vec3 c) {
  color(d, vec4(c, 1.0), gl_FragColor);
}

#endif