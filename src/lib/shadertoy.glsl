#ifndef M_SHADERTOY

#define M_SHADERTOY

// https://www.shadertoy.com/howto

#define iResolution vec3(dd_resolution,0)
#define iTime dd_time
#define iTimeDelta dd_timeDelta
// #define iTimeDelta
#define iFrame dd_frameIndex
// #define iChannelTime
#define iMouse dd_mouseRec
// #define iDate
// #define iSampleRate
// #define iChannelResolution
#define iChannel0 dd_sampler0
#define iChannel1 dd_sampler1
#define iChannel2 dd_sampler2
#define iChannel3 dd_sampler3

uniform float dd_time;
uniform float dd_timeDelta;
uniform int dd_frameIndex;
uniform vec2 dd_resolution;
uniform vec4 dd_mouseRec;

#endif