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
    
    float d = sdf_seg(st, vec2(0), vec2(0.5));
    d = fract(d * 5.0);
    d = stroke(d, 0.5, 0.1, 0.2);

    color = vec3(d);

    gl_FragColor = vec4(color, 1.0);
}