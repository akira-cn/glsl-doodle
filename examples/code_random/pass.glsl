uniform sampler2D dd_samplerTarget;
uniform vec4 dd_mousePosition;

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 st = fragCoord.xy / dd_resolution;
  // st.y = 1.0 - st.y;
  float d = distance(st, dd_mousePosition.xy);
  vec4 color = texture(dd_samplerTarget, st);
  color.a *= mix(0.1, 1.0, (1.0 - smoothstep(0.0, 0.2, d)));
  color.rgb *= 1.0 - step(0.2, d);
  fragColor = color;
}