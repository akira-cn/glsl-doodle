#define PI	3.14159265359
#define PI2 PI*2.0
#define PIH PI*0.5
#define EPS 0.01
#define BB_OFFSET 0.1

#define HEAD -2.0
#define TAIL 2.0

#define ZOOM 0

mat2 rotate(in float a)
{
    float s=sin(a),c=cos(a);
    return mat2(c,s,-s,c);
}

mat3 lookat(in vec3 eye, in vec3 target)
{
	vec3 w = normalize(target-eye);
	vec3 u = normalize(cross(w,vec3(0.0,1.0,0.0)));
	vec3 v = normalize(cross(u,w));
    return mat3(u,v,w);
}

vec4 quaternion(in vec3 p, in float a)
{
	return vec4(p*sin(a/2.0),cos(a/2.0));
}

vec4 invq(in vec4 q)
{
    return vec4(-q.xyz,q.w);
}

vec3 qtransform(in vec4 q, in vec3 p)
{
	return p+2.0*cross(cross(p,q.xyz)-q.w*p,q.xyz);
}

float smin(in float a, in float b, in float k)
{
    float h = clamp(0.5+0.5*(b-a)/k,0.0,1.0);
    return mix(b,a,h) - k*h*(1.0-h);
}    

vec2 fold1(in vec2 p, in float a)
{
    p.x = abs(p.x);
    vec2 v = vec2(cos(a),sin(a));
    p -= 2.0*min(0.0,dot(p,v))*v;
    return p;    
}

vec2 fold3(in vec2 p, in float a)
{
    p.x = abs(p.x);
    vec2 v = vec2(cos(a),sin(a));
    for(int i=0;i<3;i++)
    {	
    	p -= 2.0*min(0.0,dot(p,v))*v;
    	v = normalize(vec2(v.x-1.0,v.y));
    }
 	return p;    
}
     
vec2 bend(in vec2 p, in float d)
{
    p.y -= d*p.x*p.x;
    p.y *= cos(atan(2.0*d*p.x));
 	return p;   
}
    
float gaussian(in float t)
{
    return exp(-t*t);
}
    
float lengthN(in vec2 p, in float n)
{
	p = pow(abs(p),vec2(n));
	return pow(p.x+p.y,1.0/n);
}

vec2 segment(in vec2 p, in float a, in float b)
{
    float x=clamp(p.x,min(a,b),max(a,b));
    return vec2(length(p-vec2(x,0.0)),(x-a)/(b-a));
}

float pattern(in vec2 p) {
    p *= vec2(8.0,25.0);
 	p.x = mod(p.x,2.0)-1.0;
    p.y = mod(p.y,4.0)-2.0;    
    float de = abs(abs(p.x)+clamp(abs(p.y)-1.0,-0.5,0.5)-0.5);
    return clamp(de+0.7,0.0,1.0);
}

vec2 bodyCurve(in float x)
{
    float t = iTime * 1.5;
    return vec2(
        0.05*cos(x*5.0+t)+0.1*cos(x*3.0+t),
        0.1*sin(x*5.0+t)+0.15*sin(x*3.0+t));
}
    
float barbCurve(in float x)
{
    float t = iTime*1.5;
 	return mix(0.0,0.02*sin(-40.0*x+t),clamp(x*5.0,0.0,1.0));   
}

float HairCurve(in float x)
{
    return mix(0.0,0.02*sin(35.0*x),clamp(x*6.0,0.0,1.0))+x*0.6;   
}

float mapTop(in vec3 p) // head parts
{
    float bump = 0.005*pattern(vec2(atan(p.y,p.z),p.x)*vec2(1.0,1.5));
    p -= vec3(-0.03,0.07,0.0);
    p *= vec3(0.8,1.5,1.0);
    float de = length(vec2(lengthN(p.xy,3.0),p.z))-0.07;
    p -= vec3(-0.047,-0.01,0.0);
    p.z = abs(p.z); p.z -= 0.035;
    de = smin(de, length(p)-0.035,0.01);    
    p.y -= 0.004;
    p.yz *= rotate(-0.1);
    p.y *= 1.8;
    de -= -0.06*gaussian(length(p.yz)*90.0)*step(0.0,-p.x);      
    de -= bump;
    return de;
}

