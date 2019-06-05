import {setupWebGL, createProgram, pointsToBuffer, loadImage} from './helpers';

import DEFAULT_VERT from './default_vert.glsl';
import DEFAULT_FRAG from './default_frag.glsl';
import DEFAULT_FEEDBACK_VERT from './default_feeback_vert.glsl';
import stdlib from './lib/stdlib.glsl';
import shapes from './lib/shapes.glsl';
import shaper from './lib/shaper.glsl';
import box from './lib/box.glsl';
import transform from './lib/transform.glsl';
import graph from './lib/graph.glsl';
import color from './lib/color.glsl';
import pattern from './lib/pattern.glsl';

const GLSL_LIBS = {stdlib, box, transform, graph, color, pattern, shapes, shaper};

const _renderFeedback = Symbol('renderFeedback');
const _autoUpdate = Symbol('autoUpdate');
const _animationFrameID = Symbol('animationFrameID');
const _eventHandlers = Symbol('eventHandlers');
const _textures = Symbol('textures');

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

  static defaultOptions = {
    preserveDrawingBuffer: true,
  }

  static autoLoad() {
    window.addEventListener('DOMContentLoaded', (e) => {
      const doodleCanvas = document.querySelectorAll('canvas.glsl-doodle');

      doodleCanvas.forEach(async (canvas) => {
        const fragmentURL = canvas.getAttribute('data-fragment-url') || './index.glsl';
        const vertexURL = canvas.getAttribute('data-vert-url');
        let textures = canvas.getAttribute('data-textures');
        const doodle = new Doodle(canvas);
        if(textures) {
          textures = textures.split(/\s*,\s*/g);
          await doodle.loadTextures(...textures);
        }
        await doodle.load(fragmentURL, vertexURL);
        doodle.render();
      });
    });
  }

  constructor(canvas, opts = {}) {
    this.options = Object.assign(opts, Doodle.defaultOptions);
    this.canvas = canvas;

    this[_eventHandlers] = {};

    const gl = setupWebGL(canvas, this.options);
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
  }

  get renderFeedback() {
    return this[_renderFeedback];
  }

  get autoUpdate() {
    return this[_autoUpdate];
  }

  setFeebackContext() {
    if(!this.options.preserveDrawingBuffer) {
      throw new Error('Must set preserveDrawingBuffer to true while using feedback mode.');
    }
    if(!this.feedbackContext) {
      let canvas;
      if(typeof OffscreenCanvas === 'function') {
        canvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
      } else {
        canvas = this.canvas.cloneNode();
      }
      this.feedbackContext = canvas.getContext('2d');
    }
    this[_renderFeedback] = true;
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
    if(this[_textures]) this.bindTextures(this[_textures]);
  }

  setProgram(fragmentShader, vertexShader) {
    function getXY(canvas, e) {
      const {left, top} = e.target.getBoundingClientRect();
      const {clientX, clientY} = e.changedTouches ? e.changedTouches[0] : e;
      const x = (clientX - left) * canvas.width / canvas.clientWidth;
      const y = (1.0 - (clientY - top) / canvas.clientHeight) * canvas.height;
      return [x, y];
    }

    if(this[_animationFrameID]) {
      window.cancelAnimationFrame(this[_animationFrameID]);
      delete this[_animationFrameID];
    }
    Object.entries(this[_eventHandlers]).forEach(([event, handler]) => {
      if(handler) {
        if(event === 'keydown' || event === 'keyup') document.removeEventListener(event, handler);
        else this.canvas.removeEventListener(event, handler);
      }
    });
    this.clearTextures();
    this.deleteProgram();

    this[_renderFeedback] = false;
    this[_autoUpdate] = false;

    const canvas = this.canvas;

    if(/^\s*uniform\s+sampler2D\s+dd_samplerFeedback/mg.test(fragmentShader)) {
      this.setFeebackContext();
    }

    if(/^\s*uniform\s+\w+\s+dd_click/mg.test(fragmentShader)) {
      this[_eventHandlers].click = (e) => {
        const [x, y] = getXY(canvas, e);
        this.uniforms.dd_click = [x, y];
      };
      this.canvas.addEventListener('click', this[_eventHandlers].click);
    }

    if(/^\s*uniform\s+\w+\s+dd_mouse/mg.test(fragmentShader)) {
      this[_eventHandlers].mousemove = (e) => {
        const [x, y] = getXY(canvas, e);
        const [x0, y0] = this.uniforms.dd_mousePosition;
        if(x0 >= 0 && y0 >= 0) {
          this.uniforms.dd_mouseDelta = [x - x0, y - y0];
        }
        this.uniforms.dd_mousePosition = [x, y];
      };
      this[_eventHandlers].mouseleave = (e) => {
        this.uniforms.dd_mousePosition = [-1.0, -1.0];
        this.uniforms.dd_mouseDelta = [-1.0, -1.0];
      };
      this[_eventHandlers].mousedown = (e) => {
        this.uniforms.dd_mouseButtons = e.buttons;
        this.uniforms.dd_mouseDown = e.buttons;
      };
      this[_eventHandlers].mouseup = (e) => {
        this.uniforms.dd_mouseButtons = 0;
        if(e.button === 0) {
          this.uniforms.dd_mouseUp = 1;
        } else if(e.button === 2) {
          this.uniforms.dd_mouseUp = 2;
        } else if(e.button === 1) {
          this.uniforms.dd_mouseUp = 4;
        }
      };
      this.canvas.addEventListener('mousemove', this[_eventHandlers].mousemove);
      this.canvas.addEventListener('mouseleave', this[_eventHandlers].mouseleave);
      this.canvas.addEventListener('mousedown', this[_eventHandlers].mousedown);
      this.canvas.addEventListener('mouseup', this[_eventHandlers].mouseup);
    }

    if(/^\s*uniform\s+\w+\s+dd_touch/mg.test(fragmentShader)) {
      // TODO: 实现多点触摸
      this[_eventHandlers].touchstart = (e) => {
        const [x, y] = getXY(canvas, e);
        this.uniforms.dd_touchPosition = [x, y];
        this.uniforms.dd_touchStart = [x, y];
      };
      this[_eventHandlers].touchend = (e) => {
        const [x, y] = getXY(canvas, e);
        this.uniforms.dd_touchPosition = [-1.0, -1.0];
        this.uniforms.dd_touchEnd = [x, y];
      };
      this[_eventHandlers].touchmove = (e) => {
        const [x, y] = getXY(canvas, e);
        this.uniforms.dd_touchPosition = [x, y];
      };
      this.canvas.addEventListener('touchstart', this[_eventHandlers].touchstart);
      this.canvas.addEventListener('touchend', this[_eventHandlers].touchend);
      this.canvas.addEventListener('touchmove', this[_eventHandlers].touchmove);
    }

    if(/^\s*uniform\s+\w+\s+dd_key/mg.test(fragmentShader)) {
      this[_eventHandlers].keydown = (e) => {
        this.uniforms.dd_keyCode = e.keyCode;
        this.uniforms.dd_keyDown = e.keyCode;
      };
      this[_eventHandlers].keyup = (e) => {
        this.uniforms.dd_keyUp = e.keyCode;
        this.uniforms.dd_keyCode = -1;
      };
      document.addEventListener('keydown', this[_eventHandlers].keydown);
      document.addEventListener('keyup', this[_eventHandlers].keyup);
      this[_autoUpdate] = true;
    }

    if(/^\s*uniform\s+\w+\s+dd_(time|randseed(?!0)|frameIndex|mouse|touch|click|key)/mg.test(fragmentShader)) {
      this[_autoUpdate] = true;
    }

    const hasTexture = this[_renderFeedback] || this.textures && this.textures.length;
    if(fragmentShader == null) fragmentShader = DEFAULT_FRAG;
    if(vertexShader == null) vertexShader = hasTexture ? DEFAULT_FEEDBACK_VERT : DEFAULT_VERT;

    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;

    const gl = this.gl;

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    this.program = program;

    this.clip({vertices: this.vertices, cells: this.cells});

    this.uniforms = {};

    this.declareUniforms({
      dd_time: '1f',
      dd_randseed0: '2fv',
      dd_randseed: '2fv',
      dd_resolution: '2fv',
      dd_frameIndex: '1i',
      dd_samplerFeedback: '1i',
      dd_mousePosition: '2fv',
      dd_mouseDelta: '2fv',
      dd_mouseButtons: '1i',
      dd_mouseDown: '1i',
      dd_mouseUp: '1i',
      dd_keyCode: '1i',
      dd_keyDown: '1i',
      dd_keyUp: '1i',
      dd_click: '2fv',
      dd_touchPosition: '2fv',
      dd_touchStart: '2fv',
      dd_touchEnd: '2fv',
    });

    this.uniforms.dd_time = 0.0;
    this.uniforms.dd_randseed0 = [Math.random(), Math.random()];
    this.uniforms.dd_randseed = this.uniforms.dd_randseed0;
    this.uniforms.dd_frameIndex = 0;
    this.uniforms.dd_resolution = [gl.canvas.width, gl.canvas.height];
    this.uniforms.dd_samplerFeedback = 0;

    this.uniforms.dd_mousePosition = [-1.0, -1.0];
    this.uniforms.dd_mouseButtons = 0;
    this.uniforms.dd_mouseDown = 0;
    this.uniforms.dd_mouseUp = 0;
    this.uniforms.dd_keyCode = 0;
    this.uniforms.dd_keyDown = 0;
    this.uniforms.dd_keyUp = 0;
    this.uniforms.dd_click = [-1.0, -1.0];

    this.uniforms.dd_touchPosition = [-1.0, -1.0];
    this.uniforms.dd_touchStart = [-1.0, -1.0];
    this.uniforms.dd_touchEnd = [-1.0, -1.0];

    for(let i = 0; i < 32; i++) {
      const sampler = `dd_sampler${i}`;
      this.declareUniforms({
        [sampler]: '1i',
      });
      this.uniforms[sampler] = i;
    }

    const vPosition = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    this.program = program;

    const textures = this.textures || [];

    if(this[_renderFeedback]) {
      textures.unshift(this.feedbackContext.canvas);
    }
    if(textures.length) {
      this[_textures] = this.bindTextures(textures);
      this.setTextureCoordinate();
    }
    return program;
  }

  async compileShader(fragmentShader) {
    const program = await this.load(fragmentShader, null, true);
    return program;
  }

  async compileShaders(fragmentShader, vertexShader) {
    const program = await this.load(fragmentShader, vertexShader, true);
    return program;
  }

  async load(frag, vert = null, isContent = false) {
    async function _load(glsl) {
      const loaded = {};
      if(!isContent) {
        loaded[glsl] = true;
      }

      async function _loadFile(url) {
        let content = url;

        if(!isContent) {
          if(url.charAt(0) === '#') { // is element ID
            content = document.querySelector(url).textContent;
          } else {
            const res = await fetch(url);
            if(res.status === 404) {
              content = DEFAULT_FRAG;
            } else {
              content = await res.text();
            }
          }
        }
        content = content.replace(/^\s*/mg, '');

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

    const vertexShader = vert ? await _load(vert) : null;
    const program = this.setProgram(fragmentShader, vertexShader);

    return program;
  }

  clearTextures() {
    const gl = this.gl;
    if(this[_textures]) {
      this[_textures].forEach((texture) => {
        gl.deleteTexture(texture);
      });
      this[_textures] = null;
    }
  }

  bindTextures(sources) {
    this.clearTextures();
    return sources.map((source, i) => {
      const gl = this.gl;
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
      return texture;
    });
  }

  setTextureCoordinate() {
    const gl = this.gl;

    const texVertexData = this.vertices.map(v => [0.5 * (v[0] + 1), 0.5 * (v[1] + 1)]);

    // texture coordinate data
    const trianglesTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(texVertexData), gl.STATIC_DRAW);

    // set texture coordinate attribute
    const vertexTexCoordAttribute = gl.getAttribLocation(this.program, 'a_vertexTextureCoord');
    gl.enableVertexAttribArray(vertexTexCoordAttribute);
    gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  }

  async loadTextures(...sources) {
    const promises = sources.map(loadImage);

    this.textures = await Promise.all(promises);
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

  render() {
    const gl = this.gl;
    if(!this.program) this.setProgram();
    if(this[_renderFeedback]) {
      const context = this.feedbackContext;
      context.canvas.width = gl.canvas.width;
      context.canvas.height = gl.canvas.height;
      // context.clearRect(0, 0, gl.canvas.width, gl.canvas.height);
      context.drawImage(gl.canvas, 0, 0);
      this.bindTextures([this.feedbackContext.canvas]);
    }
    if(!this.startTime) this.startTime = Date.now();

    this.uniforms.dd_time = (Date.now() - this.startTime) / 1000;
    this.uniforms.dd_randseed = [Math.random(), Math.random()];

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, this.cells.length * 3, gl.UNSIGNED_BYTE, 0);

    this.uniforms.dd_frameIndex++;
    this.uniforms.dd_keyDown = 0;
    this.uniforms.dd_keyUp = 0;
    this.uniforms.dd_mouseDown = 0;
    this.uniforms.dd_mouseUp = 0;
    this.uniforms.dd_click = [-1.0, -1.0];
    this.uniforms.dd_touchStart = [-1.0, -1.0];
    this.uniforms.dd_touchEnd = [-1.0, -1.0];

    if(this[_autoUpdate]) {
      this[_animationFrameID] = window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
