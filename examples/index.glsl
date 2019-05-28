#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>
#pragma include "./common.glsl"

uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;
uniform vec2 dd_randseed0;
uniform int dd_rendercount;

void main()
{
    vec2 st = gl_FragCoord.xy / dd_resolution.xy;
    vec3 color = vec3(0.0);
    
    // st = polar(st, vec2(0.5));

    // float r = st.x;
    // float a = st.y;

    // float f = cos(a * 3.0);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    // color = vec3(1.0 - smoothstep(f - 0.01, f + 0.01, r));
    float d1 = rhombus(st, vec2(0.5), 0.5, 0.3, 0.02);
    float d2 = ellipse(st, vec2(0.5), 0.3, 0.2, 0.0,  0.25 * PI, 0.02);
    float d3 = ellipse(st, vec2(0.5), 0.3, 0.2, 0.0,  0.5 * PI, 0.02);
    // float d2 = arc(st, vec2(0.5), 0.3, 0.0,  0.25 * PI, 0.02);

    // color = vec3(udf_complement(d1, d2));
    color = vec3(d2 + d3);

    gl_FragColor = vec4(color, 1.0);
}