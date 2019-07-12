import glsl from './glsl-lang.js';

export default function (htmlCode, cssCode, jsCode) {
  return {
    javascript: {
      code: jsCode,
      transformer: 'glsl',
      transform(code) {
        return `const doodle = new Doodle(glslDoodle);
doodle.compile(\`${code}\`).then((program) => {
  doodle.useProgram(program);
  doodle.render();
});`;
      },
      editorHook(monaco, code, language) {
        // Register a new language
        monaco.languages.register({id: 'glsl'});

        // Register a tokens provider for the language
        monaco.languages.setMonarchTokensProvider('glsl', glsl);
      },
      visible: true,
    },
    html: {
      code: htmlCode,
      transformer: 'html',
    },
    css: {
      code: cssCode,
      transformer: 'css',
    },
    foldBoxes: ['html'],
    packages: {
      js: [],
      css: [],
    },
  };
}