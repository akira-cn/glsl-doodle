#ifndef M_STDLIB

#define M_STDLIB

#ifndef PI
#define PI 3.141592653589793
#endif

#ifndef FLT_EPSILON
#define FLT_EPSILON 0.000001
#endif

// https://math.stackexchange.com/questions/1098487/atan2-faster-approximation
float atan2(float dy, float dx) {
  float ax = abs(dx);
  float ay = abs(dy);
  float a = min(ax, ay) / (max(ax, ay) + FLT_EPSILON);
  float s = a * a;
  float r = ((-0.0464964749 * s + 0.15931422) * s - 0.327622764) * s * a + a;
  if(ay > ax) r = 1.57079637 - r;
  if(dx < 0.0) r = PI - r;
  if(dy < 0.0) r = -r;
  return r;
}

float atan2(vec2 v) {
  return atan2(v.y, v.x);
}

/**
  从 v1 相对 v2 的逆时针夹角, 0 ~ 2 * PI
 */
float angle(vec2 v1, vec2 v2) {
  float ang = atan2(v1) - atan2(v2);
  if(ang < 0.0) ang += 2.0 * PI;
  return ang;
}

float angle(vec2 v) {
  return angle(v, vec2(1.0, 0.0));
}

vec2 center(vec2 v) {
  return v * 0.5;
}

vec2 center(vec2 v1, vec2 v2) {
  return (v1 + v2) * 0.5;
}

highp float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

highp float random(vec2 st, float a, float b) {
  highp float p = random(st);
  return mix(a, b, p);
}

highp vec2 random2(vec2 st){
  highp vec2 v = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(v) * 43758.5453123);
}

highp vec3 random3(vec2 st) {
  highp vec3 v = vec3(random2(st), random(st));
  return v;
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
highp float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

// https://www.shadertoy.com/view/MdX3zr
// Thx to Las^Mercury
highp float noise(vec3 p) {
	vec3 i = floor(p);
	vec4 a = dot(i, vec3(1.0, 57.0, 21.0)) + vec4(0.0, 57.0, 21.0, 78.0);
	vec3 f = cos((p - i) * acos(-1.0)) * (-0.5) + 0.5;
	a = mix(sin(cos(a) * a), sin(cos(1.0 + a) * (1.0 + a)), f.x);
	a.xy = mix(a.xz, a.yw, f.y);
	return mix(a.x, a.y, f.z);
}

/**
  将直角坐标转为极坐标
 */
vec2 polar(vec2 st, vec2 c) {
  vec2 p = c - st;
  float r = length(p) * 2.0;
  float a = atan(p.y, p.x);

  return vec2(r, a);  
}

vec2 polar(vec2 st) {
  return polar(st, vec2(0.5));
}

#endif