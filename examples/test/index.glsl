#version 300 es
precision highp float;
out vec4 FragColor;

#define iResolution vec3(u_resolution, 0)
#define iTime u_time
#define iTimeDelta u_timeDelta
#define iFrame u_frameIndex
#define iChannel0 texture_noise

uniform sampler2D texture_noise;
uniform int u_frameIndex;
uniform float u_timeDelta;
uniform float u_time;
uniform vec2 u_resolution;

#define SPIRAL_NOISE_ITER 8
float hash(const in vec3 p){
  return fract(sin(dot(p,vec3(127.1,311.7,758.5453123)))*43758.5453123);
}

float pn(in vec3 x){
  vec3 p = floor(x),f = fract(x);
  f *= f*(3.-f-f);
  vec2 uv = (p.xy+vec2(37,17)*p.z) + f.xy,
    rg = textureLod(iChannel0,(uv+.5)/256.,-100.).yx;
  return 2.4*mix(rg.x,rg.y,f.z)-1.;
}

const float nudge = 20.;
float normalizer = 1.0 / sqrt(1.0 + nudge*nudge);
float SpiralNoiseC(vec3 p,vec4 id){
  float iter = 2.,n = 2.-id.x;
  for (int i = 0;i < SPIRAL_NOISE_ITER;i++){
    n += -abs(sin(p.y*iter) + cos(p.x*iter)) / iter;
    p.xy += vec2(p.y,-p.x) * nudge;
    p.xy *= normalizer;
    p.xz += vec2(p.z,-p.x) * nudge;
    p.xz *= normalizer;
    iter *= id.y + .733733;
  }
  return n;
}

#ifdef SHANE_ORGANIC
float map(vec3 p,vec4 id){
  float k = 2.*id.w +.1;
  p *=(.5+4.*id.y);
  return k*(.1+abs(dot(p = cos(p*.6 + sin(p.zxy*1.8)),p) - 1.1)*3. + pn(p*4.5)*.12);
}
#else 
float map(vec3 p,vec4 id){
  float k = 2.*id.w +.1;
  return k*(.5 + SpiralNoiseC(p.zxy*.4132+333.,id)*3. + pn(p*8.5)*.12);
}
#endif 

vec3 hsv2rgb(float x,float y,float z){
  return z+z*y*(clamp(abs(mod(x*6.+vec3(0,4,2),6.)-3.)-1.,0.,1.)-1.);
}
vec4 renderSuperstructure(vec3 ro,vec3 rd,const vec4 id){
  const float max_dist=20.;
  float ld,td=0.,w,d,t,noi,lDist,a,rRef = 2.*id.x,h = .05+.25*id.z;
  vec3 pos,lightColor;
  vec4 sum = vec4(0);
  t = .3*hash(vec3(hash(rd))+iTime);
  for (int i=0;i<200;i++){
    if(td>.9 || sum.a > .99 || t>max_dist) break;
      a = smoothstep(max_dist,0.,t);
      d = abs(map(pos = ro + t*rd,id))+.07;
      lDist = max(length(mod(pos+2.5,5.)-2.5),.001);
      noi = pn(0.03*pos);
      lightColor = mix(hsv2rgb(noi,.5,.6),hsv2rgb(noi+.3,.5,.6),smoothstep(rRef*.5,rRef*2.,lDist));
      sum.rgb += a*lightColor/exp(lDist*lDist*lDist*.08)/30.;
      if (d<h){td += (1.-td)*(h-d)+.005;sum.rgb += sum.a * sum.rgb * .25 / lDist;sum += (1.-sum.a)*.05*td*a;
    }
    td += .015;
    t += max(d * .08 * max(min(lDist,d),2.),.01);
  }
  sum *= 1. / exp(ld*.2)*.9;
  sum = clamp(sum,0.,1.);
  sum.xyz *= sum.xyz*(3.-sum.xyz-sum.xyz);
  return sum;
}

#define R(p,a) p=cos(a)*p+sin(a)*vec2(p.y,-p.x)
 void mainImage(out vec4 fragColor,in vec2 fragCoord){
   vec2 m = vec2(0.5)/iResolution.xy;
   vec3 ro = vec3(15.+iTime,cos(.1*iTime),15.+iTime),
    rd = normalize(vec3((fragCoord.xy-0.5*iResolution.xy)/iResolution.y,1.));
   R(rd.zx,3.*m.x);R(rd.yx,1.5*m.y);R(rd.xz,iTime*.1);
   vec4 col = renderSuperstructure(ro,rd,vec4(0.5));
   fragColor = vec4(col.xyz + 0.0*vec3(.1,.2,.3),1.);
} 

void main() {
  mainImage(FragColor, gl_FragCoord.xy);
} 