#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

#define udf_seg(st, a, b) stroke(sdf_seg(st, a, b), 0.005)

bool koch(in vec2 st, in vec2 a, in vec2 b) {
  vec2 c = mix(a, b, 1.0 / 3.0);
  vec2 d = mix(a, b, 2.0 / 3.0);
  vec2 e = rotate(d, c, PI / 3.0);

  bool df = udf_seg(st, a, c) > 0.0
          || udf_seg(st, c, e) > 0.0
          || udf_seg(st, e, d) > 0.0
          || udf_seg(st, d, b) > 0.0;
  
  return df;
}

bool koch2(in vec2 st, in vec2 a, in vec2 b) {
  vec2 c = mix(a, b, 1.0 / 3.0);
  vec2 d = mix(a, b, 2.0 / 3.0);
  vec2 e = rotate(d, c, PI / 3.0);

  bool df = koch(st, a, c)
         || koch(st, c, e)
         || koch(st, e, d)
         || koch(st, d, b);
  
  return df;
}

UDF koch3(in vec2 st, in vec2 a, in vec2 b) {
  vec2 c = mix(a, b, 1.0 / 3.0);
  vec2 d = mix(a, b, 2.0 / 3.0);
  vec2 e = rotate(d, c, PI / 3.0);

  bool df = koch2(st, a, c)
         || koch2(st, c, e)
         || koch2(st, e, d)
         || koch2(st, d, b);
  
  return float(df);
}

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  vec2 a = vec2(0.3, 0.3);
  vec2 b = vec2(0.7, 0.3);
  vec2 c = vec2(0.5, 0.7);

  float d1 = koch3(st, a, b);
  float d2 = koch3(st, b, c);
  float d3 = koch3(st, c, a);

  gl_FragColor = vec4(vec3(d1 + d2 + d3), 1.0);
}