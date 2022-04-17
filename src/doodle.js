import GlRender from 'gl-renderer';

import stdlib from './lib/stdlib.glsl';
import shapes from './lib/shapes.glsl';
import shaper from './lib/shaper.glsl';
import box from './lib/box.glsl';
import transform from './lib/transform.glsl';
import graphics from './lib/graph.glsl';
import color from './lib/color.glsl';
import pattern from './lib/pattern.glsl';
import shadertoy from './lib/shadertoy.glsl';

GlRender.addLibs({stdlib, box, transform, graphics, color, pattern, shapes, shaper, shadertoy});

const _eventHandlers = Symbol('eventHandlers');
const _eventUniforms = Symbol('eventUniforms');

function getPointerXY(canvas, e) {
  const {left, top} = e.target.getBoundingClientRect();
  const {clientX, clientY} = e.changedTouches ? e.changedTouches[0] : e;
  const x = (clientX - left) / canvas.clientWidth;
  const y = 1.0 - (clientY - top) / canvas.clientHeight;
  return [x, y];
}

function applyFBO(program) {
  const fbos = program._fbos;
  if(fbos) {
    fbos.forEach(([i, fbo]) => {
      const samplerID = `dd_sampler${i}`;
      if(samplerID in program.uniforms) {
        program.uniforms[samplerID] = fbo.texture;
      }
    });
  }
}

function arrEqual(a1, a2) {
  if(!a1 && a2 || a1 && !a2) return false;
  if(a1.length !== a2.length) return false;
  for(let i = 0; i < a1.length; i++) {
    if(a1[i] !== a2[i]) return false;
  }
  return true;
}

export default class Doodle extends GlRender {
  static defaultOptions = {
    preserveDrawingBuffer: true,
  }

