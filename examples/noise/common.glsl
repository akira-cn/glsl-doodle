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