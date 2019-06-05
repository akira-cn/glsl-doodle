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
uniform int dd_frameIndex;

uniform sampler2D dd_samplerFeedback;
varying highp vec2 vTextureCoord;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  // st = mix(vec2(-10, -10), vec2(10, 10), st);
  
  // float d = distance(st, vec2(0));
  // d *= noise(dd_randseed0 + st + dd_time);
  // d = fill(d, 1.0);

  // gl_FragColor = vec4(vec3(d), 1.0);
  if(dd_frameIndex == 0) {
    float d = sdf_circle(st, vec2(0.5), 0.2);
    d = fill(d, 0.5);
    gl_FragColor = vec4(d * vec3(1.0, 1.0, 1.0), 1.0);
  } else {
    vec4 left = texture2D(dd_samplerFeedback, st + vec2(-0.01, 0.0));
    vec4 right = texture2D(dd_samplerFeedback, st + vec2(0.01, 0.0));
    vec4 up = texture2D(dd_samplerFeedback, st + vec2(0.0, -0.01));
    vec4 down = texture2D(dd_samplerFeedback, st + vec2(0.0, 0.01));
    gl_FragColor = (left + right + up + down) / 4.0;
  }
}