  static autoLoad() {
    function load() {
      const doodleElement = document.querySelectorAll('glsl-doodle');
      doodleElement.forEach(async (el) => {
        if(el.getAttribute('loaded')) return;

        let root = el;
        if(el.attachShadow) {
          root = el.attachShadow({mode: 'open'});
        } else if(el.createShadowRoot) {
          root = el.createShadowRoot();
        }

        const canvas = document.createElement('canvas');
        canvas.width = el.getAttribute('width') || 512;
        canvas.height = el.getAttribute('height') || 512;
        canvas.setAttribute('part', 'doodle');

        root.appendChild(canvas);
        el.setAttribute('loaded', 'loaded');

        const style = document.createElement('style');
        style.textContent = `:host {
  display: block;
}
canvas {
  max-width: 100%;
  max-height: 100%;
}`;
        root.appendChild(style);

        const fragmentEl = el.getAttribute('fragment-for') || el.getAttribute('for');
        const vertexEl = el.getAttribute('vertex-for');

        let fragment = null;
        let vertex = null;

        if(fragmentEl) {
          fragment = document.getElementById(fragmentEl).textContent;
        } else {
          const fragmentURL = el.getAttribute('fragment-src') || el.getAttribute('src') || './index.glsl';
          fragment = await GlRender.fetchShader(fragmentURL);
          if(/\.js$/.test(fragmentURL)) {
            // eslint-disable-next-line no-new-func
            const process = new Function('shader', fragment);
            process((strings) => {
              fragment = strings.join('');
            });
          }
        }

        if(vertexEl) {
          vertex = vertexEl.textContent;
        } else {
          const vertexURL = el.getAttribute('vert-src');
          if(vertexURL) vertex = await GlRender.fetchShader(vertexURL);
        }

        const isShaderToy = el.hasAttribute('shadertoy') && el.getAttribute('shadertoy') !== 'false';
        let isWebGL2 = isShaderToy;
        if(!isWebGL2 && vertex && /^\s*#version\s+300\s+es/mg.test(vertex)) isWebGL2 = true;
        if(!isWebGL2 && fragment && /^\s*#version\s+300\s+es/mg.test(fragment)) {
          isWebGL2 = true;
          if(!/^\s*#define\s+WEBGL2/mg.test(fragment)) {
            fragment = fragment.replace(/^(\s*#version\s+300\s+es)/mg, '$1\n#define WEBGL2\n');
          }
        }

        const doodle = new Doodle(canvas, {webgl2: isWebGL2, shadertoy: isShaderToy});

        const program = await doodle.compile(fragment, vertex);
        doodle.useProgram(program);

        doodle.render();
        const event = new CustomEvent('load', {detail: {doodle}});
        el.dispatchEvent(event);
        el._doodle = doodle;
      });
    }
    load();
    window.addEventListener('DOMContentLoaded', load);
  }

  async compile(frag, vert) {
    const istoy = this.options.shadertoy;
    if(istoy) {
      frag = `#version 300 es
#define WEBGL2

precision highp float;
precision highp int;

#pragma include <shadertoy>

${frag}
`;
      let fragColor = '';
      if(!/^\s*out\s+vec4\s+FragColor/mg.test(frag)) {
        fragColor = 'out vec4 FragColor;';
      }
      frag = `${frag}
${fragColor}

void main() {
  mainImage(FragColor, gl_FragCoord.xy);
}`;
    }
    const program = await super.compile(frag, vert);

    const {fragmentShader} = program.shaderText;

    const matches = fragmentShader.match(/^#pragma\s+texture\s+.*/mg);
    if(matches) {
      this._preloadedTextures = await Promise.all(matches.map(async (m, i) => {
        const p = m.match(/^#pragma\s+texture\s+(.*)/);
        if(/\.(glsl|frag)|^#.+$/.test(p[1])) {
          this._fbos = this._fbos || {};
          this._fbosList = this._fbosList || [];
          let fboObject = this._fbos[p[1]];
          // if(buffer) throw new Error('Buffer in buffer error.');
          if(!fboObject) { // buffer ignore channel
            fboObject = {
              readFBO: this.createFBO(),
              writeFBO: this.createFBO(),
              get texture() {
                return this.readFBO.texture;
              },
              swap() {
                const tmp = this.writeFBO;
                this.writeFBO = this.readFBO;
                this.readFBO = tmp;
              },
            };
            this._fbos[p[1]] = fboObject;

            // 是否要新创建 fboProgram
            const f = /^#/.test(p[1]) ? document.querySelector(p[1]).textContent : await GlRender.fetchShader(p[1]);
            const fboProgram = await this.compile(f, vert);

            // const fbo = this.createFBO();
            fboObject._program = fboProgram;
            this._fbosList.push(fboObject);
          }
          program._fbos = program._fbos || [];
          program._fbos.push([i, fboObject]);
          return null;
        }
        return this.loadTexture(p[1]);
      }));
    }

    return program;
  }

  // override
  async loadTexture(source, {useImageBitmap = true} = {}) {
    const img = await Doodle.loadImage(source, {useImageBitmap});
    return this.createTexture(img, {wrapS: this.gl.REPEAT, wrapT: this.gl.REPEAT});
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
  }

  // deleteProgram(program) {
  //   if(this[_eventHandlers]) {
  //     this[_eventHandlers].forEach(({event, handler}) => {
  //       if(event === 'keydown' || event === 'keyup') document.removeEventListener(event, handler);
  //       else this.canvas.removeEventListener(event, handler);
  //     });
  //     delete this[_eventHandlers];
  //   }
  //   // TODO: release _fbo program?
  //   super.deleteProgram(program);
  // }

  useProgram(program, attrOptions) {
    const gl = this.gl;
    const canvas = gl.canvas;

    super.useProgram(program, attrOptions);

    if(this._preloadedTextures) {
      this._preloadedTextures.forEach((texture, i) => {
        if(texture && texture._img) {
          const samplerID = `dd_sampler${i}`;
          if(samplerID in program.uniforms) {
            program.uniforms[samplerID] = texture;
          }
        }
      });
      delete this._preloadedTextures;
    }

    if(!program._init) {
      program._init = true;
      const uniforms = program.uniforms;
      if('dd_frameIndex' in uniforms) {
        uniforms.dd_frameIndex = 0;
      }
      if('dd_randseed0' in uniforms) {
        uniforms.dd_randseed0 = [Math.random(), Math.random()];
      }
      if('dd_randseed' in uniforms) {
        uniforms.dd_randseed = uniforms.dd_randseed0 || [Math.random(), Math.random()];
      }
      if('dd_resolution' in uniforms) {
        uniforms.dd_resolution = [canvas.width, canvas.height];
      }
      if('dd_samplerFeedback' in uniforms) {
        this.setFeebackContext();
      }
    }

    this[_eventHandlers] = this[_eventHandlers] || [];
    this[_eventUniforms] = this[_eventUniforms] || {};

    // createEvents
    const uniforms = this[_eventUniforms];

    if(!('dd_mouseEvent' in uniforms) && 'dd_mouseEvent' in program.uniforms) {
      // 0 - none, 1 - mousedown 2 - mouseup 3 - mousewheel
      uniforms.dd_mouseEvent = 0;
      const mousedown = () => {
        uniforms.dd_mouseEvent = 1;
      };
      const mouseup = () => {
        uniforms.dd_mouseEvent = 2;
      };
      const mousewheel = () => {
        uniforms.dd_mouseEvent = 3;
      };
      canvas.addEventListener('mousedown', mousedown);
      canvas.addEventListener('mouseup', mouseup);
      canvas.addEventListener('mousewheel', mousewheel);
      this[_eventHandlers].push(
        {event: 'mousedown', mousedown},
        {event: 'mouseup', mouseup},
        {event: 'mousewheel', mousewheel},
      );
    }

    if(!('dd_mouseRec' in uniforms) && 'dd_mouseRec' in program.uniforms) { // shadertoy
      uniforms.dd_mouseRec = [-1.0, -1.0, 0.0, 0.0];
      const mousedown = (e) => {
        let [x, y] = getPointerXY(canvas, e);
        x *= canvas.width;
        y *= canvas.height;
        uniforms.dd_mouseRec = [x, y, x, y];
      };
      const mousemove = (e) => {
        let [x, y] = getPointerXY(canvas, e);
        x *= canvas.width;
        y *= canvas.height;
        if(e.buttons) {
          const rec = uniforms.dd_mouseRec;
          uniforms.dd_mouseRec = [x, y, rec[2], rec[3]];
        }
      };
      const mouseup = (e) => {
        const rec = uniforms.dd_mouseRec;
        uniforms.dd_mouseRec = [rec[0], rec[1], -Math.abs(rec[2]), rec[3]];
      };
      canvas.addEventListener('mousemove', mousemove);
      canvas.addEventListener('mousedown', mousedown);
      canvas.addEventListener('mouseup', mouseup);
      this[_eventHandlers].push(
        {event: 'mousemove', mousemove},
        {event: 'mousedown', mousedown},
        {event: 'mouseup', mouseup},
      );
    }

    if(!('dd_mousePosition' in uniforms) && 'dd_mousePosition' in program.uniforms) {
      // x, y, buttons down, buttons click
      uniforms.dd_mousePosition = [-1.0, -1.0, 0.0, 0.0];
      const mousemove = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        uniforms.dd_mousePosition = [x, y, e.buttons, 0.0];
      };
      const mouseleave = (e) => {
        uniforms.dd_mousePosition = [-1.0, -1.0, 0.0, 0.0];
      };
      const mousedown = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        uniforms.dd_mousePosition = [x, y, e.buttons, e.buttons];
      };
      const mouseup = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        uniforms.dd_mousePosition = [x, y, 0.0, 0.0];
      };
      canvas.addEventListener('mousemove', mousemove);
      canvas.addEventListener('mouseleave', mouseleave);
      canvas.addEventListener('mousedown', mousedown);
      canvas.addEventListener('mouseup', mousedown);
      this[_eventHandlers].push(
        {event: 'mousemove', mousemove},
        {event: 'mouseleave', mouseleave},
        {event: 'mousedown', mousedown},
        {event: 'mouseup', mouseup},
      );
    }

    if(!('dd_mouseButtons' in uniforms) && 'dd_mouseButtons' in program.uniforms) {
      uniforms.dd_mouseButtons = 0;
      const mouseenter = (e) => {
        uniforms.dd_mouseButtons = e.buttons;
      };
      const mousedown = (e) => {
        uniforms.dd_mouseButtons = e.buttons;
      };
      const mouseup = (e) => {
        uniforms.dd_mouseButtons = e.buttons;
      };
      const mouseleave = (e) => {
        uniforms.dd_mouseButtons = 0;
      };
      canvas.addEventListener('mouseenter', mouseenter);
      canvas.addEventListener('mousedown', mousedown);
      canvas.addEventListener('mouseup', mouseup);
      canvas.addEventListener('mouseleave', mouseleave);
      this[_eventHandlers].push(
        {event: 'mouseenter', mouseenter},
        {event: 'mousedown', mousedown},
        {event: 'mouseup', mouseup},
        {event: 'mouseleave', mouseleave},
      );
    }

    if(!('dd_keyEvent' in uniforms) && 'dd_keyEvent' in program.uniforms) {
      // 0 - none, 1 - keydown, 2 - keyup
      uniforms.dd_keyEvent = 0;
      const keydown = (e) => {
        uniforms.dd_keyEvent = 1;
      };
      const keyup = (e) => {
        uniforms.dd_keyEvent = 2;
      };
      document.addEventListener('keydown', keydown);
      document.addEventListener('keyup', keyup);
      this[_eventHandlers].push(
        {event: 'keydown', keydown},
        {event: 'keyup', keyup},
      );
    }
    if(!('dd_keyCode' in uniforms) && 'dd_keyCode' in program.uniforms) {
      uniforms.dd_keyCode = 0;
      const keydown = (e) => {
        uniforms.dd_keyCode = e.keyCode;
      };
      const keyup = (e) => {
        uniforms.dd_keyCode = 0;
      };
      document.addEventListener('keydown', keydown);
      document.addEventListener('keyup', keyup);
      this[_eventHandlers].push(
        {event: 'keydown', keydown},
        {event: 'keyup', keyup},
      );
    }

    // TODO: support multi-touches
    if(!('dd_touchPosition' in uniforms) && 'dd_touchPosition' in program.uniforms) {
      uniforms.dd_touchPosition = [-1.0, -1.0];
      const touchstart = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        uniforms.dd_touchPosition = [x, y];
      };
      const touchmove = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        uniforms.dd_touchPosition = [x, y];
      };
      const touchend = (e) => {
        uniforms.dd_touchPosition = [-1.0, -1.0];
      };
      canvas.addEventListener('touchstart', touchstart);
      canvas.addEventListener('touchmove', touchmove);
      canvas.addEventListener('touchend', touchend);
      this[_eventHandlers].push(
        {event: 'touchstart', touchstart},
        {event: 'touchmove', touchmove},
        {event: 'touchend', touchend},
      );
    }

    if(!('dd_touchEvent' in uniforms) && 'dd_touchEvent' in program.uniforms) {
      // 0 - none, 1 - touchstart, 2 - touchend, 3 - touchmove
      const touchstart = (e) => {
        uniforms.dd_touchEvent = 1;
      };
      const touchmove = (e) => {
        uniforms.dd_touchEvent = 3;
      };
      const touchend = (e) => {
        uniforms.dd_touchEvent = 2;
      };
      canvas.addEventListener('touchstart', touchstart);
      canvas.addEventListener('touchmove', touchmove);
      canvas.addEventListener('touchend', touchend);
      this[_eventHandlers].push(
        {event: 'touchstart', touchstart},
        {event: 'touchmove', touchmove},
        {event: 'touchend', touchend},
      );
    }

    return program;
  }