float mapUpperJaw(in vec3 p) // head parts
{
    float bump = 0.005*pattern(vec2(atan(p.y,p.z),p.x)*vec2(1.0,1.5));    
    vec3 q = p;
    p.y -= 0.01;
    p.xy = bend(p.xy, 0.2);
    vec2 sg = segment(p.xy,-0.3,0.0);
    float de = lengthN(vec2(sg.x, p.z*0.6),2.5)-(0.02*sg.y*sg.y+0.03);
    p.x -= -0.3;
    p.z = abs(p.z); p.z -= 0.032;
    de -= 0.006*gaussian(length(p.xz)*70.0)*step(0.0,p.y);
    p.y -= 0.0045;
    p.yz *= rotate(-0.3);
    p.y *= 1.6;
    de -= -0.02*gaussian(length(p.yz)*120.0)*step(0.0,-p.x);   
    q.x -= -0.28;
    q.x *= 0.3;
    de -= 0.01*gaussian(length(q.xz)*70.0)*step(0.0,q.y);   
    de -= bump;
    return de;
}

float mapUpperFang(in vec3 p) // head parts
{
    p -= vec3(-0.3,-0.04,0.0);
    p.z = abs(p.z); p.z -= 0.04;
    vec2 sg = segment(p.yz,0.0,0.05);
    return lengthN(vec2(sg.x,p.x),1.5)-0.01*sg.y;
}

float mapBottomJaw(in vec3 p) // head parts
{
    float bump = 0.005*pattern(vec2(atan(p.y,p.z),p.x)*vec2(0.7,1.7))*step(-0.02,-p.y);
	p.xy = bend(p.xy,-0.2);
    vec2 sg = segment(p.xy,-0.25,0.0);
    float de = lengthN(vec2(sg.x, p.z*0.7),2.5)-(0.02*sg.y*sg.y+0.03);    
    de -= -0.008*gaussian(length(p.yz)*50.0)*step(0.0,-p.x);        
    p.x -= -0.1;
    p.x *= 0.15;   
    de -= -0.05*gaussian(length(p.xz)*60.0)*step(0.0,p.y);            
    de -= bump;
    return de;
}

float mapBottomFang(in vec3 p) // head parts
{
    p -= vec3(-0.24,0.017,0.0);
    p.z = abs(p.z); p.z -= 0.03;
    p.x = abs(p.x); p.x -= 0.01;
    p.x = abs(p.x); p.x -= 0.01;
    p.yz *= rotate(0.2);
    vec2 sg = segment(p.yz,0.03,0.0);
    return lengthN(vec2(sg.x,p.x),1.5)-0.01*sg.y;
}

float mapEyes(in vec3 p) // head parts
{
    p -= vec3(-0.115,0.065,0.0);
    p.z = abs(p.z); p.z -= 0.035;
    return length(p)-0.015;
}

float mapEars(in vec3 p) // head parts
{
    p -= vec3(-0.025,0.06,0.0);
    p.z = abs(p.z); p.z -= 0.08;
    p.z *=1.5;
    p.yz *= rotate(0.5);
    p.xy *= rotate(-0.3);
    vec2 sg = segment(p.yx,0.08,0.0);
    float de = lengthN(vec2(sg.x,p.z),5.0)-(0.02*sg.y+0.01);
    p.y -= 0.02;
    p.y *=0.5;
    de -= -0.02*gaussian(length(p.yx)*70.0)*step(0.0,p.z);
    return de;
}

float mapHorns(in vec3 p) // head parts
{
    p -= vec3(0.0,0.05,0.0);
    p.z = abs(p.z); p.z -= 0.04;
    p.xz *= rotate(0.3);
    p.xy *= rotate(-0.5);
    p.yz = bend(p.yz, 0.3);
    vec2 sg = segment(p.yz,0.25,0.0);
    return lengthN(vec2(sg.x,p.x),1.5)-0.01;
}
    
