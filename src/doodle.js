import {setupWebGL, createProgram, pointsToBuffer, loadImage} from './helpers';

import DEFAULT_VERT from './default_vert.glsl';
import DEFAULT_FRAG from './default_frag.glsl';
import DEFAULT_FEEDBACK_VERT from './default_feeback_vert.glsl';
import stdlib from './lib/stdlib.glsl';
import shapes from './lib/shapes.glsl';
import shaper from './lib/shaper.glsl';
import box from './lib/box.glsl';
import transform from './lib/transform.glsl';
import graphics from './lib/graph.glsl';
import color from './lib/color.glsl';
import pattern from './lib/pattern.glsl';

const GLSL_LIBS = {stdlib, box, transform, graphics, color, pattern, shapes, shaper};

const _renderFeedback = Symbol('renderFeedback');
const _autoUpdate = Symbol('autoUpdate');
const _animationFrameID = Symbol('animationFrameID');
const _eventHandlers = Symbol('eventHandlers');
const _textures = Symbol('textures');

async function fetchShader(url) {
  const res = await fetch(url);
  let content;
  if(res.status === 404) {
    content = DEFAULT_FRAG;
  } else {
    content = await res.text();
  }
  return content;
}

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
        let textures = canvas.getAttribute('data-textures');
        const doodle = new Doodle(canvas);
        if(textures) {
          textures = textures.split(/\s*,\s*/g);
          await doodle.loadTextures(...textures);
        }

        const fragmentEl = canvas.getAttribute('data-fragment-for');
        const vertexEl = canvas.getAttribute('data-vertex-for');

        let fragment = null;
        let vertex = null;

        if(fragmentEl) {
          fragment = document.getElementById(fragmentEl).textContent;
        } else {
          const fragmentURL = canvas.getAttribute('data-fragment-url') || './index.glsl';
          fragment = await fetchShader(fragmentURL);
        }

        if(vertexEl) {
          vertex = vertexEl.textContent;
        } else {
          const vertexURL = canvas.getAttribute('data-vert-url');
          if(vertexURL) vertex = await fetchShader(vertexURL);
        }

        await doodle.compile(fragment, vertex);
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
        this.uniforms.dd_click = [x, y, -1.0];
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
        this.uniforms.dd_mouseDown = [e.buttons, -1.0];
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
        this.uniforms.dd_touchStart = [x, y, -1.0];
      };
      this[_eventHandlers].touchend = (e) => {
        const [x, y] = getXY(canvas, e);
        this.uniforms.dd_touchPosition = [-1.0, -1.0];
        this.uniforms.dd_touchEnd = [x, y, -1.0];
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
        this.uniforms.dd_keyDown = [e.keyCode, -1.0];
      };
      this[_eventHandlers].keyup = (e) => {
        this.uniforms.dd_keyUp = [e.keyCode, -1.0];
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
      dd_randseed0: '2f',
      dd_randseed: '2f',
      dd_resolution: '2f',
      dd_frameIndex: '1i',
      dd_samplerFeedback: '1i',
      dd_mousePosition: '2f', // 当前鼠标位置，如果鼠标不在画布上，值为 [-1.0, -1.0]
      dd_mouseDelta: '2f', // 当前鼠标位置变化量，与上次位置进行比较
      dd_mouseButtons: '1i', // 当前鼠标按键情况 1 - 左键，2 - 右键，4 - 中键
      dd_mouseDown: '2f', // 当鼠标按下时，鼠标按键值与事件发生的时间
      dd_mouseUp: '2f', // 当鼠标松开时，鼠标按键值与事件发生时间
      dd_keyCode: '1i', // 当键盘按下未松开时，获取键值
      dd_keyDown: '2f', // 当键盘按下时，键值与事件发生时间
      dd_keyUp: '2f', // 当键盘松开时，键值与事件发生时间
      dd_click: '3f', // 得到点击的x、y坐标和点击发生的时间
      dd_touchPosition: '2f', // 得到当前触屏位置的坐标
      dd_touchStart: '3f', // 当触屏按下时，触碰坐标与发生时间
      dd_touchEnd: '3f', // 当触屏松开时，触碰坐标与发生时间
    });

    this.uniforms.dd_time = 0.0;
    this.uniforms.dd_randseed0 = [Math.random(), Math.random()];
    this.uniforms.dd_randseed = this.uniforms.dd_randseed0;
    this.uniforms.dd_frameIndex = 0;
    this.uniforms.dd_resolution = [gl.canvas.width, gl.canvas.height];
    this.uniforms.dd_samplerFeedback = 0;

    this.uniforms.dd_mousePosition = [-1.0, -1.0];
    this.uniforms.dd_mouseButtons = 0;
    this.uniforms.dd_mouseDown = [0.0, -1.0];
    this.uniforms.dd_mouseUp = [0.0, -1.0];
    this.uniforms.dd_keyCode = 0;
    this.uniforms.dd_keyDown = [0.0, -1.0];
    this.uniforms.dd_keyUp = [0.0, -1.0];
    this.uniforms.dd_click = [-1.0, -1.0, -1.0];

    this.uniforms.dd_touchPosition = [-1.0, -1.0];
    this.uniforms.dd_touchStart = [-1.0, -1.0, -1.0];
    this.uniforms.dd_touchEnd = [-1.0, -1.0, -1.0];

    for(let i = 0; i < 32; i++) {
      const sampler = `dd_sampler${i}`;
      this.declareUniforms({
        [sampler]: '1i',
      });
      // this.uniforms[sampler] = i;
    }

    const vPosition = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    this.program = program;

    let textures = this.textures || [];

    if(this[_renderFeedback]) {
      textures = [this.feedbackContext.canvas, ...textures];
    }
    if(textures.length) {
      this[_textures] = this.bindTextures(textures);
      this.setTextureCoordinate();
    }
    return program;
  }

  async compile(frag, vert) {
    const loaded = {};

    async function _compile(content) {
      content = content.replace(/^\s*/mg, '');

      const includes = [];

      const matched = content.match(/^#pragma\s+include\s+.*/mg);
      if(matched) {
        // console.log(matched, url);
        for(let i = 0; i < matched.length; i++) {
          const m = matched[i];
          const _matched = m.match(/(?:<|")(.*)(?:>|")/);
          if(_matched) {
            const type = _matched[0].indexOf('<') === 0 ? 'lib' : 'link';
            let name = _matched[1];
            if(name === 'graph') name = 'graphics';
            if(!loaded[name]) {
              loaded[name] = true;
              // TODO: 这里可以优化成异步加载
              if(type === 'lib') {
                const c = await _compile(GLSL_LIBS[name]); // eslint-disable-line no-await-in-loop
                includes.push(c);
              } else if(type === 'link') {
                let c = await fetchShader(name); // eslint-disable-line no-await-in-loop
                c = await _compile(c); // eslint-disable-line no-await-in-loop
                includes.push(c);
              }
            } else {
              includes.push(`/* included ${name} */`);
            }
          }
        }

        includes.forEach((inc) => {
          content = content.replace(/^#pragma\s+include\s+.*/m, inc);
        });
      }

      return content;
    }

    const matches = frag.match(/^#pragma\s+texture\s+.*/mg);
    if(matches) {
      const imgs = await Promise.all(matches.map((m) => {
        const p = m.match(/^#pragma\s+texture\s+(.*)/);
        return loadImage(p[1]);
      }));
      this.textures = this.textures ? [...this.textures, ...imgs] : imgs;
    }

    const fragmentShader = await _compile(frag);
    const vertexShader = vert ? await _compile(vert) : null;
    const program = this.setProgram(fragmentShader, vertexShader);

    return program;
  }

  async load(frag, vert = null) {
    frag = await fetchShader(frag);
    if(vert) vert = await fetchShader(vert);
    return this.compile(frag, vert);
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
      if(this.renderFeedback) {
        if(i > 0) this.uniforms[`dd_sampler${i - 1}`] = i;
      } else {
        this.uniforms[`dd_sampler${i}`] = i;
      }
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

    const isTypeV = /v$/.test(type);

    Object.defineProperty(this.uniforms, name, {
      get() {
        return value;
      },
      set(v) {
        value = v;
        if(!Array.isArray(v)) {
          v = [v];
        }
        if(isTypeV) gl[`uniform${type}`](uniform, v);
        else gl[`uniform${type}`](uniform, ...v);
      },
      configurable: false,
      enumerable: true,
    });
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

    const time = (Date.now() - this.startTime) / 1000;
    this.uniforms.dd_randseed = [Math.random(), Math.random()];

    let [x, y, t] = this.uniforms.dd_click;
    if(x >= 0 && t < 0) {
      this.uniforms.dd_click = [x, y, time];
    }
    [x, t] = this.uniforms.dd_mouseDown;
    if(x > 0 && t < 0) {
      this.uniforms.dd_mouseDown = [x, time];
    }
    [x, t] = this.uniforms.dd_mouseUp;
    if(x > 0 && t < 0) {
      this.uniforms.dd_mouseUp = [x, time];
    }
    [x, t] = this.uniforms.dd_keyDown;
    if(x > 0 && t < 0) {
      this.uniforms.dd_keyDown = [x, time];
    }
    [x, t] = this.uniforms.dd_keyUp;
    if(x > 0 && t < 0) {
      this.uniforms.dd_keyUp = [x, time];
    }
    [x, y, t] = this.uniforms.dd_touchStart;
    if(x > 0 && t < 0) {
      this.uniforms.dd_touchStart = [x, y, time];
    }
    [x, y, t] = this.uniforms.dd_touchEnd;
    if(x > 0 && t < 0) {
      this.uniforms.dd_touchEnd = [x, y, time];
    }

    this.uniforms.dd_time = time;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, this.cells.length * 3, gl.UNSIGNED_BYTE, 0);

    this.uniforms.dd_frameIndex++;

    if(this[_autoUpdate]) {
      this[_animationFrameID] = window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