  render(t, fbo = false) {
    const program = this.program;
    if(!fbo && program._fbos) {
      this._fbosList.forEach((fbo) => {
        const p = fbo._program;
        this.useProgram(p);
        this.bindFBO(fbo.writeFBO);
        applyFBO(p);
        this.setMeshData(p.meshData);
        this.render(t, true);
        fbo.swap();
      });
      this.useProgram(program);
      this.bindFBO(null);
      applyFBO(program);
      this.setMeshData(program.meshData);
    }

    if(!this.startRenderTime) this.startRenderTime = Date.now();
    const time = (Date.now() - this.startRenderTime) / 1000;
    const uniforms = this.uniforms;
    const gl = this.gl;

    let needUpdate = false;

    if('dd_time' in uniforms) {
      uniforms.dd_time = time;
      needUpdate = true;
    }

    let feedbackTexture;
    if('dd_samplerFeedback' in uniforms) {
      const context = this.feedbackContext;
      context.canvas.width = gl.canvas.width;
      context.canvas.height = gl.canvas.height;
      context.drawImage(gl.canvas, 0, 0);
      feedbackTexture = this.createTexture(context.canvas);
      uniforms.dd_samplerFeedback = feedbackTexture;
    }

    if(feedbackTexture) {
      gl.deleteTexture(feedbackTexture);
    }

    const eventUniforms = this[_eventUniforms];

    if('dd_frameIndex' in uniforms) {
      uniforms.dd_frameIndex++;
      needUpdate = true;
    }
    if('dd_randseed' in uniforms) {
      uniforms.dd_randseed = [Math.random(), Math.random()];
      needUpdate = true;
    }
    if('dd_mousePosition' in uniforms) {
      const pos = eventUniforms.dd_mousePosition;
      if(!arrEqual(uniforms.dd_mousePosition, pos)) {
        uniforms.dd_mousePosition = [...pos];
        needUpdate = true;
      }
      if(!fbo) pos[3] = 0;
    }
    if('dd_mouseRec' in uniforms) {
      const rec = eventUniforms.dd_mouseRec;
      if(!arrEqual(uniforms.dd_mouseRec, rec)) {
        uniforms.dd_mouseRec = [...rec];
        needUpdate = true;
      }
      if(!fbo) rec[3] = -Math.abs(rec[3]);
    }
    if('dd_mouseEvent' in uniforms) {
      if(uniforms.dd_mouseEvent !== eventUniforms.dd_mouseEvent) needUpdate = true;
      uniforms.dd_mouseEvent = eventUniforms.dd_mouseEvent;
      if(!fbo) eventUniforms.dd_mouseEvent = 0;
    }
    if('dd_keyEvent' in uniforms) {
      if(uniforms.dd_keyEvent !== eventUniforms.dd_keyEvent) needUpdate = true;
      uniforms.dd_keyEvent = eventUniforms.dd_keyEvent;
      if(!fbo) eventUniforms.dd_keyEvent = 0;
    }
    if('dd_touchEvent' in uniforms) {
      if(uniforms.dd_touchEvent !== eventUniforms.dd_touchEvent) needUpdate = true;
      uniforms.dd_touchEvent = eventUniforms.dd_touchEvent;
      if(!fbo) eventUniforms.dd_touchEvent = 0;
    }
    super.render();
    if(needUpdate) {
      this.update();
    }
  }

  // _draw() {
  //   super._draw();
  // }
}