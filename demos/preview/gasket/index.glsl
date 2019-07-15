#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;

SDF gasket(in vec2 st, in vec2 a, in vec2 b, in vec2 c) {
  const int count = 5;

  for(int i = 0; i < count; i++) {
    vec2 ab = mix(a, b, 0.5);
    vec2 ac = mix(a, c, 0.5);
    vec2 bc = mix(b, c, 0.5);

    if(sdf_triangle(st, a, ab, ac) >= 0.0) {
      b = ab;
      c = ac;
      continue;
    }
    if(sdf_triangle(st, c, ac, bc) >= 0.0) {
      a = ac;
      b = bc;
      continue;
    }
    if(sdf_triangle(st, b, bc, ab) >= 0.0) {
      c = bc;
      a = ab;
      continue;
    }
    return 0.0;
  }

  return sdf_triangle(st, a, b, c);
}

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  vec2 a = vec2(0.1, 0.1);
  vec2 b = vec2(0.9, 0.1);
  vec2 c = vec2(0.5, 0.9);

  float d = gasket(st, a, b, c);
  d = fill(d, 0.2);

  gl_FragColor = vec4(vec3(d), 1.0);
}