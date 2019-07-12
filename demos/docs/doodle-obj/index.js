(async function () {
  const fragment = 'https://raw.githubusercontent.com/akira-cn/glsl-doodle/master/demos/preview/grids/index.glsl';
  const doodle = new Doodle(document.getElementById('myDoodle'));
  const program = await doodle.load(fragment);
  doodle.useProgram(program);
  doodle.render();
}());