#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform float dd_time;
uniform vec2 dd_randseed0;
uniform vec2 dd_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  float rx = mix(-0.2, 0.2, noise(random(st) + dd_randseed0 + dd_time));
  float ry = mix(-0.2, 0.2, noise(random(st) + dd_randseed0 * 1433.59 + dd_time));

  float dis = distance(st, vec2(0.5));
  dis = pow((1.0 - dis), 2.0);

  float d = sdf_circle(st + vec2(rx, ry), vec2(0.5), 0.2);
  d = fill(d, 0.1);

  gl_FragColor = vec4(dis * d * vec3(1.0), 1.0);
}