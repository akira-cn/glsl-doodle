import {toPath} from 'svg-points';
import svgMesh3d from 'svg-mesh-3d';

import {setupWebGL, createProgram, pointsToBuffer, loadImage} from './helpers';

import DEFAULT_VERT from './default_vert.glsl';
import DEFAULT_FRAG from './default_frag.glsl';
import stdlib from './lib/stdlib.glsl';
import shapes from './lib/shapes.glsl';
import shaper from './lib/shaper.glsl';
import box from './lib/box.glsl';
import transform from './lib/transform.glsl';
import graph from './lib/graph.glsl';
import color from './lib/color.glsl';
import pattern from './lib/pattern.glsl';

const GLSL_LIBS = {stdlib, box, transform, graph, color, pattern, shapes, shaper};

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
    this.clearTextures();
    this.deleteProgram();

    const gl = this.gl;

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    this.program = program;

    const vPosition = gl.getAttribLocation(this.program, 'a_position');
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    this.clip({vertices: this.vertices, cells: this.cells});

    this.uniforms = {};

    this.declareUniforms({
      dd_time: '1f',
      dd_randseed0: '2fv',
      dd_randseed: '2fv',
      dd_resolution: '2fv',
      dd_rendercount: '1i',
    });

    this.uniforms.dd_time = 0.0;
    this.uniforms.dd_randseed0 = [Math.random(), Math.random()];
    this.uniforms.dd_randseed = this.uniforms.dd_randseed0;
    this.uniforms.dd_rendercount = 0;
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

        async function parse(content) {
          const includes = [];

          const matched = content.match(/^#pragma include .*/mg);
          if(matched) {
            // console.log(matched, url);
            for(let i = 0; i < matched.length; i++) {
              const m = matched[i];
              const _matched = m.match(/(?:<|")(.*)(?:>|")/);
              if(_matched) {
                const type = _matched[0].indexOf('<') === 0 ? 'lib' : 'link';
                const name = _matched[1];
                if(!loaded[name]) {
                  loaded[name] = true;
                  // TODO: 这里可以优化成异步加载
                  if(type === 'lib') {
                    const c = await parse(GLSL_LIBS[name]); // eslint-disable-line no-await-in-loop
                    includes.push(c);
                  } else if(type === 'link') {
                    const loadedText = await _loadFile(name); // eslint-disable-line no-await-in-loop
                    includes.push(loadedText);
                  }
                } else {
                  includes.push(`/* included ${name} */`);
                }
              }
            }

            includes.forEach((inc) => {
              content = content.replace(/^#pragma include .*/m, inc);
            });
          }
          return content;
        }
        content = await parse(content);
        return content;
      }

      const text = await _loadFile(glsl);
      return text;
    }

    const fragmentShader = await _load(frag);
    const vertexShader = vert ? await _load(vert) : DEFAULT_VERT;
    const program = this.setProgram(vertexShader, fragmentShader);

    return program;
  }

  clearTextures() {
    const gl = this.gl;
    if(this.textures) {
      this.textures.forEach((texture) => {
        gl.deleteTexture(texture);
      });
      this.textures = null;
    }
  }

  async loadTextures(...sources) {
    const gl = this.gl;

    this.clearTextures();

    const promises = sources.map(async (src, i) => {
      const source = await loadImage(src);

      gl.activeTexture(gl.TEXTURE0 + i);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // Prevents s-coordinate wrapping (repeating).
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // Prevents t-coordinate wrapping (repeating).
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // bind texture and set the sampler
      // gl.bindTexture(gl.TEXTURE_2D, texture);

      const sampler = `dd_sampler${i}`;
      this.declareUniforms({
        [sampler]: '1i',
      });
      this.uniforms[sampler] = i;

      return texture;
    });

    const textures = await Promise.all(promises);

    const texVertexData = this.vertices.map(v => [0.5 * (v[0] + 1), 0.5 * (v[1] + 1)]);

    // texture coordinate data
    const trianglesTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(texVertexData), gl.STATIC_DRAW);

    // set texture coordinate attribute
    const vertexTexCoordAttribute = gl.getAttribLocation(this.program, 'a_vertexTextureCoord');
    gl.enableVertexAttribArray(vertexTexCoordAttribute);
    gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    this.textures = textures;

    return textures;
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
    this.uniforms.dd_rendercount++;

    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, this.cells.length * 3, gl.UNSIGNED_BYTE, 0);

    if(opts.autoUpdate) {
      window.requestAnimationFrame(this.render.bind(this, opts));
    }
  }
}
