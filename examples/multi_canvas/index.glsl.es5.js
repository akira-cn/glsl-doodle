"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#pragma include <stdlib>\n#pragma include <graph>\n#pragma include <color>\n#pragma include <pattern>\n\nuniform vec2 dd_randseed0;\n\nvoid main() {\n  gl_FragColor = vec4(hsb2rgb(vec3(random(dd_randseed0), 1.0, 1.0)), 1.0);\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* eslint-disable-next-line */
shader(_templateObject());