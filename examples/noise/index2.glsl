#version 300 es
precision highp float;
precision highp int;
#define WEBGL2
#ifndef M_SHADERTOY
#define M_SHADERTOY
// https://www.shadertoy.com/howto
#define iResolution vec3(dd_resolution,0)
#define iTime dd_time
// #define iTimeDelta
#define iFrame dd_frameIndex
// #define iChannelTime
#define iMouse vec4(dd_mousePosition,0,0)
// #define iDate
// #define iSampleRate
// #define iChannelResolution
#define iChannel0 dd_sampler0
#define iChannel1 dd_sampler1
#define iChannel2 dd_sampler2
#define iChannel3 dd_sampler3
uniform float dd_time;
uniform int dd_frameIndex;
uniform vec2 dd_resolution;
uniform vec2 dd_mousePosition;
#endif
#define pi 3.14159
#define thc(a,b) tanh(a*cos(b))/tanh(a)
#define ths(a,b) tanh(a*sin(b))/tanh(a)
#define sabs(x) sqrt(x*x+1e-2)
//#define sabs(x, k) sqrt(x*x+k)-0.1
#define Rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))
float cc(float a, float b) {
float f = thc(a, b);
return sign(f) * pow(abs(f), 0.25);
}
float cs(float a, float b) {
float f = ths(a, b);
return sign(f) * pow(abs(f), 0.25);
}
vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
return a + b*cos( 6.28318*(c*t+d) );
}
float h21(vec2 a) {
return fract(sin(dot(a.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float mlength(vec2 uv) {
return max(abs(uv.x), abs(uv.y));
}
float mlength(vec3 uv) {
return max(max(abs(uv.x), abs(uv.y)), abs(uv.z));
}
float smin(float a, float b) {
float k = 0.12;
float h = clamp(0.5 + 0.5 * (b-a) / k, 0.0, 1.0);
return mix(b, a, h) - k * h * (1.0 - h);
}
define MAX_STEPS 400
#define MAX_DIST 100.
#define SURF_DIST .001
#define FK(k) floatBitsToInt(k*k/7.)^floatBitsToInt(k)
float hash(float a, float b) {
int x = FK(a), y = FK(b);
return float((x*x+y)*(y*y-x)-x)/2.14e9;
}
vec3 erot(vec3 p, vec3 ax, float ro) {
return mix(dot(ax, p)*ax, p, cos(ro)) + cross(ax,p)*sin(ro);
}
vec3 face(vec3 p) {
vec3 a = abs(p);
return step(a.yzx, a.xyz)*step(a.zxy, a.xyz)*sign(p);
}
vec2 hash( vec2 p ) // replace this by something better
{
p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}
float noise( in vec2 p )
{
const float K1 = 0.366025404; // (sqrt(3)-1)/2;
const float K2 = 0.211324865; // (3-sqrt(3))/6;
vec2  i = floor( p + (p.x+p.y)*K1 );
vec2  a = p - i + (i.x+i.y)*K2;
float m = step(a.y,a.x); 
vec2  o = vec2(m,1.0-m);
vec2  b = a - o + K2;
vec2  c = a - 1.0 + 2.0*K2;
vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
vec3  n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
return dot( n, vec3(70.0) );
}
float n2(vec2 uv) {
mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
float f  = 0.5000*noise( uv ); uv = m*uv;
f += 0.2500*noise( uv ); uv = m*uv;
f += 0.1250*noise( uv ); uv = m*uv;
f += 0.0625*noise( uv ); uv = m*uv;
return 0.5 + 0.5*f;
}
float sdBox(vec3 p, vec3 s) {
p = abs(p)-s;
return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}
vec3 getRo() {
vec2 m = iMouse.xy/iResolution.xy;
float t = 0.12 * iTime;
vec3 ro = vec3(3. * cos(t), 0.8, 3. * sin(t));
//ro.yz *= Rot(-m.y*3.14+1.);
//ro.xz *= Rot(-m.x*6.2831);
return ro;
}
float GetDist(vec3 p) {
vec2 uv = vec2(p.x + 0.1 * iTime, p.z);
float n = n2(uv);
p.y += -pow(n, 8.);
p.y += 0.1 * cos(length(p) * 1.5 + 100. * pow(n,16.) - iTime);
float d = p.y;
return 0.3 * d; // <- noise creates lots of artifacts / thin regions
}
float RayMarch(vec3 ro, vec3 rd, float z) {
float dO=0.;
float s = sign(z);
for(int i=0; i<MAX_STEPS; i++) {
vec3 p = ro + rd*dO;
float dS = GetDist(p);
if (s != sign(dS)) { z *= 0.5; s = sign(dS); }
if(abs(dS)<SURF_DIST || dO>MAX_DIST) break;
dO += dS*z; 
}
return min(dO, MAX_DIST);
}
vec3 GetNormal(vec3 p) {
float d = GetDist(p);
vec2 e = vec2(.001, 0);
vec3 n = d - vec3(
GetDist(p-e.xyy),
GetDist(p-e.yxy),
GetDist(p-e.yyx));
return normalize(n);
}
vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
vec3 f = normalize(l-p),
r = normalize(cross(vec3(0,1,0), f)),
u = cross(f,r),
c = f*z,
i = c + uv.x*r + uv.y*u,
d = normalize(i);
return d;
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;
vec3 ro = getRo();
vec3 rd = GetRayDir(uv, ro, vec3(0), 3. );
vec3 col = vec3(0);
float d = RayMarch(ro, rd, 1.);
float IOR = 1.05;
vec3 p = ro + rd * d;
if(d<MAX_DIST) {
vec3 n = GetNormal(p);
vec3 r = reflect(rd, n);
vec3 pIn = p - 4. * SURF_DIST * n;
vec3 rdIn = refract(rd, n, 1./IOR);
float dIn = RayMarch(pIn, rdIn, -1.);
vec3 pExit = pIn + dIn * rdIn;
vec3 nExit = -GetNormal(pExit); // *-1.; ?
float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
col = vec3(dif);
float fresnel = pow(1.+dot(rdIn, nExit), 5.);
//col *= (0.5 - 0.5 * sin(100. * exp(-length(p)) - iTime)) * fresnel;
float fresnel2 = pow(1.+dot(rd, n), 3.); 
col = 1. - col;
n = 0.5 + 0.5 * n;
//col *= exp(20. * p.x);
vec3 e = vec3(0.5);
col *= pal(atan(n.x,n.z) * 2. / pi + 0.5, e, e, e, 0.5 * vec3(0,1,2)/3.);
col += fresnel2;
col += 0.35 * thc(6., 100. * exp(-length(p)) - iTime);
}
// col *= exp(-0.5 * length(p.xz));
col = pow(col, vec3(.4545));	// gamma correction
fragColor = vec4(col,1.0);
}
out vec4 FragColor;
void main() {
mainImage(FragColor, gl_FragCoord.xy);
}