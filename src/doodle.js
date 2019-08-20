import GlRender from 'gl-renderer';

import stdlib from './lib/stdlib.glsl';
import shapes from './lib/shapes.glsl';
import shaper from './lib/shaper.glsl';
import box from './lib/box.glsl';
import transform from './lib/transform.glsl';
import graphics from './lib/graph.glsl';
import color from './lib/color.glsl';
import pattern from './lib/pattern.glsl';

GlRender.addLibs({stdlib, box, transform, graphics, color, pattern, shapes, shaper});

const _eventHandlers = Symbol('eventHandlers');

function getPointerXY(canvas, e) {
  const {left, top} = e.target.getBoundingClientRect();
  const {clientX, clientY} = e.changedTouches ? e.changedTouches[0] : e;
  const x = (clientX - left) / canvas.clientWidth;
  const y = 1.0 - (clientY - top) / canvas.clientHeight;
  return [x, y];
}

export default class Doodle extends GlRender {
  static defaultOptions = {
    preserveDrawingBuffer: true,
  }

  static autoLoad() {
    window.addEventListener('DOMContentLoaded', (e) => {
      const doodleElement = document.querySelectorAll('glsl-doodle');

      doodleElement.forEach(async (el) => {
        const canvas = document.createElement('canvas');
        canvas.width = el.getAttribute('width') || 512;
        canvas.height = el.getAttribute('height') || 512;

        let root = el;
        if(el.attachShadow) {
          root = el.attachShadow({mode: 'open'});
        } else if(el.createShadowRoot) {
          root = el.createShadowRoot();
        }
        root.appendChild(canvas);

        const doodle = new Doodle(canvas);

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

        const program = await doodle.compile(fragment, vertex);
        doodle.useProgram(program);

        doodle.render();
      });
    });
  }