float mapBarb(in vec3 p) // head parts
{
    p -= vec3(-0.27,0.04,0.0);
    p.z = abs(p.z); p.z -= 0.05;
    p.zy *= rotate(0.5);
    p.xz *= rotate(-0.8);
    p.y -= barbCurve(p.z);
    float g = (barbCurve(p.z+EPS)-barbCurve(p.z-EPS))/(2.0*EPS);
    p.x *= cos(atan(g));
    vec2 sg = segment(p.zx,0.25,0.0);
    return 0.7*(length(vec2(sg.x, p.y))-(0.005*sg.y+0.003));
}

float mapHair(in vec3 p) // head parts
{
    p -= vec3(-0.02,0.055,0.0);
    p.zy = fold3(p.zy,radians(140.0));
    p.y -= 0.06;    
    p.y -= HairCurve(p.x);
    float g = (HairCurve(p.z+EPS)-HairCurve(p.z-EPS))/(2.0*EPS);
    p.x *= cos(atan(g));
    vec2 sg = segment(p.xz,0.12,0.0);
    return 0.7*(length(vec2(sg.x, p.y))-(0.01*sg.y+0.004));
}

float mapHead(in vec3 p)
{
    p.x -= HEAD;
    p.zy -= bodyCurve(HEAD);
    
    // bounding box
    vec3 q = p;
    q -= vec3(-0.1,0.07,0.0);
    vec3 bb = vec3(0.24,0.21,0.2)+BB_OFFSET;
    if (any(greaterThan(abs(q),bb))) return length(max(abs(q)-bb,0.0))+BB_OFFSET;

    // BottomJaw postion
    q = p;
    q.y -= -0.01;    
    q.xy *= rotate(0.1*sin(iTime)+0.3);
   
    float de = 1.0;
    de =  min(de, mapTop(p));
	de = smin(de, mapUpperJaw(p),0.02);
    de = smin(de, mapEars(p),0.03);
	de =  min(de, mapHair(p));
	de =  min(de, mapEyes(p));
	de =  min(de, mapHorns(p));
    de =  min(de, mapUpperFang(p));
    de =  min(de, mapBarb(p));
    de =  min(de, mapBottomJaw(q));
    de =  min(de, mapBottomFang(q));
    return de;
}

float mapBody(in vec3 p)
{
    p.zy -= bodyCurve(p.x);
	vec2 g = (bodyCurve(p.x+EPS)-bodyCurve(p.x-EPS))/(2.0*EPS);
    p.zy *= cos(atan(g));
    
    // bounding box
    vec3 q = p;
    q -= vec3(0.0,0.03,0.0);
    vec3 bb = vec3(2.2,0.2,0.15)+BB_OFFSET;
    if (any(greaterThan(abs(q),bb))) return length(max(abs(q)-bb,0.0))+BB_OFFSET;
    
    // main
    vec3 pMain = p;
    vec2 sg = segment(p.xy,TAIL,HEAD);
    float t = -abs(sg.y-0.6)*1.2+0.75;
    t = 0.1*smoothstep(0.0,0.25,t*t);
    
    float deMain = 0.8*(lengthN(vec2(sg.x,p.z*0.8),2.5)-(t+0.02));
    float a = atan(p.z,-p.y);    
    deMain -= -0.005*gaussian((abs(a)-0.6)*20.0)*step(0.0,-p.y);
    if (abs(a)<0.6)
    {
        deMain -= -0.005*gaussian(sin(p.x*PI2*6.0)*3.0)*step(0.0,-p.y);
        deMain -= 0.001*length(sin(vec2(p.x*10.0,a)*20.0));
    } else {
        deMain -= 0.005*pattern(vec2(a,p.x));
    }

    // fin
    p -= vec3(-0.4,t+0.03,0.0);
    float s = 0.05;
    for(int i=0;i<14;i++){
        p.x = abs(p.x);
        p.x -= s*2.0;
    }
    p.x += s;
    p.y *= 0.4;
    p.xy *= rotate(0.8);
    float deFin = max(abs(p.z)-0.01,lengthN(p.xy,5.0)-0.02);
    
    float de = 1.0;
    de =  min(de,deMain);
    de = smin(de,deFin,0.01);
    return de;
}

