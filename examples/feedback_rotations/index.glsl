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

varying vec2 vTextureCoord;

void main() {
  vec2 st = vTextureCoord;
  float xPixel = 1.0 / dd_resolution.x; //The size of a single pixel
  float yPixel = 1.0 / dd_resolution.y;
  // vec2 st = gl_FragCoord.xy / dd_resolution;
  box2 box = create_box();
  // box = translate(box, vec2(xPixel, 0.0));
  box = rotate(box, vec2(0.5 + 0.05 * sin(dd_time)), 0.02 * dd_time);
  st = box_quad(st, box);

  if(dd_frameIndex == 0) {
    float d = sdf_circle(st, vec2(0.4), 0.02);
    d = fill(d);
    gl_FragColor = vec4(d * vec3(1.0, 1.0, 1.0), 1.0);
  } 
  if(dd_frameIndex > 0) {
    // vec2 st = rotate(st, vec2(0.6), 0.02 * dd_time);
    vec4 left = texture2D(dd_samplerFeedback, st + vec2(-xPixel, 0.0));
    vec4 right = texture2D(dd_samplerFeedback, st + vec2(xPixel, 0.0));
    vec4 up = texture2D(dd_samplerFeedback, st + vec2(0.0, -yPixel));
    vec4 down = texture2D(dd_samplerFeedback, st + vec2(0.0, yPixel));
    gl_FragColor = texture2D(dd_samplerFeedback, st);
    float factor = 8.0 * 0.016 * 
      (
        1.6 * left.r + 
        right.r + 
        down.r + 
        3.0 * up.r - 
        6.6 * gl_FragColor.r
      );

    float minimum = 0.003;
    if (factor >= -minimum && factor < 0.0) factor = -minimum;
 
    gl_FragColor.rgb += factor;
    gl_FragColor.a = 1.0;

    float d = sdf_circle(st, vec2(0.4), 0.02);
    if(d > 0.0) {
      gl_FragColor.rgb += 0.5 * d;
    }
  }
}