  async compile(frag, vert) {
    const program = await super.compile(frag, vert);

    const {fragmentShader} = program.shaderText;

    const matches = fragmentShader.match(/^#pragma\s+texture\s+.*/mg);
    if(matches) {
      this._preloadedTextures = await Promise.all(matches.map((m) => {
        const p = m.match(/^#pragma\s+texture\s+(.*)/);
        return this.loadTexture(p[1]);
      }));
    }

    return program;
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

  useProgram(program, attrOptions) {
    const gl = this.gl;
    const canvas = gl.canvas;

    if(this[_eventHandlers]) {
      this[_eventHandlers].forEach(({event, handler}) => {
        if(event === 'keydown' || event === 'keyup') document.removeEventListener(event, handler);
        else canvas.removeEventListener(event, handler);
      });
    }
    delete this.startRenderTime;
    super.useProgram(program, attrOptions);
    this[_eventHandlers] = [];

    if(this._preloadedTextures) {
      this._preloadedTextures.forEach((texture, i) => {
        const samplerID = `dd_sampler${i}`;
        if(samplerID in program.uniforms) {
          program.uniforms[samplerID] = texture;
        }
      });
      delete this._preloadedTextures;
    }

    const uniforms = this.uniforms;

    if('dd_frameIndex' in uniforms) {
      this.uniforms.dd_frameIndex = 0;
    }
    if('dd_randseed0' in uniforms) {
      this.uniforms.dd_randseed0 = [Math.random(), Math.random()];
    }
    if('dd_randseed' in uniforms) {
      this.uniforms.dd_randseed = this.uniforms.dd_randseed0 || [Math.random(), Math.random()];
    }
    if('dd_resolution' in uniforms) {
      this.uniforms.dd_resolution = [canvas.width, canvas.height];
    }

    if('dd_mouseEvent' in uniforms) {
      // 0 - none, 1 - mousedown 2 - mouseup 3 - mousewheel
      this.uniforms.dd_mouseEvent = 0;
      const mousedown = () => {
        this.uniforms.dd_mouseEvent = 1;
      };
      const mouseup = () => {
        this.uniforms.dd_mouseEvent = 2;
      };
      const mousewheel = () => {
        this.uniforms.dd_mouseEvent = 3;
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

    if('dd_mousePosition' in uniforms) {
      this.uniforms.dd_mousePosition = [-1.0, -1.0];
      const mousemove = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        this.uniforms.dd_mousePosition = [x, y];
      };
      const mouseleave = (e) => {
        this.uniforms.dd_mousePosition = [-1.0, -1.0];
      };
      canvas.addEventListener('mousemove', mousemove);
      canvas.addEventListener('mouseleave', mouseleave);
      this[_eventHandlers].push(
        {event: 'mousemove', mousemove},
        {event: 'mouseleave', mouseleave},
      );
    }

    if('dd_mouseButtons' in uniforms) {
      this.uniforms.dd_mouseButtons = 0;
      const mouseenter = (e) => {
        this.uniforms.dd_mouseButtons = e.buttons;
      };
      const mousedown = (e) => {
        this.uniforms.dd_mouseButtons = e.buttons;
      };
      const mouseup = (e) => {
        this.uniforms.dd_mouseButtons = e.buttons;
      };
      const mouseleave = (e) => {
        this.uniforms.dd_mouseButtons = 0;
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

    if('dd_keyEvent' in uniforms) {
      // 0 - none, 1 - keydown, 2 - keyup
      this.uniforms.dd_keyEvent = 0;
      const keydown = (e) => {
        this.uniforms.dd_keyEvent = 1;
      };
      const keyup = (e) => {
        this.uniforms.dd_keyEvent = 2;
      };
      document.addEventListener('keydown', keydown);
      document.addEventListener('keyup', keyup);
      this[_eventHandlers].push(
        {event: 'keydown', keydown},
        {event: 'keyup', keyup},
      );
    }
    if('dd_keyCode' in uniforms) {
      this.uniforms.dd_keyCode = 0;
      const keydown = (e) => {
        this.uniforms.dd_keyCode = e.keyCode;
      };
      const keyup = (e) => {
        this.uniforms.dd_keyCode = 0;
      };
      document.addEventListener('keydown', keydown);
      document.addEventListener('keyup', keyup);
      this[_eventHandlers].push(
        {event: 'keydown', keydown},
        {event: 'keyup', keyup},
      );
    }

    // TODO: support multi-touches
    if('dd_touchPosition' in uniforms) {
      this.uniforms.dd_touchPosition = [-1.0, -1.0];
      const touchstart = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        this.uniforms.dd_touchPosition = [x, y];
      };
      const touchmove = (e) => {
        const [x, y] = getPointerXY(canvas, e);
        this.uniforms.dd_touchPosition = [x, y];
      };
      const touchend = (e) => {
        this.uniforms.dd_touchPosition = [-1.0, -1.0];
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

    if('dd_touchEvent' in uniforms) {
      // 0 - none, 1 - touchstart, 2 - touchend, 3 - touchmove
      const touchstart = (e) => {
        this.uniforms.dd_touchEvent = 1;
      };
      const touchmove = (e) => {
        this.uniforms.dd_touchEvent = 3;
      };
      const touchend = (e) => {
        this.uniforms.dd_touchEvent = 2;
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

    if('dd_samplerFeedback' in uniforms) {
      this.setFeebackContext();
    }
    return program;
  }

  render() {
    if(!this.startRenderTime) this.startRenderTime = Date.now();
    const time = (Date.now() - this.startRenderTime) / 1000;
    const uniforms = this.uniforms;
    const gl = this.gl;

    if('dd_time' in uniforms) {
      this.uniforms.dd_time = time;
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

    super.render();

    if(feedbackTexture) {
      gl.deleteTexture(feedbackTexture);
    }

    if('dd_time' in uniforms) {
      this.update();
    }
    if('dd_frameIndex' in uniforms) {
      this.uniforms.dd_frameIndex++;
    }
    if('dd_randseed' in uniforms) {
      this.uniforms.dd_randseed = [Math.random(), Math.random()];
    }

    if('dd_mouseEvent' in uniforms) {
      this.uniforms.dd_mouseEvent = 0;
    }
    if('dd_keyEvent' in uniforms) {
      this.uniforms.dd_keyEvent = 0;
    }
    if('dd_touchEvent' in uniforms) {
      this.uniforms.dd_touchEvent = 0;
    }
  }
}