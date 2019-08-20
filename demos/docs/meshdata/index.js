(async function () {
  const vert = `
attribute vec3 a_vertexPosition;
attribute vec3 a_color;

varying vec3 vColor;

void main() {
gl_PointSize = 1.0;
gl_Position.xyz = a_vertexPosition;
gl_Position.w = 1.0;
vColor = a_color;
}
`;
  const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vColor;

void main() {
gl_FragColor = vec4(vColor, 1.0);
}
`;

  const doodle = new Doodle(document.getElementById('myDoodle'));
  const program = await doodle.compile(fragment, vert);
  doodle.useProgram(program, {
    a_color: {
      type: 'UNSIGNED_BYTE',
      normalize: true,
    },
  });

  const vertexColors = [
    [255, 0, 0],
    [255, 0, 0],
    [255, 255, 0],
  ];

  doodle.setMeshData([
    {
      positions: [[-1.0, -1.0, 0.0], [-1.0, 1.0, 0.0], [1.0, 1.0, 0.0]],
      cells: [[0, 1, 2]],
      attributes: {
        a_color: vertexColors,
      },
    },
    {
      positions: [[0.5, 0.5, 0], [-0.5, 0.8, 0], [1, -1, 0]],
      cells: [[0, 1, 2]],
      attributes: {
        a_color: vertexColors,
      },
    },
  ]);

  doodle.render();
}());