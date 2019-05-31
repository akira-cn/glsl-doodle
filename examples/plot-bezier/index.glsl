#ifdef GL_ES
precision mediump float;
#endif

#pragma include <stdlib>
#pragma include <graph>
#pragma include <pattern>

uniform vec2 abc;
uniform float dd_time;
uniform vec2 dd_resolution;
uniform vec2 dd_randseed;

// Helper functions:
float slopeFromT (float t, float A, float B, float C){
  float dtdx = 1.0/(3.0*A*t*t + 2.0*B*t + C); 
  return dtdx;
}

float xFromT (float t, float A, float B, float C, float D){
  float x = A*(t*t*t) + B*(t*t) + C*t + D;
  return x;
}

float yFromT (float t, float E, float F, float G, float H){
  float y = E*(t*t*t) + F*(t*t) + G*t + H;
  return y;
}

float cubicBezier (float x, float a, float b, float c, float d){
  float y0a = 0.00; // initial y
  float x0a = 0.00; // initial x 
  float y1a = b;    // 1st influence y   
  float x1a = a;    // 1st influence x 
  float y2a = d;    // 2nd influence y
  float x2a = c;    // 2nd influence x
  float y3a = 1.00; // final y 
  float x3a = 1.00; // final x 

  float A = x3a - 3.0 *x2a + 3.0 * x1a - x0a;
  float B = 3.0 * x2a - 6.0 * x1a + 3.0 * x0a;
  float C = 3.0 * x1a - 3.0 * x0a;   
  float D = x0a;

  float E = y3a - 3.0 * y2a + 3.0 * y1a - y0a;    
  float F = 3.0 * y2a - 6.0 * y1a + 3.0 * y0a;             
  float G = 3.0 * y1a - 3.0 * y0a;             
  float H = y0a;

  // Solve for t given x (using Newton-Raphelson), then solve for y given t.
  // Assume for the first guess that t = x.
  float currentt = x;
  const int nRefinementIterations = 5;
  for (int i=0; i < nRefinementIterations; i++){
    float currentx = xFromT (currentt, A,B,C,D); 
    float currentslope = slopeFromT (currentt, A,B,C);
    currentt -= (currentx - x)*(currentslope);
    currentt = clamp(currentt, 0.0, 1.0);
  } 

  float y = yFromT (currentt,  E,F,G,H);
  return y;
}

float f1(in float x) {
  return cubicBezier(x, 0.253, 0.720, 0.720, 0.250);
}

float fx(in float x) {
  return 0.0;
}

void main() {
  // gl_FragColor = vec4(abs(sin(dd_time)),0.0,0.0,1.0);
  // vec2 st = gl_FragCoord.xy / dd_resolution;
	// gl_FragColor = vec4(st, 0.0, 1.0);
  vec2 grid = vec2(5, 5);
	vec2 st = gl_FragCoord.xy / dd_resolution;
  vec2 idx = grid_index(st, grid);
  
  // st = grid_xy(st, grid);
  st = mix(vec2(-2, -2), vec2(2, 2), st);

  float stp = 0.1;
  float thick = 0.8;
  float smth = 0.2;

  // PLOT func, field, step, thick, smooth
  float px = PLOT(fx, st, 0.01);
  float py = abs(sdf_line(st, vec2(0.0, 0.0), vec2(0.0, 1.0)));
  float p1 = PLOT(f1, st, 0.01);

  vec3 cx = stroke(px, 0.01, 0.2) * vec3(1.0);
  vec3 cy = stroke(py, 0.01, 0.2) * vec3(1.0);
  vec3 c1 = stroke(p1, 0.05, 0.2) * vec3(1.0, 1.0, 0.0);

	gl_FragColor = vec4(cx + cy + c1, 1.0);
}