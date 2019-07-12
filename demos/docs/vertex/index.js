(async function () {
  const fragmentURL = 'https://raw.githubusercontent.com/akira-cn/glsl-doodle/master/demos/preview/grids/index.glsl';

  const res = await fetch(fragmentURL);
  const fragment = await res.text();

  const vertex = `
attribute vec4 a_vertexPosition;

void main() {
mat4 matrix = mat4(
0.707, -0.707, 0, 0,
0.707, 0.707, 0, 0,
0, 0, 1, 0,
0, 0, 0, 1);
gl_PointSize = 1.0;
gl_Position = a_vertexPosition * matrix;
}
`;

  const doodle = new Doodle(document.getElementById('myDoodle'));
  const program = await doodle.compile(fragment, vertex);
  doodle.useProgram(program);
  doodle.render();
}());