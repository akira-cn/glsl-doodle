/* eslint-disable-next-line */
shader`
#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_randseed0;

void main() {
  gl_FragColor = vec4(hsb2rgb(vec3(random(dd_randseed0), 1.0, 1.0)), 1.0);
}
`;