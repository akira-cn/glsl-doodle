#ifndef M_COLOR

#define M_COLOR

#ifndef UDF
#define UDF float
#endif

vec3 rgb2hsb( in vec3 c ){
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

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