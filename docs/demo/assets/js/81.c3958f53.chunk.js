(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{529:function(n,o,e){"use strict";e.r(o),o.default="#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#pragma include <graphics>\n#pragma include <color>\n\nuniform vec2 dd_resolution;\n\nvoid main() {\n  vec2 st = gl_FragCoord.xy / dd_resolution;\n\n  vec3 color = vec3(0.0);\n\n  st = polar(st);\n\n  // Map the angle (-PI to PI) to the Hue (from 0 to 1)\n  // and the Saturation to the radius\n  color = HSB((0.5 * st.y / PI) + 0.5, st.x, 1.0);\n\n  gl_FragColor = vec4(color, 1.0);\n}"}}]);