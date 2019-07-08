#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

UDF random_shap(in vec2 st, in vec2 seed) {
    float num = floor(random(seed) * 8.0);
    st += num;
    return shape_star(st)
        + shape_bud5(st - 1.0)
        + shape_flower3(st - 2.0)
        + shape_clover4(st - 3.0)
        + shape_rhombus(st - 4.0)
        + shape_gourd(st - 5.0)
        + shape_apple(st - 6.0)
        + shape_hexagon(st - 7.0);
}

void main() {
    vec2 st = gl_FragCoord.xy / dd_resolution.xy;
    // st = lerp(vec2(-3, -3), vec2(3, 3), st);
    vec2 grid = vec2(10, 10);
    vec2 index = grid_index(st, grid);
    st = grid_xy(st, grid);

    float d = random_shap(st, dd_randseed0 + index);
    color(d, vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
}