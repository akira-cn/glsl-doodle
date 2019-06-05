#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <color>
#pragma include <pattern>

uniform vec2 dd_resolution;
uniform vec2 dd_randseed0;

float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0, .5 + b*.5, abs((sin(pos.x*3.1415)+b*2.0))*.5);
}

// https://thebookofshaders.com/11/
void main() {
    vec2 st = gl_FragCoord.xy / dd_resolution.xy;
    st.y *= dd_resolution.y / dd_resolution.x;

    vec2 pos = st.yx * vec2(10.0, 3.0);

    float pattern = pos.x;

    // Add noise
    pos = rotate(pos, noise(pos));

    // Draw lines
    pattern = lines(pos,.5);

    gl_FragColor = vec4(vec3(pattern),1.0);
}