import {toPath} from 'svg-points';
import svgMesh3d from 'svg-mesh-3d';

import {setupWebGL, createProgram, pointsToBuffer} from './helpers';

import DEFAULT_VERT from './default_vert.glsl';
import DEFAULT_FRAG from './default_frag.glsl';
import stdlib from './stdlib.glsl';
import graph from './graph.glsl';
import pattern from './pattern.glsl';

const GLSL_LIBS = {stdlib, graph, pattern};

export default class Doodle {
  static uniformTypes = {
    '1f': '1f',
    '2f': '2f',
    '3f': '3f',
    '4f': '4f',
    '1i': '1i',
    '2i': '2i',
    '3i': '3i',
    '4i': '4i',
    '1fv': '1fv',
    '2fv': '2fv',
    '3fv': '3fv',
    '4fv': '4fv',
    '1iv': '1iv',
    '2iv': '2iv',
    '3iv': '3iv',
    '4iv': '4iv',
    m2fv: 'Matrix2fv',
    m3fv: 'Matrix3fv',
    m4fv: 'Matrix4fv',
  }

  constructor(canvas, opts = {}) {
    this.options = opts;

    const gl = setupWebGL(canvas);
    this.gl = gl;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    this.verticesBuffer = gl.createBuffer();
    this.cellsBuffer = gl.createBuffer();

    this.vertices = [
      [-1.0, -1.0, 0.0],
      [1.0, -1.0, 0.0],
      [1.0, 1.0, 0.0],
      [-1.0, 1.0, 0.0],
    ];

    this.cells = [
      [0, 1, 3],
      [3, 1, 2],
    ];

    this.program = this.setProgram(DEFAULT_VERT, DEFAULT_FRAG);
  }

  deleteProgram() {
    if(this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }
  }

  clip({vertices, cells}) {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cellsBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, pointsToBuffer(cells, Uint8Array), gl.STATIC_DRAW);
    this.vertices = vertices;
    this.cells = cells;
  }

  clipPath(path) {
    if(typeof path === 'string') {
      path = {
        type: 'path',
        d: path,
      };
    }
    const normalized = path.normalized;
    path = toPath(path);
    let {positions: vertices, cells} = svgMesh3d(path, {
      normalize: false,
    });
    const gl = this.gl;
    if(!normalized) {
      vertices = vertices.map(([x, y]) => {
        return [x / gl.canvas.width, y / gl.canvas.height, 0.0];
      });
    }
    this.clip({vertices, cells});
  }

  setProgram(vertexShader, fragmentShader) {
    this.deleteProgram();

    const gl = this.gl;

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    this.program = program;

    const vPosition = gl.getAttribLocation(this.program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    this.clip({vertices: this.vertices, cells: this.cells});

    this.uniforms = {};

    this.declareUniforms({
      dd_time: '1f',
      dd_randseed: '2fv',
      dd_resolution: '2fv',
    });

    this.uniforms.dd_time = 0.0;
    this.uniforms.dd_resolution = [gl.canvas.width, gl.canvas.height];

    return program;
  }

  async load(frag, vert = null) {
    async function _load(glsl) {
      const loaded = {
        [frag]: true,
      };

      async function _loadFile(url) {
        const res = await fetch(url);
        let content = await res.text();
        const includes = [];

        const matched = content.match(/^#pragma include .*/mg);
        if(matched) {
          for(let i = 0; i < matched.length; i++) {
            const m = matched[i];
            const _matched = m.match(/(?:<|")(.*)(?:>|")/);
            if(_matched) {
              const type = _matched[0].indexOf('<') === 0 ? 'lib' : 'link';
              const name = _matched[1];
              if(!loaded[name]) {
                loaded[name] = true;
                if(type === 'lib') {
                  includes.push(GLSL_LIBS[name]);
                } else if(type === 'link') {
                  // TODO: 这里可以优化成异步加载
                  const loadedText = await _loadFile(name); // eslint-disable-line no-await-in-loop
                  includes.push(loadedText);
                }
              }
            }
          }
          content = content.replace(/^#pragma include .*/m, includes.join('\n'));
          content = content.replace(/^#pragma include .*/mg, '');
        }
        return content;
      }

      const text = await _loadFile(glsl);
      return text;
    }

    const fragmentShader = await _load(frag);
    const vertexShader = vert ? await _load(vert) : DEFAULT_VERT;
    return this.setProgram(vertexShader, fragmentShader);
  }

  // WebGLRenderingContext.uniform[1234][fi][v]()
  // WebGLRenderingContext.uniformMatrix[234]fv()
  declareUniform(name, type = '1f') {
    const gl = this.gl;
    const uniform = gl.getUniformLocation(this.program, name);
    let value;
    type = type.replace(/^m/, 'Matrix');
    if(/iv$/.test(type)) {
      Object.defineProperty(this.uniforms, name, {
        get() {
          return value;
        },
        set(v) {
          if(Array.isArray(v)) {
            v = Int32Array.of(...v);
          }
          value = v;
          gl[`uniform${type}`](uniform, v);
        },
        configurable: false,
        enumerable: true,
      });
    } else {
      Object.defineProperty(this.uniforms, name, {
        get() {
          return value;
        },
        set(v) {
          value = v;
          gl[`uniform${type}`](uniform, v);
        },
        configurable: false,
        enumerable: true,
      });
    }
  }

  declareUniforms(uniforms) {
    Object.entries(uniforms).forEach(([name, type]) => {
      this.declareUniform(name, type);
    });
  }

  render(opts = {}) {
    if(!this.startTime) this.startTime = Date.now();

    this.uniforms.dd_time = (Date.now() - this.startTime) / 1000;
    this.uniforms.dd_randseed = [Math.random(), Math.random()];

    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, this.cells.length * 3, gl.UNSIGNED_BYTE, 0);

    if(opts.autoUpdate) {
      window.requestAnimationFrame(this.render.bind(this, opts));
    }
  }
}
