# glsl-doodle

Drawing patterns with glsl shaders on modern browsers.

https://doodle.webgl.group/

## Usage

From CDN:

```html
<script src="https://unpkg.com/glsl-doodle@0.1.2/dist/glsl-doodle.js"></script>
<glsl-doodle for="myShader"></glsl-doodle>
<script id="myShader" type="x-shader/x-fragment">
#ifdef GL_ES
precision mediump float;
#endif

#pragma include <graphics>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

void main() {
  vec2 st = gl_FragCoord.xy / dd_resolution;
  // st = polar(st);
  vec2 grid = vec2(10, 10);
  vec2 idx = grid_index(st, grid);
  st = grid_xy(st, grid);

  box2 box = create_box();
  box = scale(box, center(box), vec2(random(idx, 0.1, 0.9)));
  st = box_quad(st, box);

  float pct = sdf_rect(st, vec2(0), 1.0, 1.0);
  color(fill(pct, 0.0), random3(idx + dd_randseed0));
}
</script>
```

With external resource:

```html
<script src="https://unpkg.com/glsl-doodle@0.1.2/dist/glsl-doodle.js"></script>
<glsl-doodle src="https://raw.githubusercontent.com/akira-cn/glsl-doodle/master/demos/preview/grids/index.glsl"></glsl-doodle>
```

From NPM:

```bash
npm i glsl-doodle --save
```

```js
import Doodle from 'glsl-doodle';
(async function () {
  const doodle = new Doodle();
  const program = await doodle.load('https://raw.githubusercontent.com/akira-cn/glsl-doodle/master/demos/preview/grids/index.glsl');
  doodle.useProgram(program);
  doodle.render();
}());
```

For more information, please visit https://doodle.webgl.group/.
