#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;
uniform vec2 dd_randseed0;
uniform int dd_rendercount;

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise3(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

// https://thebookofshaders.com/12/
void main() {
    vec2 st = gl_FragCoord.xy/dd_resolution.xy;
    st.x *= dd_resolution.x/dd_resolution.y;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(st*10.0);

    color = vec3( noise3(pos)*.5+.5 );

    gl_FragColor = vec4(color,1.0);
}
