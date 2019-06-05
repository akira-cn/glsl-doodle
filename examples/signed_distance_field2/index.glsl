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
    
    float d = sdf_triangle(st, vec2(0.1), vec2(0.5), vec2(0.1, 0.5));
    d = sdf_rect(st, vec2(0.1), 0.4, 0.3);
    d = sdf_circle(st, vec2(0.5), 0.3);
    // d = sdf_ellipse(st, vec2(0.5), 0.4, 0.3);
    // d = sdf_ellipse(st, vec2(0.5), 0.4, 0.4, 0.25 * PI, 0.75 * PI);
    
    // d = stroke(d, 0.0, 0.03, 0.2);
    // d = stroke(d, -0.2, 0.1, 0.3);

    if(d > 0.0) d = fract(d * 5.0);
    // d = fill(d, 0.03);
    // d = fill(d, -0.2, 0.02);
    d = fill(d, 0.0, 0.1, 0.05);

    color = vec3(d);

    gl_FragColor = vec4(color, 1.0);
}