float  mapArm1(in vec3 p) // arms parts
{
    vec2 sg = segment(p.zx,0.3,0.0);
    float de = lengthN(vec2(sg.x, p.y*1.2),2.5)-(0.05*sg.y+0.05);
    de -= 0.005*pattern(vec2(atan(p.y,p.x),p.z)*vec2(0.7,1.8));
    return de;
}

float  mapArm2(in vec3 p) // arms parts
{
    vec2 sg = segment(p.zx,0.3, 0.0);
    float de = lengthN(vec2(sg.x, p.y*1.2),2.5)-(0.02*sg.y+0.04);
    de -= 0.005*pattern(vec2(atan(p.y,p.x),p.z)*vec2(0.7,1.8));
    return de;
}
    
float  mapHand(in vec3 p) // arms parts
{
    p -= vec3(-0.05,-0.02,0.0);
 	p.zx = fold1(p.zx,radians(110.0));
    p.xy *= rotate(-0.5);
    vec2 sg = segment(p.xz,0.08,0.0);
    float deHand = lengthN(vec2(sg.x,p.y),3.0)-(0.02*sg.y+0.02);
    p.x -= 0.08;
    p.xy *= rotate(-0.6);
    p.xy = bend(p.xy, -5.0);
    sg = segment(p.xz,0.1,0.0);
    float deClaw = lengthN(vec2(sg.x,p.y),2.5)-(0.02*sg.y);
    return smin(deHand, deClaw, 0.03);
}

float  mapClaw(in vec3 p) // arms parts for coloring
{
    p -= vec3(-0.05,-0.02,0.0);
 	p.zx = fold1(p.zx,radians(110.0));
    p.xy *= rotate(-0.5);
    p.x -= 0.08;
    p.xy *= rotate(-0.6);
    p.xy = bend(p.xy, -5.0);
    vec2 sg = segment(p.xz,0.1,0.0);
    return lengthN(vec2(sg.x,p.y),2.5)-(0.02*sg.y);
}

float  mapBall(in vec3 p, in float s) // arms parts
{
    p -= vec3(-0.05,-0.12,0.01);
    if (s<0.0) return length(p)-0.06;
    return 1.0;
}    

float mapArms(in vec3 p)
{
    const float offset = -1.2;
    p.x -= offset;
    p.zy -= bodyCurve(offset);
    
    // bounding box
    vec3 q = p;
    q -= vec3(-0.015,-0.12,0.0);
    vec3 bb = vec3(0.28,0.25,0.62)+BB_OFFSET;
    if (any(greaterThan(abs(q),bb))) return length(max(abs(q)-bb,0.0))+BB_OFFSET;

	float s = sign(p.z);   
    p.z = abs(p.z);

    vec4 quat;
	p -= vec3(0.0, 0.0, 0.15);
    quat = quaternion(normalize(vec3(0.5,1.0,0.0)),-0.7);
    vec3 p1 = qtransform(quat, p);
    
    p -= qtransform(invq(quat),vec3(0.0,0.0,0.3));
    quat = quaternion(normalize(vec3(-0.7,1.0,0.0)),1.0);
    vec3 p2 = qtransform(quat, p);
    
    p -= qtransform(invq(quat),vec3(0.0,0.0,0.3));
    quat = quaternion(normalize(vec3(0.0,0.0,1.0)),0.5);
    vec3 p3 = qtransform(quat, p);
         
    float de = 1.0;
    de =  min(de,mapArm1(p1));
    de = smin(de,mapArm2(p2),0.04);
    de = smin(de,mapHand(p3),0.03);
    de =  min(de,mapBall(p3,s));
        
    return de;
}

float mapDragon(in vec3 p)
{
    p.zx *= rotate(PIH);
    p.yx *= rotate(0.2);
    float de = 1.0;
    de =  min(de,mapBody(p));
    de = smin(de,mapHead(p),0.03);
    de = smin(de,mapArms(p),0.06);
    return de;
}

