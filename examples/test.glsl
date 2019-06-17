#ifdef GL_ES
precision mediump float;
#endif

#pragma texture https://p4.ssl.qhimg.com/t012170360e1552ce17.png
#pragma include <graphics>
#pragma include <color>

uniform vec2 dd_randseed;
uniform vec2 dd_resolution;
uniform sampler2D dd_sampler0;
uniform sampler2D dd_samplerFeedback;
uniform int dd_frameIndex;
uniform int dd_mouseEvent;
uniform int dd_touchEvent;
uniform int dd_keyEvent;
uniform vec2 dd_mousePosition;
uniform vec2 dd_touchPosition;
uniform int dd_mouseButtons;
uniform int dd_keyCode;

varying vec2 vTextureCoord;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;

  // if(dd_touchPosition.x >= 0.0) {
  //   float d = sdf_circle(st, dd_touchPosition, 0.1);
  //   gl_FragColor.rgb = d * HSB(1.0, 1.0, 1.0);
  //   gl_FragColor.a = 1.0;
  // } else {
  //   gl_FragColor.rgba = vec4(0, 0, 0, 1.0);
  // }

  if(dd_frameIndex == 0 || dd_mouseEvent == 1 || dd_keyEvent == 1 || dd_touchEvent == 1) {
    gl_FragColor = vec4(vec2(dd_randseed), 0, 1.0);
    // gl_FragColor = texture2D(dd_sampler0, vTextureCoord);
  } else {
    gl_FragColor = texture2D(dd_samplerFeedback, st);
    // gl_FragColor = texture2D(dd_sampler0, vTextureCoord);
  }

  // gl_FragColor.rgb = HSB(random(vec2(dd_keyCode)), 1.0, 1.0);
  // gl_FragColor.a = 1.0;
}