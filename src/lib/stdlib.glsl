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

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

//
// Description : GLSL 2D simplex noise function
//      Author : Ian McEwan, Ashima Arts
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License :
//  Copyright (C) 2011 Ashima Arts. All rights reserved.
//  Distributed under the MIT License. See LICENSE file.
//  https://github.com/ashima/webgl-noise
//
float snoise(vec2 v) {
    // Precompute values for skewed triangular grid
    const vec4 C = vec4(0.211324865405187,
                        // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,
                        // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,
                        // -1.0 + 2.0 * C.x
                        0.024390243902439);
                        // 1.0 / 41.0

    // First corner (x0)
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    // Other two corners (x1, x2)
    vec2 i1 = vec2(0.0);
    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;

    // Do some permutations to avoid
    // truncation effects in permutation
    i = mod289(i);
    vec3 p = permute(
            permute( i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(
                        dot(x0,x0),
                        dot(x1,x1),
                        dot(x2,x2)
                        ), 0.0);

    m = m*m ;
    m = m*m ;

    // Gradients:
    //  41 pts uniformly over a line, mapped onto a diamond
    //  The ring size 17*17 = 289 is close to a multiple
    //      of 41 (41*7 = 287)
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt(a0*a0 + h*h);
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

    // Compute final noise value at P
    vec3 g = vec3(0.0);
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
    return 130.0 * dot(m, g);
}

#ifndef MAX_OCTAVES
#define MAX_OCTAVES 1024
#endif

float fbm (vec2 st, int octaves, float initValue, float amplitude, float frequency, float lacunarity, float gain) {
  float value = initValue;
  // Loop of octaves
  for (int i = 0; i < MAX_OCTAVES; i++) {
      value += amplitude * noise(frequency * st);
      frequency *= lacunarity;
      amplitude *= gain;
      if(i >= octaves) break;
  }
  return value;
}

float fbm (vec2 st, int octaves) {
  return fbm(st, octaves, 0., .5, 1., 2., .5);
}

float sfbm (vec2 st, int octaves, float initValue, float amplitude, float frequency, float lacunarity, float gain) {
  float value = initValue;
  // Loop of octaves
  for (int i = 0; i < MAX_OCTAVES; i++) {
      value += amplitude * snoise(frequency * st);
      frequency *= lacunarity;
      amplitude *= gain;
      if(i >= octaves) break;
  }
  return value;
}

float sfbm (vec2 st, int octaves) {
  return sfbm(st, octaves, 0., .5, 1., 2., .5);
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