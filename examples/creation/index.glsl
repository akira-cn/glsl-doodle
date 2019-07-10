#ifdef GL_ES
precision mediump float;
#endif

uniform float dd_time;
uniform vec2 dd_resolution;

// http://www.pouet.net/prod.php?which=57245
void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  vec2 r = dd_resolution.xy;
  float t = dd_time;

  vec3 c;
  float l, z = t;  

  for(int i = 0; i < 3; i++) {
    vec2 uv, p = st;
    uv = p;
    p -= 0.5;
    p.x *= r.x / r.y;
    z += 0.07;
    l = length(p);
    uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z * 2.0));
    c[i] = 0.01 / length(abs(mod(uv, 1.0) - 0.5));
  }

  gl_FragColor = vec4(c/l, t);
}