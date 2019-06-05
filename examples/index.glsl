#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

// uniform float dd_time;
uniform vec2 dd_randseed0;
uniform vec2 dd_resolution;
uniform int dd_keyUp;
uniform int dd_frameIndex;
// uniform int dd_mouseDown;
uniform vec2 dd_click;
uniform vec2 dd_touchPosition;

uniform sampler2D dd_samplerFeedback;

varying vec2 vTextureCoord;

void main() {
  vec2 st =  gl_FragCoord.xy / dd_resolution.xy;
  if(dd_frameIndex == 0 || dd_keyUp == 70 || dd_click.x >= 0.0 || dd_touchPosition.x >= 0.0) {
    box2 box = create_box(vec2(0.25), 0.5, 0.5);

    // box.a = vec2(0.25, 0.25);
    // box.b = vec2(0.75, 0.25);
    // box.c = vec2(0.75, 0.75) + vec2(0.2, 0);
    // box.d = vec2(0.25, 0.75) + vec2(0.2, 0);

    // box = rotate(box, vec2(0.5), PI / 10.0);
    // box = translate(box, vec2(0.1, 0.0));
    // box = scale(box, vec2(0.5), vec2(1.5, 1.0));
    box = skew(box, vec2(0.5), vec2(0.7, 0.0));

    st = box_quad(st, box);
    
    // st = rotate(st, vec2(0.5), PI / 10.0);
    // st = skew(st, vec2(0.5), vec2(0.5, 0.0));
    // st = scale(st, vec2(0.5), vec2(1.0, 1.0));
    
    float d = sdf_rect(st, vec2(0.25), 0.5, 0.5);
    // d = sdf_arc(st, vec2(0.25), 0.5, 0.0, PI / 2.0);
    d = fill(d);
    color(d, hsb2rgb(vec3(random(dd_randseed0 + float(dd_frameIndex)), 1.0, 1.0)));
  } else {
    gl_FragColor = texture2D(dd_samplerFeedback, st);
  }
}