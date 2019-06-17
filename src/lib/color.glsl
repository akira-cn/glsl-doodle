#ifndef M_COLOR

#define M_COLOR

#ifndef UDF
#define UDF float
#endif

vec3 rgb2hsb(vec3 c){
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb(vec3 c){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

vec4 rgba_color(int r, int g, int b, float a) {
  return vec4(float(r / 255), float(g / 255), float(b / 255), a);
}

vec4 rgba_color(float r, float g, float b, float a) {
  return vec4(r, g, b, a);
}

vec4 rgba_color(vec4 v) {
  return v;
}

vec4 rgba_color(vec3 v, float a) {
  return vec4(v, a);
}

vec3 rgb_color(int r, int g, int b) {
  return rgba_color(r, g, b, 1.0).rgb;
}

vec3 rgb_color(float r, float g, float b) {
  return rgba_color(r, g, b, 1.0).rgb;
}

vec3 rgb_color(vec3 v) {
  return vec4(v, 1.0).rgb;
}

vec4 hsba_color(float h, float s, float b, float a) {
  return vec4(hsb2rgb(vec3(h, s, b)), a);
}

vec4 hsba_color(vec4 v) {
  return vec4(hsb2rgb(v.xyz), v.w);
}

vec4 hsba_color(vec3 v, float a) {
  return vec4(hsb2rgb(v), a);
}

vec3 hsb_color(float h, float s, float b) {
  return hsba_color(h, s, b, 1.0).rgb;
}

vec3 hsb_color(vec3 v) {
  return hsba_color(v, 1.0).rgb;
}

#ifndef RGB
#define RGB rgb_color
#endif

#ifndef RGBA
#define RGBA rgba_color
#endif

#ifndef HSB
#define HSB hsb_color
#endif

#ifndef HSBA
#define HSBA hsba_color
#endif

void color(UDF d, vec4 c1, vec4 c2) {
  gl_FragColor = mix(c2, c1, d);
}

void color(UDF d, vec4 c1, vec3 c2) {
  color(d, c1, vec4(c2, 1.0));
}

void color(UDF d, vec3 c1, vec4 c2) {
  color(d, vec4(c1, 1.0), c2);
}

void color(UDF d, vec3 c1, vec3 c2) {
  color(d, vec4(c1, 1.0), vec4(c2, 1.0));
}

void color(UDF d, vec4 c) {
  color(d, c, gl_FragColor);
}

void color(UDF d, vec3 c) {
  color(d, vec4(c, 1.0), gl_FragColor);
}

#endif