float mapGround(in vec3 p)
{
    float de = p.y-0.2;
    de -= 0.02*sin(5.0*p.x+iTime*0.5);
    de -= 0.02*sin(7.0*p.z+iTime*1.5);
    de -= 0.02*sin(8.0*length(p.zx)+iTime);
    return de;
}

vec3 doMotion(in vec3 p)
{
#if ZOOM
    p.z -= -2.0;
    p.y -= 1.0;
    return p;
#endif
    
    float t = mod(iTime,60.0);
    float h;
    if (t < 40.0)
    {
    	// 0-10s
    	p -= vec3(0.0,-0.5,-0.5);
    	h = clamp(t-0.0,0.0,10.0)/10.0;
    	p -= mix(vec3(0.0),vec3(0.0,0.9,0.0),h);    
    	//10-20s
    	h = clamp(t-10.0,0.0,10.0)/10.0;
    	p -= mix(vec3(0.0),vec3(0.8,-0.3,0.0),h*h);
    	p.xz *= rotate(PIH * h*h);
    	p.zy *= rotate(0.3* h);
    	//20-30s
    	h = clamp(t-20.0,0.0,10.0)/10.0;
    	p -= mix(vec3(0.0),vec3(-0.2,1.0,0.0),h*h);
    	p.zy *= rotate(-0.5* h);
    	//30-40s
    	h = clamp(t-30.0,0.0,10.0)/10.0;
    	p -= mix(vec3(0.0),vec3(-0.5,-2.3,0.0),h*h);
		p.zy *= rotate(-0.6* h*h);
    }
    else if (t < 50.0)    
    {
    	//40-50s
        p -= vec3(0.0,-2.1,0.7);
        p.zy *= rotate(PIH);        
    	h = clamp(t-40.0,0.0,10.0)/10.0;
    	p -= mix(vec3(0.0),vec3(0.5,0.0,6.0),h*h);
    	p.yx *= rotate(-PI2*1.5*h);
    }
    else
    {
    	//50-60s
    	p -= vec3(0.0,0.15,-4.5);
    	h = clamp(t-50.0,0.0,10.0)/10.0;
    	p -= mix(vec3(0.0),vec3(0.0,0.0,7.5),h);
    }
    return p;
}

float map(in vec3 p)
{   
    return min(mapGround(p),mapDragon(doMotion(p)));
}

vec3 doColor(in vec3 p)
{
    float e = 0.001;
    if (mapGround(p)<e) return vec3(0.2,0.2,0.35);
    p = doMotion(p);
    p.zx *= rotate(PIH);
    p.yx *= rotate(0.2);
    vec3 q = p;
    
    // body
    p.zy -= bodyCurve(p.x);
	vec2 g = (bodyCurve(p.x+EPS)-bodyCurve(p.x-EPS))/(2.0*EPS);
    p.zy *= cos(atan(g));
    float a = atan(p.z,-p.y);
    if (abs(a)<0.65 && p.x>-1.95) return vec3(0.75,0.65,0.5);
    vec2 sg = segment(p.xy,TAIL,HEAD);
    float t = -abs(sg.y-0.6)*1.2+0.75;
    t = 0.1*smoothstep(0.0,0.25,t*t);
    if (p.y>t+0.03 && p.x>-1.8) return vec3(0.7,0.1,0.1);
    
    // arms
    p = q;
    const float offset = -1.2;
    p.x -= offset;
    p.zy -= bodyCurve(offset);
	float s = sign(p.z);   
    p.z = abs(p.z);
    vec4 quat;
	p -= vec3(0.0, 0.0, 0.15);
    quat = quaternion(normalize(vec3(0.5,1.0,0.0)),-0.7);
    p -= qtransform(invq(quat),vec3(0.0,0.0,0.3));
    quat = quaternion(normalize(vec3(-0.7,1.0,0.0)),1.0);
    p -= qtransform(invq(quat),vec3(0.0,0.0,0.3));
    quat = quaternion(normalize(vec3(0.0,0.0,1.0)),0.5);
    p = qtransform(quat, p);
    if (mapClaw(p)<e) return vec3(1.0);
    if (mapBall(p,s)<e) return vec3(0.9,0.8,0.3);

    // head
    p = q;
    p.x -= HEAD;
    p.zy -= bodyCurve(HEAD);
    if (mapHair(p)<e) return vec3(0.1,0.05,0.05);
	if (mapHorns(p)<e) return vec3(0.9,0.5,0.1);
    if (mapUpperFang(p)<e) return vec3(0.8);
    if (mapBarb(p)<e) return vec3(0.1);
    if (mapEyes(p)<e)
    {
        p -= vec3(-0.115,0.065,0.0);
    	p.z = abs(p.z); p.z -= 0.035;
        vec3 col = mix(vec3(0.05,0.2,0.35),vec3(1.0),step(0.4,length(50.0*p.yz)));
        vec2 c = vec2(0.0,0.007);
        col = mix(vec3(1.0,1.0,0.0),col,            
            step(0.4,max(length(50.0*(p.yz-c)),length(50.0*(p.yz+c)))));
        return col;
    }
    p.y -= -0.01;    
    p.xy *= rotate(0.1*sin(iTime)+0.3);
    if (mapBottomFang(p)<e) return vec3(0.8);

    return vec3(0.15,0.3,0.25);
}

