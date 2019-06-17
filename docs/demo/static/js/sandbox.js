/* eslint-disable */
"use strict";

function exec(code) {
  // console.log(Doodle);
  const doodle = new Doodle(glslDoodle);
  doodle.compile(code).then((program) => {
    doodle.useProgram(program);
    doodle.render();
  });
}

function makeOutput(logger) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  var output = window.parent.document.getElementById('output');
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    output.innerHTML += "<div class=\"".concat(level, "\">&gt; ").concat(args.map(function (arg) {
      try {
        return typeof arg === 'string' ? arg : JSON.stringify(arg);
      } catch (ex) {
        return arg;
      }
    }).join(' '), "</div>");
    output.scrollTop = output.scrollHeight;
    return logger.apply(void 0, args);
  };
}
/* eslint-disable no-console */


console.log = makeOutput(console.log);
console.warn = makeOutput(console.warn, 'warn');
console.error = makeOutput(console.error, 'error');
/* eslint-enable no-console */

window.exec = exec;
window.parent.codeChange();