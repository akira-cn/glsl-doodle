#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

void main() {
    vec2 st = gl_FragCoord.xy / dd_resolution.xy;
    vec3 color = vec3(0.0);

    float d1 = sdf_rhombus(st, vec2(0.5), 0.5, 0.3);
    float d2 = sdf_arc(st, vec2(0.5), 0.3, 0.0, 1.5 * PI);

    d1 = fill(d1, 0.02);
    d2 = fill(d2, 0.02);

    color = vec3(udf_complement(d1, d2));

    gl_FragColor = vec4(color, 1.0);
}