// thanks iq
vec3 calcNormal(in vec3 pos)
{
    vec3 n = vec3(0.0);
    for( int i=min(iFrame,0); i<4; i++ )
    {
        vec3 e = 0.5773*(2.0*vec3((((i+3)>>1)&1),((i>>1)&1),(i&1))-1.0);
        n += e*map(pos+0.001*e);
    }
    return normalize(n);
}

/*
vec3 calcNormal(in vec3 pos)
{
    vec2 e = vec2(1.0,-1.0)*0.001;
    return normalize(
        e.xyy*map(pos+e.xyy)+e.yyx*map(pos+e.yyx)+ 
        e.yxy*map(pos+e.yxy)+e.xxx*map(pos+e.xxx));
}
*/

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p2 = (2.0*fragCoord-iResolution.xy)/iResolution.y;
    vec3 col = vec3(0.8,0.8,0.9)*(1.0-0.7*p2.y*p2.y);
    vec3 rd = normalize(vec3(p2,2.0));    
    vec3 ro = vec3(0.0,0.8,2.5);  
    ro.xz *= rotate(PI*0.77777*floor(iTime/60.0));
    vec3 ta = vec3(0.0,0.2,0.0);
    ro += 0.03*sin(2.0*iTime*vec3(1.1,1.2,1.3));
	ta += 0.03*sin(2.0*iTime*vec3(1.7,1.5,1.6));

#if ZOOM
	#if 1
    	// face
    	ro = vec3(0.0,1.8,0.7);
    	ro.xz *= rotate(1.2*sin(iTime*0.3));
    	ta = vec3(bodyCurve(HEAD),1.5).xzy;
	#else
    	// hand
    	ro = vec3(-1.2,1.3,-0.5);
    	ta = vec3(-0.5,1.0,-1.0);
	#endif
#endif
    
    rd = lookat(ro,ta)*rd;
    float maxd = 10.0;
    float t = 0.0,d;
    for(int i=0;i<100;i++)
    {
        t += d = map(ro+rd*t);
        if(d<0.001||t>maxd) break;
    }
    if(t<maxd)
    {
        vec3 p = ro+t*rd;
        vec3 nor = calcNormal(p);
		col = doColor(p);
        vec3 li = normalize(vec3(2.0,3.0,3.0));
        float dif = clamp(dot(nor,li),0.0,1.0);
        float amb = max(0.5+0.5*nor.y,0.0);
        float spc = pow(clamp(dot(reflect(rd, nor),li),0.0,1.0),10.0);
        col *= clamp(0.0,1.0,max(dif,0.3)*amb+spc);
        col = mix(vec3(0.6,0.6,0.7),col,gaussian(t*0.15)*min(p.y+0.25,1.0));
		col = pow(col,vec3(0.7));
    }
    fragColor = vec4(col,1.0);
}
