(async function () {
  const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_count;

void main() {
gl_FragColor = (0.5 + 0.5 * sin(0.05 * u_count)) * vec4(1, 0, 0, 1);
}
`;

  const doodle = new Doodle(document.getElementById('myDoodle'));
  const program = await doodle.compile(fragment);
  doodle.useProgram(program);
  doodle.uniforms.u_count = 0;
  requestAnimationFrame(function update() {
    doodle.uniforms.u_count++;
    requestAnimationFrame(update);
  });
  doodle.render();
}());