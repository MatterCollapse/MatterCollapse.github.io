(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1017:e=>{"use strict";e.exports=require("path")},7310:e=>{"use strict";e.exports=require("url")},8550:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>d,originalPathname:()=>f,pages:()=>u,routeModule:()=>h,tree:()=>c}),r(908),r(1506),r(5866);var n=r(3191),a=r(8716),o=r(7922),i=r.n(o),s=r(5231),l={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>s[e]);r.d(t,l);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,908)),"C:\\Users\\evanm\\Documents\\Coding Projects\\Websites\\Personal Website\\app\\page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1506)),"C:\\Users\\evanm\\Documents\\Coding Projects\\Websites\\Personal Website\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["C:\\Users\\evanm\\Documents\\Coding Projects\\Websites\\Personal Website\\app\\page.tsx"],f="/page",d={require:r,loadChunk:()=>Promise.resolve()},h=new n.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},8499:(e,t,r)=>{Promise.resolve().then(r.bind(r,8273))},9646:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},5091:()=>{},8273:(e,t,r)=>{"use strict";let n,a;r.r(t),r.d(t,{default:()=>eW});var o=r(326);r(7055);var i=r(9515),s=r(3548),l=r(7577),c=r(5797);let u=`
//varying vec3 Normal;
//varying vec3 Position;
//varying vec2 vUv;
varying float vDisplacement;

//uniform float u_time;
uniform vec3 u_colorPeak;
uniform vec3 u_colorMid;
uniform vec3 u_colorBeach;
uniform vec3 u_colorBase;

void main() {
  vec3 color = u_colorBase;

  if (vDisplacement > 0.25f) {
    color = u_colorPeak;
  }
  else if (vDisplacement > 0.1f) {
    color = u_colorMid;
  }
  else if (vDisplacement > 0.01f) {
    color = u_colorBeach;
  }

  gl_FragColor = vec4(color,1.0);
}
`,f=`
//varying vec3 Normal;
//varying vec3 Position;
//varying vec2 vUv;
varying float vDisplacement;

//uniform float u_time;
uniform float u_intensity;
uniform float u_raise;

// Classic Perlin 3D Noise 
// by Stefan Gustavson
//
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}

float layeredPerlin(vec3 P) {
  float sum = 0.0f;

  sum += 0.5f * cnoise(P);
  sum += 0.25f * cnoise(2.0f * P);
  sum += 0.125f * cnoise(4.0f * P);
  sum += 0.075f * cnoise(8.0f * P);
  //add more

  return sum;
}

// End of Perlin Noise Code

void main() {
  //Normal = normalize(normalMatrix * normal);
  //Position = position;
  //vUv = uv;

  //Perlin Displacement
  vDisplacement = layeredPerlin(position);
  vec3 newPosition = position + normal * (u_intensity * vDisplacement + u_raise);

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;function d(e){let t=(0,l.useRef)(null),r=(0,l.useMemo)(()=>({u_intensity:{value:.3},u_raise:{value:0},u_colorBase:{value:new c.Color("#000000")},u_colorBeach:{value:new c.Color("#000000")},u_colorMid:{value:new c.Color("#000000")},u_colorPeak:{value:new c.Color("#000000")}}),[]),[n,a]=(0,l.useState)(!1);return r.u_colorBase.value=e.colorBase,r.u_colorBeach.value=e.colorBeach,r.u_colorMid.value=e.colorMid,r.u_colorPeak.value=e.colorPeak,(0,s.x)((a,o)=>{let i=t.current;if(!i)return;let{clock:s}=a;i.rotation.y+=.1*e.spinSpeed*o,r.u_intensity.value=c.MathUtils.lerp(r.u_intensity.value,n?1:.3,.02),r.u_raise.value=c.MathUtils.lerp(r.u_raise.value,n?1:0,.02)}),(0,o.jsxs)("mesh",{ref:t,...e,onClick:t=>window.location.href=e.href,onPointerOver:()=>{a(!0),document.body.style.cursor="pointer",e.tooltip&&e.setTooltipName(e.tooltip)},onPointerOut:()=>{a(!1),document.body.style.cursor="auto",e.setTooltipName("")},children:[o.jsx("icosahedronGeometry",{args:[2,30]}),o.jsx("shaderMaterial",{uniforms:r,fragmentShader:u,vertexShader:f}),e.children]})}let h=`
//varying vec3 Normal;
//varying vec3 Position;
//varying vec2 vUv;
varying float vDisplacement;

//uniform float u_time;
uniform vec3 u_colorPeak;
uniform vec3 u_colorMid;
uniform vec3 u_colorBeach;
uniform vec3 u_colorBase;

void main() {
  vec3 color = u_colorBase;

  if (vDisplacement > 0.2f) {
    color = u_colorPeak;
  }
  else if (vDisplacement > 0.05f) {
    color = u_colorMid;
  }
  else if (vDisplacement > 0.0001f) {
    color = u_colorBeach;
  }

  gl_FragColor = vec4(color,1.0);
}
`,p=`
//varying vec3 Normal;
//varying vec3 Position;
//varying vec2 vUv;
varying float vDisplacement;

uniform float u_time;
uniform float u_intensity;
uniform float u_raise;
uniform vec3 randomFactors;

// Classic Perlin 3D Noise 
// by Stefan Gustavson
//
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}

float layeredPerlin(vec3 P) {
  float sum = 0.0f;

  sum += 0.5f * cnoise(P + 0.2 * u_time);
  sum += 0.25f * cnoise(4.0f * sum * P);
  sum += 0.125f * cnoise(16.0f * sum * P);
  sum += 0.075f * cnoise(64.0f * sum * P);
  //add more

  return sum;
}

// End of Perlin Noise Code

void main() {
  //Normal = normalize(normalMatrix * normal);
  //Position = position;
  //vUv = uv;

  //Perlin Displacement
  vDisplacement = layeredPerlin(position);
  //vec3 newPosition = position + normal * (u_intensity * vDisplacement + u_raise);
  vec3 newPosition = position + normal * (u_raise);

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;function v(e){let t=(0,l.useRef)(null),r=(0,l.useMemo)(()=>({u_time:{value:0},u_intensity:{value:.05},u_raise:{value:0},randomFactors:{value:new c.Vector3(1,1,1)},u_colorBase:{value:new c.Color("#000000")},u_colorBeach:{value:new c.Color("#000000")},u_colorMid:{value:new c.Color("#000000")},u_colorPeak:{value:new c.Color("#000000")}}),[]),[n,a]=(0,l.useState)(!1);return r.u_colorBase.value=e.colorBase,r.u_colorBeach.value=e.colorBeach,r.u_colorMid.value=e.colorMid,r.u_colorPeak.value=e.colorPeak,(0,s.x)((a,o)=>{let i=t.current;if(!i)return;let{clock:s}=a;r.u_time.value=.2*s.getElapsedTime(),i.rotation.y+=.1*e.spinSpeed*o,r.u_raise.value=c.MathUtils.lerp(r.u_raise.value,n?1:0,.02)}),(0,o.jsxs)("mesh",{ref:t,...e,onClick:t=>window.location.href=e.href,onPointerOver:()=>{a(!0),document.body.style.cursor="pointer",e.tooltip&&e.setTooltipName(e.tooltip)},onPointerOut:()=>{a(!1),document.body.style.cursor="auto",e.setTooltipName("")},children:[o.jsx("icosahedronGeometry",{args:[2,30]}),o.jsx("shaderMaterial",{uniforms:r,fragmentShader:h,vertexShader:p}),e.children]})}let g=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function m(e,t){let r=(0,s.w)(e=>e.gl),n=(0,s.z)(c.TextureLoader,g(e)?Object.values(e):e);if((0,l.useLayoutEffect)(()=>{null==t||t(n)},[t]),(0,l.useEffect)(()=>{(Array.isArray(n)?n:[n]).forEach(r.initTexture)},[r,n]),!g(e))return n;{let t=Object.keys(e),r={};return t.forEach(e=>Object.assign(r,{[e]:n[t.indexOf(e)]})),r}}m.preload=e=>s.z.preload(c.TextureLoader,e),m.clear=e=>s.z.clear(c.TextureLoader,e);let y=`
//varying vec3 Normal;
//varying vec3 Position;
varying vec2 vUv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_camPos;
uniform mat4 u_camRot;
uniform sampler2D u_noiseTex;

const float _voidCutoff = 0.04;
const float _sphereRadius = 0.2;
const float _innerDiscRadius = 0.201;
const float _outerDiscRadius = 1.0;
const float _lightBending = 0.05;

const float _dopplerEffect = 66.0;
const float _hueShift = -0.03;

#define MAX_STEPS 100
#define MAX_DIST 100.0
#define SURFACE_DIST 0.0001

//distance function for a sphere at world center
float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float sdPlane(vec3 p, float height) {
    return p.y - height;
}

float sdInfCylinder(vec3 p, float radius) {
    return length(vec2(p.x, p.z)) - radius;
}

// vertical cylinder
float sdCylinder(vec3 p, float height, float radius) {
    vec2 dist = abs(vec2(length(p.xz), p.y)) - vec2(radius, height);
    return min(max(dist.x, dist.y), 0.0) + length(max(dist, 0.0));
}

// vertical cylinder
float sdRing(vec3 p, float height, float radius, float thickness) {
    vec2 dist = vec2(abs(abs(length(p.xz)) - radius) - thickness, abs(p.y) - height);
    return min(max(dist.x, dist.y), 0.0) + length(max(dist, 0.0));
}

float remap(float v, float minOld, float maxOld, float minNew, float maxNew) {
    return minNew + (v - minOld) * (maxNew - minNew) / (maxOld - minOld);
}
                
// Based upon Unity's shadergraph library functions
vec3 RotateAboutAxis(vec3 In, vec3 Axis, float Rotation)
{
    float s = sin(Rotation);
    float c = cos(Rotation);
    float one_minus_c = 1.0 - c;
    
    Axis = normalize(Axis);
    mat4 rot_mat = mat4(   
        one_minus_c * Axis.x * Axis.x + c, one_minus_c * Axis.x * Axis.y - Axis.z * s, one_minus_c * Axis.z * Axis.x + Axis.y * s, 0.0,
        one_minus_c * Axis.x * Axis.y + Axis.z * s, one_minus_c * Axis.y * Axis.y + c, one_minus_c * Axis.y * Axis.z - Axis.x * s, 0.0,
        one_minus_c * Axis.z * Axis.x - Axis.y * s, one_minus_c * Axis.y * Axis.z + Axis.x * s, one_minus_c * Axis.z * Axis.z + c, 0.0,
        0.0,                                        0.0,                                        0.0,                               1.0
    );
    return (rot_mat * vec4(In, 1.0)).xyz;
}
 
vec3 LinearToGammaSpace (vec3 linRGB)
{
    linRGB = max(linRGB, vec3(0.f, 0.f, 0.f));
    // An almost-perfect approximation from http://chilliant.blogspot.com.au/2012/08/srgb-approximations-for-hlsl.html?m=1
    return max(1.055 * pow(linRGB, vec3(0.416666667)) - vec3(0.055), 0.f);
}

vec3 GammaToLinearSpace (vec3 sRGB)
{
    // Approximate version from http://chilliant.blogspot.com.au/2012/08/srgb-approximations-for-hlsl.html?m=1
    return sRGB * (sRGB * (sRGB * 0.305306011f + 0.682171111f) + 0.012522878f);
}

vec3 hdrIntensity(vec3 emissiveColor, float intensity)
{
    // apply intensity exposure
    emissiveColor.xyz *= pow(2.0, intensity);
    
    return emissiveColor;
}
    
// Based upon Unity's shadergraph library functions
vec3 RGBToHSV(vec3 rgb)
{
    // Hue: red = 0/6, yellow = 1/6, green = 2/6,
    //      cyan = 3/6, blue = 4/6, magenta = 5/6
    vec3 hsv;
    float cmax = max(rgb.r, max(rgb.g, rgb.b));
    float cmin = min(rgb.r, min(rgb.g, rgb.b));
    
    hsv.z = cmax; // value

    float chroma = cmax - cmin;
    //if(chroma != 0.0)
    {
        hsv.y = chroma / cmax; // saturation

        //if(cmax == rgb.r)
        if(rgb.r > rgb.g && rgb.r > rgb.b)
        {
            hsv.x = (0.0 + (rgb.g - rgb.b) / chroma) / 6.0; // hue
        }
        //else if(cmax == rgb.m_Green)
        else if(rgb.g > rgb.b)
        {
            hsv.x = (2.0 + (rgb.b - rgb.r) / chroma) / 6.0; // hue
        }
        else
        {
            hsv.x = (4.0 + (rgb.r - rgb.g) / chroma) / 6.0; // hue
        }

        // Make sure hue is in range [0..1]
        hsv.x = fract(hsv.x);
    }
    //else
    //{
    //    hsv.x = 0.0; // rnd();
    //}
    return hsv;
}
    
// Based upon Unity's shadergraph library functions
vec3 HSVToRGB(vec3 c){
	vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
	return c.z * mix(K.xxx, saturate(abs(fract(c.x + K.xyz) * 6.0 - K.w) - K.x), c.y);
}

vec3 discColor(float r, float radius)
{
    vec3 newColor = vec3(1.0, 0.55, 0.0);
    
    // Distance intensity fall-off
    float intensity = remap(r, _innerDiscRadius, _outerDiscRadius, 0.5, -1.2);
    intensity *= abs(intensity);
    
    // Doppler beaming intensity change
    vec3 rotatePos = RotateAboutAxis(vec3(0.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0), 0.01);
    float dopplerDistance = (length(rotatePos - u_camPos) - length(vec3(0.0, 0.0, 0.0) - u_camPos)) / radius;
    intensity += dopplerDistance * 2.0 * _dopplerEffect;
        
    newColor = hdrIntensity(newColor, 1.0 * intensity);
    
    // Distance hue shift
    vec3 hueColor = RGBToHSV(newColor);
    float hueShift = saturate(remap(r, _innerDiscRadius, _outerDiscRadius, 0.0, 1.0));
    hueColor.r += hueShift * _hueShift;
    newColor = HSVToRGB(hueColor);
    
    return newColor;
}

// create a uv mapping for a flat disc
vec2 diskUV(vec3 p, float outerDiskRadius, float innerDiskRadius) {
    vec2 p2D = vec2(p.x, p.z);
    float y = dot(vec2(0, 1), p2D);
    float x = dot(vec2(1, 0), p2D);

    float phi = 0.5 * (atan(y, x) / 3.1415927) + 0.5;
    float r = remap(length(p2D), innerDiskRadius, outerDiskRadius, 0.0, 1.0);

    phi = mod(phi - 0.2 * u_time, 1.0);
    //r = mod(r + 0.01 * u_time, 1.0);

    //seam when y flips pos to neg

    //bandaging the seam creates more seams
    //if(abs(y) < 0.01) phi = 1.0;

    return vec2(r, phi);
}

//minimum of distances to all objects in scene
float scene(vec3 p) {
  //float plane = p.y + 1.0;
  float sphere = sdSphere(p, _sphereRadius); //0.17
  float disk = sdRing(p, 0.001, (_outerDiscRadius + _innerDiscRadius) / 2.0, (_outerDiscRadius - _innerDiscRadius) / 2.0);

  float distance = min(sphere, disk);
  return distance;
}

//ray origin ro, ray direction rd
float raymarch(vec3 ro, vec3 rd) {
  float dO = 0.0;
  float dS = 0.0;
  vec3 p = ro;
  vec3 color = vec3(0.0);

  for(int i = 0; i < MAX_STEPS; i++) {
    p += rd * dS;
    dS = scene(p);

    dO += dS;
    
    vec3 dirToCentre = normalize(-1.0 * p);
    float dstToCentre = length(p);
    float force = _lightBending / (dstToCentre*dstToCentre);
    rd = normalize(rd + dirToCentre * force * dS);

    if(dO > MAX_DIST || dS < SURFACE_DIST) {
        break;
    }
  }
  return dO;
}

void main() {
  //centered screen space uv
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  //uv.y *= u_resolution.y / u_resolution.x;

  //uv issue was solved (u_res is the whole website window, not just the canvas)
  //panning issue still not solved, postponed for now

  // Ray Origin - camera
  vec3 ro = u_camPos;

  // Ray Direction
  vec3 rd = (vec4(normalize(vec3(0.24 *uv, -1.0)), 1.0) * u_camRot).xyz;
  // Raymarching
  float d = raymarch(ro, rd);
  vec3 p = ro + rd * d;

  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

  if(d<MAX_DIST) {
    if(length(p) < _sphereRadius + _voidCutoff) {
      color = vec4(0.0, 0.0, 0.0, 1.0);
    }
    else {
      vec2 dUV = diskUV(p, _outerDiscRadius + 0.01, _innerDiscRadius - 0.1);
      float distPercent = 1.0 - dUV.x;
      float noise = texelFetch(u_noiseTex, ivec2(vec2(mod(dUV.x + 0.01 * u_time, 1.0), dUV.y) * vec2(256.0, 256.0)), 0).r;
      float blowOut = 5.0 * pow(noise, 5.0)*distPercent*distPercent*distPercent;

      color = vec4(discColor(dUV.x, 1.0) + blowOut, noise * min(2.0*distPercent, 1.0));
    }
  }

  gl_FragColor = color;
}
`,x=`
//varying vec3 Normal;
//varying vec3 Position;
varying vec2 vUv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_camPos;
uniform mat4 u_camRot;

void main() {
  //Normal = normalize(normalMatrix * normal);
  //Position = position;

  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;function b(e){let t=(0,l.useRef)(null),r=(0,s.w)(e=>e.camera),[n]=m(["Textures/noiseTexture.png"]),a=(0,l.useMemo)(()=>({u_time:{value:0},u_resolution:{value:new c.Vector2(0,0)},u_camPos:{value:new c.Vector3(0,5,5)},u_camRot:{value:new c.Matrix4},u_noiseTex:{type:"t",value:n}}),[n]);return(0,s.x)(e=>{if(!t.current)return;let{clock:n}=e;a.u_time.value=n.getElapsedTime(),a.u_resolution.value=new c.Vector2(1*window.innerWidth,1*window.innerHeight),a.u_camPos.value=r.position,a.u_camRot.value=r.matrixWorldInverse}),(0,o.jsxs)("mesh",{ref:t,...e,children:[o.jsx("icosahedronGeometry",{args:[3,30]}),o.jsx("shaderMaterial",{uniforms:a,fragmentShader:y,vertexShader:x,transparent:!0,side:c.DoubleSide}),e.children]})}function _(e){let t=(0,l.useRef)(null);return(0,s.x)(()=>{let r=t.current;r&&(r.rotation.y+=.1*e.spinSpeed)}),o.jsx("mesh",{ref:t,...e,children:e.children})}var w=r(5353);function S(){var e,t=0,r=[],n=0,a=0,o=d(function(e){a||s(1,e)}),i=d(function(e){a||s(-1,e)});function s(r,n){a++;var o=0;try{n===v&&h();var i=r>0&&f(n);i?i.call(n,d(function(e){o++,s(1,e)}),d(function(e){o++,s(-1,e)})):(t=r,e=n,l())}catch(e){t||o||s(-1,e)}}function l(){n||(setTimeout(c,0),n=1)}function c(){var e=r;n=0,r=[],e.forEach(u)}function u(e){e()}function f(e){var t=e&&(p(e)||"object"==typeof e)&&e.then;return p(t)&&t}function d(e){var t=0;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];t++||e.apply(this,r)}}function h(){throw TypeError("Chaining cycle detected")}var p=function(e){return"function"==typeof e},v={then:function(n,a){var o=S();return r.push(function(){var r=t>0?n:a;if(p(r))try{var i=r(e);i===o&&h();var s=f(i);s?s.call(i,o.resolve,o.reject):o.resolve(i)}catch(e){o.reject(e)}else o[t>0?"resolve":"reject"](e)}),t&&l(),o},resolve:o,reject:i};return v}function U(){var e,t,r=new Promise(function(r,n){e=r,t=n});return{then:r.then.bind(r),resolve:e,reject:t}}S.all=U.all=function(e){var t=0,r=[],n=T();return 0===e.length?n.resolve([]):e.forEach(function(a,o){var i=T();i.resolve(a),i.then(function(a){t++,r[o]=a,t===e.length&&n.resolve(r)},n.reject)}),n};var T="function"==typeof Promise?U:S;function P(){var e=Object.create(null);function t(e,t){var r=void 0;self.troikaDefine=function(e){return r=e};var n=URL.createObjectURL(new Blob(["/** "+e.replace(/\*/g,"")+" **/\n\ntroikaDefine(\n"+t+"\n)"],{type:"application/javascript"}));try{importScripts(n)}catch(e){console.error(e)}return URL.revokeObjectURL(n),delete self.troikaDefine,r}self.addEventListener("message",function(r){var n=r.data,a=n.messageId,o=n.action,i=n.data;try{"registerModule"===o&&function r(n,a){var o=n.id,i=n.name,s=n.dependencies;void 0===s&&(s=[]);var l=n.init;void 0===l&&(l=function(){});var c=n.getTransferables;if(void 0===c&&(c=null),!e[o])try{s=s.map(function(t){return t&&t.isWorkerModule&&(r(t,function(e){if(e instanceof Error)throw e}),t=e[t.id].value),t}),l=t("<"+i+">.init",l),c&&(c=t("<"+i+">.getTransferables",c));var u=null;"function"==typeof l?u=l.apply(void 0,s):console.error("worker module init function failed to rehydrate"),e[o]={id:o,value:u,getTransferables:c},a(u)}catch(e){e&&e.noLog||console.error(e),a(e)}}(i,function(e){e instanceof Error?postMessage({messageId:a,success:!1,error:e.message}):postMessage({messageId:a,success:!0,result:{isCallable:"function"==typeof e}})}),"callModule"===o&&function(t,r){var n,a=t.id,o=t.args;e[a]&&"function"==typeof e[a].value||r(Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var i=(n=e[a]).value.apply(n,o);i&&"function"==typeof i.then?i.then(s,function(e){return r(e instanceof Error?e:Error(""+e))}):s(i)}catch(e){r(e)}function s(t){try{var n=e[a].getTransferables&&e[a].getTransferables(t);n&&Array.isArray(n)&&n.length||(n=void 0),r(t,n)}catch(e){console.error(e),r(e)}}}(i,function(e,t){e instanceof Error?postMessage({messageId:a,success:!1,error:e.message}):postMessage({messageId:a,success:!0,result:e},t||void 0)})}catch(e){postMessage({messageId:a,success:!1,error:e.stack})}})}var k=function(){var e=!1;if("undefined"!=typeof window&&void 0!==window.document)try{new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"}))).terminate(),e=!0}catch(e){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+e.message+"]")}return k=function(){return e},e},C=0,E=0,A=!1,D=Object.create(null),M=Object.create(null),F=Object.create(null);function R(e){if((!e||"function"!=typeof e.init)&&!A)throw Error("requires `options.init` function");var t,r=e.dependencies,n=e.init,a=e.getTransferables,o=e.workerId;if(!k())return(t=function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r];return t._getInitResult().then(function(t){if("function"==typeof t)return t.apply(void 0,e);throw Error("Worker module function was called but `init` did not return a callable function")})})._getInitResult=function(){var r=e.dependencies,n=e.init;r=Array.isArray(r)?r.map(function(e){return e&&e._getInitResult?e._getInitResult():e}):[];var a=T.all(r).then(function(e){return n.apply(null,e)});return t._getInitResult=function(){return a},a},t;null==o&&(o="#default");var i="workerModule"+ ++C,s=e.name||i,l=null;function c(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];if(!l){l=I(o,"registerModule",c.workerModuleData);var r=function(){l=null,M[o].delete(r)};(M[o]||(M[o]=new Set)).add(r)}return l.then(function(t){if(t.isCallable)return I(o,"callModule",{id:i,args:e});throw Error("Worker module function was called but `init` did not return a callable function")})}return r=r&&r.map(function(e){return"function"!=typeof e||e.workerModuleData||(A=!0,e=R({workerId:o,name:"<"+s+"> function dependency: "+e.name,init:"function(){return (\n"+O(e)+"\n)}"}),A=!1),e&&e.workerModuleData&&(e=e.workerModuleData),e}),c.workerModuleData={isWorkerModule:!0,id:i,name:s,dependencies:r,init:O(n),getTransferables:a&&O(a)},c}function O(e){var t=e.toString();return!/^function/.test(t)&&/^\w+\s*\(/.test(t)&&(t="function "+t),t}function I(e,t,r){var n=T(),a=++E;return F[a]=function(e){e.success?n.resolve(e.result):n.reject(Error("Error in worker "+t+" call: "+e.error))},(function(e){var t=D[e];if(!t){var r=O(P);(t=D[e]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+e.replace(/\*/g,"")+" **/\n\n;("+r+")()"],{type:"application/javascript"})))).onmessage=function(e){var t=e.data,r=t.messageId,n=F[r];if(!n)throw Error("WorkerModule response with empty or unknown messageId");delete F[r],n(t)}}return t})(e).postMessage({messageId:a,action:t,data:r}),n}var B=R({name:"Thenable",dependencies:[T],init:function(e){return e}});function z(){return function(e){function t(e,t){for(var r,n,a,o,i,s=/([MLQCZ])([^MLQCZ]*)/g;r=s.exec(e);){var l=r[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(e){return parseFloat(e)});switch(r[1]){case"M":o=n=l[0],i=a=l[1];break;case"L":(l[0]!==o||l[1]!==i)&&t("L",o,i,o=l[0],i=l[1]);break;case"Q":t("Q",o,i,o=l[2],i=l[3],l[0],l[1]);break;case"C":t("C",o,i,o=l[4],i=l[5],l[0],l[1],l[2],l[3]);break;case"Z":(o!==n||i!==a)&&t("L",o,i,n,a)}}}function r(e,r,n){void 0===n&&(n=16);var a={x:0,y:0};t(e,function(e,t,o,i,s,l,c,u,f){switch(e){case"L":r(t,o,i,s);break;case"Q":for(var d=t,h=o,p=1;p<n;p++)(function(e,t,r,n,a,o,i,s){var l=1-i;s.x=l*l*e+2*l*i*r+i*i*a,s.y=l*l*t+2*l*i*n+i*i*o})(t,o,l,c,i,s,p/(n-1),a),r(d,h,a.x,a.y),d=a.x,h=a.y;break;case"C":for(var v=t,g=o,m=1;m<n;m++)(function(e,t,r,n,a,o,i,s,l,c){var u=1-l;c.x=u*u*u*e+3*u*u*l*r+3*u*l*l*a+l*l*l*i,c.y=u*u*u*t+3*u*u*l*n+3*u*l*l*o+l*l*l*s})(t,o,l,c,u,f,i,s,m/(n-1),a),r(v,g,a.x,a.y),v=a.x,g=a.y}})}var n="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a=new WeakMap,o={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function i(e,t){var r=e.getContext?e.getContext("webgl",o):e,n=a.get(r);if(!n){var i="undefined"!=typeof WebGL2RenderingContext&&r instanceof WebGL2RenderingContext,s={},l={},c={},u=-1,f=[];function d(e){var t=s[e];if(!t&&!(t=s[e]=r.getExtension(e)))throw Error(e+" not supported");return t}function h(e,t){var n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}function p(){s={},l={},c={},u=-1,f.length=0}r.canvas.addEventListener("webglcontextlost",function(e){p(),e.preventDefault()},!1),a.set(r,n={gl:r,isWebGL2:i,getExtension:d,withProgram:function(e,t,n,a){if(!l[e]){var o={},s={},c=r.createProgram();r.attachShader(c,h(t,r.VERTEX_SHADER)),r.attachShader(c,h(n,r.FRAGMENT_SHADER)),r.linkProgram(c),l[e]={program:c,transaction:function(e){r.useProgram(c),e({setUniform:function(e,t){for(var n=[],a=arguments.length-2;a-- >0;)n[a]=arguments[a+2];var o=s[t]||(s[t]=r.getUniformLocation(c,t));r["uniform"+e].apply(r,[o].concat(n))},setAttribute:function(e,t,n,a,s){var l=o[e];l||(l=o[e]={buf:r.createBuffer(),loc:r.getAttribLocation(c,e),data:null}),r.bindBuffer(r.ARRAY_BUFFER,l.buf),r.vertexAttribPointer(l.loc,t,r.FLOAT,!1,0,0),r.enableVertexAttribArray(l.loc),i?r.vertexAttribDivisor(l.loc,a):d("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(l.loc,a),s!==l.data&&(r.bufferData(r.ARRAY_BUFFER,s,n),l.data=s)}})}}}l[e].transaction(a)},withTexture:function(e,t){u++;try{r.activeTexture(r.TEXTURE0+u);var n=c[e];n||(n=c[e]=r.createTexture(),r.bindTexture(r.TEXTURE_2D,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST)),r.bindTexture(r.TEXTURE_2D,n),t(n,u)}finally{u--}},withTextureFramebuffer:function(e,t,n){var a=r.createFramebuffer();f.push(a),r.bindFramebuffer(r.FRAMEBUFFER,a),r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0);try{n(a)}finally{r.deleteFramebuffer(a),r.bindFramebuffer(r.FRAMEBUFFER,f[--f.length-1]||null)}},handleContextLoss:p})}t(n)}function s(e,t,r,a,o,s,l,c){void 0===l&&(l=15),void 0===c&&(c=null),i(e,function(e){var i=e.gl,u=e.withProgram;(0,e.withTexture)("copy",function(e,f){i.texImage2D(i.TEXTURE_2D,0,i.RGBA,o,s,0,i.RGBA,i.UNSIGNED_BYTE,t),u("copy",n,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",function(e){var t=e.setUniform;(0,e.setAttribute)("aUV",2,i.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),t("1i","image",f),i.bindFramebuffer(i.FRAMEBUFFER,c||null),i.disable(i.BLEND),i.colorMask(8&l,4&l,2&l,1&l),i.viewport(r,a,o,s),i.scissor(r,a,o,s),i.drawArrays(i.TRIANGLES,0,3)})})})}var l=Object.freeze({__proto__:null,withWebGLContext:i,renderImageData:s,resizeWebGLCanvasWithoutClearing:function(e,t,r){var n=e.width,a=e.height;i(e,function(o){var i=o.gl,l=new Uint8Array(n*a*4);i.readPixels(0,0,n,a,i.RGBA,i.UNSIGNED_BYTE,l),e.width=t,e.height=r,s(i,l,0,0,n,a)})}});function c(e,t,n,a,o,i){void 0===i&&(i=1);var s=new Uint8Array(e*t),l=a[2]-a[0],c=a[3]-a[1],u=[];r(n,function(e,t,r,n){u.push({x1:e,y1:t,x2:r,y2:n,minX:Math.min(e,r),minY:Math.min(t,n),maxX:Math.max(e,r),maxY:Math.max(t,n)})}),u.sort(function(e,t){return e.maxX-t.maxX});for(var f=0;f<e;f++)for(var d=0;d<t;d++){var h=function(e,t){for(var r=1/0,n=1/0,a=u.length;a--;){var o=u[a];if(o.maxX+n<=e)break;if(e+n>o.minX&&t-n<o.maxY&&t+n>o.minY){var i=function(e,t,r,n,a,o){var i=a-r,s=o-n,l=i*i+s*s,c=l?Math.max(0,Math.min(1,((e-r)*i+(t-n)*s)/l)):0,u=e-(r+c*i),f=t-(n+c*s);return u*u+f*f}(e,t,o.x1,o.y1,o.x2,o.y2);i<r&&(n=Math.sqrt(r=i))}}return function(e,t){for(var r=0,n=u.length;n--;){var a=u[n];if(a.maxX<=e)break;a.y1>t!=a.y2>t&&e<(a.x2-a.x1)*(t-a.y1)/(a.y2-a.y1)+a.x1&&(r+=a.y1<a.y2?1:-1)}return 0!==r}(e,t)&&(n=-n),n}(a[0]+l*(f+.5)/e,a[1]+c*(d+.5)/t),p=Math.pow(1-Math.abs(h)/o,i)/2;h<0&&(p=1-p),p=Math.max(0,Math.min(255,Math.round(255*p))),s[d*e+f]=p}return s}function u(e,t,r,n,a,o,i,s,l,c){void 0===o&&(o=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0),f(e,t,r,n,a,o,i,null,s,l,c)}function f(e,t,r,n,a,o,i,l,u,f,d){void 0===o&&(o=1),void 0===u&&(u=0),void 0===f&&(f=0),void 0===d&&(d=0);for(var h=c(e,t,r,n,a,o),p=new Uint8Array(4*h.length),v=0;v<h.length;v++)p[4*v+d]=h[v];s(i,p,u,f,e,t,1<<3-d,l)}var d=Object.freeze({__proto__:null,generate:c,generateIntoCanvas:u,generateIntoFramebuffer:f}),h=new Float32Array([0,0,2,0,0,2]),p=null,v=!1,g={},m=new WeakMap;function y(e){if(!v&&!w(e))throw Error("WebGL generation not supported")}function x(e,t,r,n,a,o,s){if(void 0===o&&(o=1),void 0===s&&(s=null),!s&&!(s=p)){var l="function"==typeof OffscreenCanvas?new OffscreenCanvas(1,1):"undefined"!=typeof document?document.createElement("canvas"):null;if(!l)throw Error("OffscreenCanvas or DOM canvas not supported");s=p=l.getContext("webgl",{depth:!1})}y(s);var c=new Uint8Array(e*t*4);i(s,function(i){var s=i.gl,l=i.withTexture,u=i.withTextureFramebuffer;l("readable",function(i,l){s.texImage2D(s.TEXTURE_2D,0,s.RGBA,e,t,0,s.RGBA,s.UNSIGNED_BYTE,null),u(i,l,function(i){_(e,t,r,n,a,o,s,i,0,0,0),s.readPixels(0,0,e,t,s.RGBA,s.UNSIGNED_BYTE,c)})})});for(var u=new Uint8Array(e*t),f=0,d=0;f<c.length;f+=4)u[d++]=c[f];return u}function b(e,t,r,n,a,o,i,s,l,c){void 0===o&&(o=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0),_(e,t,r,n,a,o,i,null,s,l,c)}function _(e,t,a,o,s,l,c,u,f,d,p){void 0===l&&(l=1),void 0===f&&(f=0),void 0===d&&(d=0),void 0===p&&(p=0),y(c);var v=[];r(a,function(e,t,r,n){v.push(e,t,r,n)}),v=new Float32Array(v),i(c,function(r){var a=r.gl,i=r.isWebGL2,c=r.getExtension,g=r.withProgram,m=r.withTexture,y=r.withTextureFramebuffer,x=r.handleContextLoss;if(m("rawDistances",function(r,m){(e!==r._lastWidth||t!==r._lastHeight)&&a.texImage2D(a.TEXTURE_2D,0,a.RGBA,r._lastWidth=e,r._lastHeight=t,0,a.RGBA,a.UNSIGNED_BYTE,null),g("main","precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}","precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",function(n){var u=n.setAttribute,f=n.setUniform,d=!i&&c("ANGLE_instanced_arrays"),p=!i&&c("EXT_blend_minmax");u("aUV",2,a.STATIC_DRAW,0,h),u("aLineSegment",4,a.DYNAMIC_DRAW,1,v),f.apply(void 0,["4f","uGlyphBounds"].concat(o)),f("1f","uMaxDistance",s),f("1f","uExponent",l),y(r,m,function(r){a.enable(a.BLEND),a.colorMask(!0,!0,!0,!0),a.viewport(0,0,e,t),a.scissor(0,0,e,t),a.blendFunc(a.ONE,a.ONE),a.blendEquationSeparate(a.FUNC_ADD,i?a.MAX:p.MAX_EXT),a.clear(a.COLOR_BUFFER_BIT),i?a.drawArraysInstanced(a.TRIANGLES,0,3,v.length/4):d.drawArraysInstancedANGLE(a.TRIANGLES,0,3,v.length/4)})}),g("post",n,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",function(r){r.setAttribute("aUV",2,a.STATIC_DRAW,0,h),r.setUniform("1i","tex",m),a.bindFramebuffer(a.FRAMEBUFFER,u),a.disable(a.BLEND),a.colorMask(0===p,1===p,2===p,3===p),a.viewport(f,d,e,t),a.scissor(f,d,e,t),a.drawArrays(a.TRIANGLES,0,3)})}),a.isContextLost())throw x(),Error("webgl context lost")})}function w(e){var t=e&&e!==p?e.canvas||e:g,r=m.get(t);if(void 0===r){v=!0;var n=null;try{var a=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],o=x(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,e);(r=o&&a.length===o.length&&o.every(function(e,t){return e===a[t]}))||(n="bad trial run results",console.info(a,o))}catch(e){r=!1,n=e.message}n&&console.warn("WebGL SDF generation not supported:",n),v=!1,m.set(t,r)}return r}var S=Object.freeze({__proto__:null,generate:x,generateIntoCanvas:b,generateIntoFramebuffer:_,isSupported:w});return e.forEachPathCommand=t,e.generate=function(e,t,r,n,a,o){void 0===a&&(a=Math.max(n[2]-n[0],n[3]-n[1])/2),void 0===o&&(o=1);try{return x.apply(S,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),c.apply(d,arguments)}},e.generateIntoCanvas=function(e,t,r,n,a,o,i,s,l,c){void 0===a&&(a=Math.max(n[2]-n[0],n[3]-n[1])/2),void 0===o&&(o=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0);try{return b.apply(S,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),u.apply(d,arguments)}},e.javascript=d,e.pathToLineSegments=r,e.webgl=S,e.webglUtils=l,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}let j=/\bvoid\s+main\s*\(\s*\)\s*{/g;function L(e){return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(e,t){let r=c.ShaderChunk[t];return r?L(r):e})}let G=[];for(let e=0;e<256;e++)G[e]=(e<16?"0":"")+e.toString(16);let N=Object.assign||function(){let e=arguments[0];for(let t=1,r=arguments.length;t<r;t++){let r=arguments[t];if(r)for(let t in r)r.hasOwnProperty(t)&&(e[t]=r[t])}return e},V=Date.now(),W=new WeakMap,X=new Map,q=1e10;function H(e,t,r,n,a){return(n||a||r)&&(e=e.replace(j,`
${r}
void troikaOrigMain${t}() {`)+`
void main() {
  ${n}
  troikaOrigMain${t}();
  ${a}
}`),e}function Y(e,t){return"uniforms"===e?void 0:"function"==typeof t?t.toString():t}let $=0,Z=new Map;c.DoubleSide;let K=()=>(self.performance||Date).now(),Q=z(),J=function(){let e=[],t=0;function r(){let n=K();for(;e.length&&K()-n<5;)e.shift()();t=e.length?setTimeout(r,0):0}return(...n)=>{let a=T();return e.push(()=>{let e=K();try{Q.webgl.generateIntoCanvas(...n),a.resolve({timing:K()-e})}catch(e){a.reject(e)}}),t||(t=setTimeout(r,0)),a}}(),ee=function(){let e={},t=0;return function(r,n,a,o,i,s,l,c,u,f){let d="TroikaTextSDFGenerator_JS_"+t++%4,h=e[d];return h||(h=e[d]={workerModule:R({name:d,workerId:d,dependencies:[z,K],init(e,t){let r=e().javascript.generate;return function(...e){let n=t();return{textureData:r(...e),timing:t()-n}}},getTransferables:e=>[e.textureData.buffer]}),requests:0,idleTimer:null}),h.requests++,clearTimeout(h.idleTimer),h.workerModule(r,n,a,o,i,s).then(({textureData:e,timing:t})=>{let a=K(),o=new Uint8Array(4*e.length);for(let t=0;t<e.length;t++)o[4*t+f]=e[t];return Q.webglUtils.renderImageData(l,o,c,u,r,n,1<<3-f),t+=K()-a,0==--h.requests&&(h.idleTimer=setTimeout(()=>{M[d]&&M[d].forEach(function(e){e()}),D[d]&&(D[d].terminate(),delete D[d])},2e3)),{timing:t}})}}(),et=Q.webglUtils.resizeWebGLCanvasWithoutClearing,er=R({name:"Typr Font Parser",dependencies:[/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function(){var e,t,r;return"undefined"==typeof window&&(self.window=self),(e={},(t={parse:function(e){var r=t._bin,n=new Uint8Array(e);if("ttcf"==r.readASCII(n,0,4)){var a=4;r.readUshort(n,a),a+=2,r.readUshort(n,a),a+=2;var o=r.readUint(n,a);a+=4;for(var i=[],s=0;s<o;s++){var l=r.readUint(n,a);a+=4,i.push(t._readFont(n,l))}return i}return[t._readFont(n,0)]},_readFont:function(e,r){var n=t._bin,a=r;n.readFixed(e,r),r+=4;var o=n.readUshort(e,r);r+=2,n.readUshort(e,r),r+=2,n.readUshort(e,r),r+=2,n.readUshort(e,r),r+=2;for(var i=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GPOS","GSUB","SVG "],s={_data:e,_offset:a},l={},c=0;c<o;c++){var u=n.readASCII(e,r,4);r+=4,n.readUint(e,r),r+=4;var f=n.readUint(e,r);r+=4;var d=n.readUint(e,r);r+=4,l[u]={offset:f,length:d}}for(c=0;c<i.length;c++){var h=i[c];l[h]&&(s[h.trim()]=t[h.trim()].parse(e,l[h].offset,l[h].length,s))}return s},_tabOffset:function(e,r,n){for(var a=t._bin,o=a.readUshort(e,n+4),i=n+12,s=0;s<o;s++){var l=a.readASCII(e,i,4);i+=4,a.readUint(e,i),i+=4;var c=a.readUint(e,i);if(i+=4,a.readUint(e,i),i+=4,l==r)return c}return 0}})._bin={readFixed:function(e,t){return(e[t]<<8|e[t+1])+(e[t+2]<<8|e[t+3])/65540},readF2dot14:function(e,r){return t._bin.readShort(e,r)/16384},readInt:function(e,r){return t._bin._view(e).getInt32(r)},readInt8:function(e,r){return t._bin._view(e).getInt8(r)},readShort:function(e,r){return t._bin._view(e).getInt16(r)},readUshort:function(e,r){return t._bin._view(e).getUint16(r)},readUshorts:function(e,r,n){for(var a=[],o=0;o<n;o++)a.push(t._bin.readUshort(e,r+2*o));return a},readUint:function(e,r){return t._bin._view(e).getUint32(r)},readUint64:function(e,r){return 4294967296*t._bin.readUint(e,r)+t._bin.readUint(e,r+4)},readASCII:function(e,t,r){for(var n="",a=0;a<r;a++)n+=String.fromCharCode(e[t+a]);return n},readUnicode:function(e,t,r){for(var n="",a=0;a<r;a++)n+=String.fromCharCode(e[t++]<<8|e[t++]);return n},_tdec:"undefined"!=typeof window&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(e,r,n){var a=t._bin._tdec;return a&&0==r&&n==e.length?a.decode(e):t._bin.readASCII(e,r,n)},readBytes:function(e,t,r){for(var n=[],a=0;a<r;a++)n.push(e[t+a]);return n},readASCIIArray:function(e,t,r){for(var n=[],a=0;a<r;a++)n.push(String.fromCharCode(e[t+a]));return n},_view:function(e){return e._dataView||(e._dataView=e.buffer?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(new Uint8Array(e).buffer))}},t._lctf={},t._lctf.parse=function(e,r,n,a,o){var i=t._bin,s={},l=r;i.readFixed(e,r),r+=4;var c=i.readUshort(e,r);r+=2;var u=i.readUshort(e,r);r+=2;var f=i.readUshort(e,r);return r+=2,s.scriptList=t._lctf.readScriptList(e,l+c),s.featureList=t._lctf.readFeatureList(e,l+u),s.lookupList=t._lctf.readLookupList(e,l+f,o),s},t._lctf.readLookupList=function(e,r,n){var a=t._bin,o=r,i=[],s=a.readUshort(e,r);r+=2;for(var l=0;l<s;l++){var c=a.readUshort(e,r);r+=2;var u=t._lctf.readLookupTable(e,o+c,n);i.push(u)}return i},t._lctf.readLookupTable=function(e,r,n){var a=t._bin,o=r,i={tabs:[]};i.ltype=a.readUshort(e,r),r+=2,i.flag=a.readUshort(e,r),r+=2;var s=a.readUshort(e,r);r+=2;for(var l=i.ltype,c=0;c<s;c++){var u=a.readUshort(e,r);r+=2;var f=n(e,l,o+u,i);i.tabs.push(f)}return i},t._lctf.numOfOnes=function(e){for(var t=0,r=0;r<32;r++)0!=(e>>>r&1)&&t++;return t},t._lctf.readClassDef=function(e,r){var n=t._bin,a=[],o=n.readUshort(e,r);if(r+=2,1==o){var i=n.readUshort(e,r);r+=2;var s=n.readUshort(e,r);r+=2;for(var l=0;l<s;l++)a.push(i+l),a.push(i+l),a.push(n.readUshort(e,r)),r+=2}if(2==o){var c=n.readUshort(e,r);for(r+=2,l=0;l<c;l++)a.push(n.readUshort(e,r)),r+=2,a.push(n.readUshort(e,r)),r+=2,a.push(n.readUshort(e,r)),r+=2}return a},t._lctf.getInterval=function(e,t){for(var r=0;r<e.length;r+=3){var n=e[r],a=e[r+1];if(e[r+2],n<=t&&t<=a)return r}return -1},t._lctf.readCoverage=function(e,r){var n=t._bin,a={};a.fmt=n.readUshort(e,r),r+=2;var o=n.readUshort(e,r);return r+=2,1==a.fmt&&(a.tab=n.readUshorts(e,r,o)),2==a.fmt&&(a.tab=n.readUshorts(e,r,3*o)),a},t._lctf.coverageIndex=function(e,r){var n=e.tab;if(1==e.fmt)return n.indexOf(r);if(2==e.fmt){var a=t._lctf.getInterval(n,r);if(-1!=a)return n[a+2]+(r-n[a])}return -1},t._lctf.readFeatureList=function(e,r){var n=t._bin,a=r,o=[],i=n.readUshort(e,r);r+=2;for(var s=0;s<i;s++){var l=n.readASCII(e,r,4);r+=4;var c=n.readUshort(e,r);r+=2;var u=t._lctf.readFeatureTable(e,a+c);u.tag=l.trim(),o.push(u)}return o},t._lctf.readFeatureTable=function(e,r){var n=t._bin,a=r,o={},i=n.readUshort(e,r);r+=2,i>0&&(o.featureParams=a+i);var s=n.readUshort(e,r);r+=2,o.tab=[];for(var l=0;l<s;l++)o.tab.push(n.readUshort(e,r+2*l));return o},t._lctf.readScriptList=function(e,r){var n=t._bin,a=r,o={},i=n.readUshort(e,r);r+=2;for(var s=0;s<i;s++){var l=n.readASCII(e,r,4);r+=4;var c=n.readUshort(e,r);r+=2,o[l.trim()]=t._lctf.readScriptTable(e,a+c)}return o},t._lctf.readScriptTable=function(e,r){var n=t._bin,a=r,o={},i=n.readUshort(e,r);r+=2,o.default=t._lctf.readLangSysTable(e,a+i);var s=n.readUshort(e,r);r+=2;for(var l=0;l<s;l++){var c=n.readASCII(e,r,4);r+=4;var u=n.readUshort(e,r);r+=2,o[c.trim()]=t._lctf.readLangSysTable(e,a+u)}return o},t._lctf.readLangSysTable=function(e,r){var n=t._bin,a={};n.readUshort(e,r),r+=2,a.reqFeature=n.readUshort(e,r),r+=2;var o=n.readUshort(e,r);return r+=2,a.features=n.readUshorts(e,r,o),a},t.CFF={},t.CFF.parse=function(e,r,n){var a=t._bin;(e=new Uint8Array(e.buffer,r,n))[r=0],e[++r],e[++r],e[++r],r++;var o=[];r=t.CFF.readIndex(e,r,o);for(var i=[],s=0;s<o.length-1;s++)i.push(a.readASCII(e,r+o[s],o[s+1]-o[s]));r+=o[o.length-1];var l=[];r=t.CFF.readIndex(e,r,l);var c=[];for(s=0;s<l.length-1;s++)c.push(t.CFF.readDict(e,r+l[s],r+l[s+1]));r+=l[l.length-1];var u=c[0],f=[];r=t.CFF.readIndex(e,r,f);var d=[];for(s=0;s<f.length-1;s++)d.push(a.readASCII(e,r+f[s],f[s+1]-f[s]));if(r+=f[f.length-1],t.CFF.readSubrs(e,r,u),u.CharStrings){r=u.CharStrings,f=[],r=t.CFF.readIndex(e,r,f);var h=[];for(s=0;s<f.length-1;s++)h.push(a.readBytes(e,r+f[s],f[s+1]-f[s]));u.CharStrings=h}if(u.ROS){r=u.FDArray;var p=[];for(r=t.CFF.readIndex(e,r,p),u.FDArray=[],s=0;s<p.length-1;s++){var v=t.CFF.readDict(e,r+p[s],r+p[s+1]);t.CFF._readFDict(e,v,d),u.FDArray.push(v)}r+=p[p.length-1],r=u.FDSelect,u.FDSelect=[];var g=e[r];if(r++,3!=g)throw g;var m=a.readUshort(e,r);for(r+=2,s=0;s<m+1;s++)u.FDSelect.push(a.readUshort(e,r),e[r+2]),r+=3}return u.Encoding&&(u.Encoding=t.CFF.readEncoding(e,u.Encoding,u.CharStrings.length)),u.charset&&(u.charset=t.CFF.readCharset(e,u.charset,u.CharStrings.length)),t.CFF._readFDict(e,u,d),u},t.CFF._readFDict=function(e,r,n){var a;for(var o in r.Private&&(a=r.Private[1],r.Private=t.CFF.readDict(e,a,a+r.Private[0]),r.Private.Subrs&&t.CFF.readSubrs(e,a+r.Private.Subrs,r.Private)),r)-1!=["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)&&(r[o]=n[r[o]-426+35])},t.CFF.readSubrs=function(e,r,n){var a=t._bin,o=[];r=t.CFF.readIndex(e,r,o);var i,s=o.length;i=s<1240?107:s<33900?1131:32768,n.Bias=i,n.Subrs=[];for(var l=0;l<o.length-1;l++)n.Subrs.push(a.readBytes(e,r+o[l],o[l+1]-o[l]))},t.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],t.CFF.glyphByUnicode=function(e,t){for(var r=0;r<e.charset.length;r++)if(e.charset[r]==t)return r;return -1},t.CFF.glyphBySE=function(e,r){return r<0||r>255?-1:t.CFF.glyphByUnicode(e,t.CFF.tableSE[r])},t.CFF.readEncoding=function(e,r,n){t._bin;var a=[".notdef"],o=e[r];if(r++,0!=o)throw"error: unknown encoding format: "+o;var i=e[r];r++;for(var s=0;s<i;s++)a.push(e[r+s]);return a},t.CFF.readCharset=function(e,r,n){var a=t._bin,o=[".notdef"],i=e[r];if(r++,0==i)for(var s=0;s<n;s++){var l=a.readUshort(e,r);r+=2,o.push(l)}else{if(1!=i&&2!=i)throw"error: format: "+i;for(;o.length<n;){l=a.readUshort(e,r),r+=2;var c=0;for(1==i?(c=e[r],r++):(c=a.readUshort(e,r),r+=2),s=0;s<=c;s++)o.push(l),l++}}return o},t.CFF.readIndex=function(e,r,n){var a=t._bin,o=a.readUshort(e,r)+1,i=e[r+=2];if(r++,1==i)for(var s=0;s<o;s++)n.push(e[r+s]);else if(2==i)for(s=0;s<o;s++)n.push(a.readUshort(e,r+2*s));else if(3==i)for(s=0;s<o;s++)n.push(16777215&a.readUint(e,r+3*s-1));else if(1!=o)throw"unsupported offset size: "+i+", count: "+o;return(r+=o*i)-1},t.CFF.getCharString=function(e,r,n){var a=t._bin,o=e[r],i=e[r+1];e[r+2],e[r+3],e[r+4];var s=1,l=null,c=null;o<=20&&(l=o,s=1),12==o&&(l=100*o+i,s=2),21<=o&&o<=27&&(l=o,s=1),28==o&&(c=a.readShort(e,r+1),s=3),29<=o&&o<=31&&(l=o,s=1),32<=o&&o<=246&&(c=o-139,s=1),247<=o&&o<=250&&(c=256*(o-247)+i+108,s=2),251<=o&&o<=254&&(c=-(256*(o-251))-i-108,s=2),255==o&&(c=a.readInt(e,r+1)/65535,s=5),n.val=null!=c?c:"o"+l,n.size=s},t.CFF.readCharString=function(e,r,n){for(var a=r+n,o=t._bin,i=[];r<a;){var s=e[r],l=e[r+1];e[r+2],e[r+3],e[r+4];var c=1,u=null,f=null;s<=20&&(u=s,c=1),12==s&&(u=100*s+l,c=2),19!=s&&20!=s||(u=s,c=2),21<=s&&s<=27&&(u=s,c=1),28==s&&(f=o.readShort(e,r+1),c=3),29<=s&&s<=31&&(u=s,c=1),32<=s&&s<=246&&(f=s-139,c=1),247<=s&&s<=250&&(f=256*(s-247)+l+108,c=2),251<=s&&s<=254&&(f=-(256*(s-251))-l-108,c=2),255==s&&(f=o.readInt(e,r+1)/65535,c=5),i.push(null!=f?f:"o"+u),r+=c}return i},t.CFF.readDict=function(e,r,n){for(var a=t._bin,o={},i=[];r<n;){var s=e[r],l=e[r+1];e[r+2],e[r+3],e[r+4];var c=1,u=null,f=null;if(28==s&&(f=a.readShort(e,r+1),c=3),29==s&&(f=a.readInt(e,r+1),c=5),32<=s&&s<=246&&(f=s-139,c=1),247<=s&&s<=250&&(f=256*(s-247)+l+108,c=2),251<=s&&s<=254&&(f=-(256*(s-251))-l-108,c=2),255==s)throw f=a.readInt(e,r+1)/65535,c=5,"unknown number";if(30==s){var d=[];for(c=1;;){var h=e[r+c];c++;var p=h>>4,v=15&h;if(15!=p&&d.push(p),15!=v&&d.push(v),15==v)break}for(var g="",m=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],y=0;y<d.length;y++)g+=m[d[y]];f=parseFloat(g)}s<=21&&(u=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][s],c=1,12==s&&(u=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][l],c=2)),null!=u?(o[u]=1==i.length?i[0]:i,i=[]):i.push(f),r+=c}return o},t.cmap={},t.cmap.parse=function(e,r,n){e=new Uint8Array(e.buffer,r,n),r=0;var a=t._bin,o={};a.readUshort(e,r),r+=2;var i=a.readUshort(e,r);r+=2;var s=[];o.tables=[];for(var l=0;l<i;l++){var c=a.readUshort(e,r);r+=2;var u=a.readUshort(e,r);r+=2;var f=a.readUint(e,r);r+=4;var d="p"+c+"e"+u,h=s.indexOf(f);if(-1==h){h=o.tables.length,s.push(f);var p,v=a.readUshort(e,f);0==v?p=t.cmap.parse0(e,f):4==v?p=t.cmap.parse4(e,f):6==v?p=t.cmap.parse6(e,f):12==v?p=t.cmap.parse12(e,f):console.debug("unknown format: "+v,c,u,f),o.tables.push(p)}if(null!=o[d])throw"multiple tables for one platform+encoding";o[d]=h}return o},t.cmap.parse0=function(e,r){var n=t._bin,a={};a.format=n.readUshort(e,r),r+=2;var o=n.readUshort(e,r);r+=2,n.readUshort(e,r),r+=2,a.map=[];for(var i=0;i<o-6;i++)a.map.push(e[r+i]);return a},t.cmap.parse4=function(e,r){var n=t._bin,a=r,o={};o.format=n.readUshort(e,r),r+=2;var i=n.readUshort(e,r);r+=2,n.readUshort(e,r),r+=2;var s=n.readUshort(e,r);r+=2;var l=s/2;o.searchRange=n.readUshort(e,r),r+=2,o.entrySelector=n.readUshort(e,r),r+=2,o.rangeShift=n.readUshort(e,r),r+=2,o.endCount=n.readUshorts(e,r,l),r+=2*l+2,o.startCount=n.readUshorts(e,r,l),r+=2*l,o.idDelta=[];for(var c=0;c<l;c++)o.idDelta.push(n.readShort(e,r)),r+=2;for(o.idRangeOffset=n.readUshorts(e,r,l),r+=2*l,o.glyphIdArray=[];r<a+i;)o.glyphIdArray.push(n.readUshort(e,r)),r+=2;return o},t.cmap.parse6=function(e,r){var n=t._bin,a={};a.format=n.readUshort(e,r),r+=2,n.readUshort(e,r),r+=2,n.readUshort(e,r),r+=2,a.firstCode=n.readUshort(e,r),r+=2;var o=n.readUshort(e,r);r+=2,a.glyphIdArray=[];for(var i=0;i<o;i++)a.glyphIdArray.push(n.readUshort(e,r)),r+=2;return a},t.cmap.parse12=function(e,r){var n=t._bin,a={};a.format=n.readUshort(e,r),r+=4,n.readUint(e,r),r+=4,n.readUint(e,r),r+=4;var o=n.readUint(e,r);r+=4,a.groups=[];for(var i=0;i<o;i++){var s=r+12*i,l=n.readUint(e,s+0),c=n.readUint(e,s+4),u=n.readUint(e,s+8);a.groups.push([l,c,u])}return a},t.glyf={},t.glyf.parse=function(e,t,r,n){for(var a=[],o=0;o<n.maxp.numGlyphs;o++)a.push(null);return a},t.glyf._parseGlyf=function(e,r){var n,a=t._bin,o=e._data,i=t._tabOffset(o,"glyf",e._offset)+e.loca[r];if(e.loca[r]==e.loca[r+1])return null;var s={};if(s.noc=a.readShort(o,i),i+=2,s.xMin=a.readShort(o,i),i+=2,s.yMin=a.readShort(o,i),i+=2,s.xMax=a.readShort(o,i),i+=2,s.yMax=a.readShort(o,i),i+=2,s.xMin>=s.xMax||s.yMin>=s.yMax)return null;if(s.noc>0){s.endPts=[];for(var l=0;l<s.noc;l++)s.endPts.push(a.readUshort(o,i)),i+=2;var c=a.readUshort(o,i);if(i+=2,o.length-i<c)return null;s.instructions=a.readBytes(o,i,c),i+=c;var u=s.endPts[s.noc-1]+1;for(l=0,s.flags=[];l<u;l++){var f=o[i];if(i++,s.flags.push(f),0!=(8&f)){var d=o[i];i++;for(var h=0;h<d;h++)s.flags.push(f),l++}}for(l=0,s.xs=[];l<u;l++){var p=0!=(2&s.flags[l]),v=0!=(16&s.flags[l]);p?(s.xs.push(v?o[i]:-o[i]),i++):v?s.xs.push(0):(s.xs.push(a.readShort(o,i)),i+=2)}for(l=0,s.ys=[];l<u;l++)p=0!=(4&s.flags[l]),v=0!=(32&s.flags[l]),p?(s.ys.push(v?o[i]:-o[i]),i++):v?s.ys.push(0):(s.ys.push(a.readShort(o,i)),i+=2);var g=0,m=0;for(l=0;l<u;l++)g+=s.xs[l],m+=s.ys[l],s.xs[l]=g,s.ys[l]=m}else{s.parts=[];do{n=a.readUshort(o,i),i+=2;var y={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(s.parts.push(y),y.glyphIndex=a.readUshort(o,i),i+=2,1&n){var x=a.readShort(o,i);i+=2;var b=a.readShort(o,i);i+=2}else x=a.readInt8(o,i),i++,b=a.readInt8(o,i),i++;2&n?(y.m.tx=x,y.m.ty=b):(y.p1=x,y.p2=b),8&n?(y.m.a=y.m.d=a.readF2dot14(o,i),i+=2):64&n?(y.m.a=a.readF2dot14(o,i),i+=2,y.m.d=a.readF2dot14(o,i),i+=2):128&n&&(y.m.a=a.readF2dot14(o,i),i+=2,y.m.b=a.readF2dot14(o,i),i+=2,y.m.c=a.readF2dot14(o,i),i+=2,y.m.d=a.readF2dot14(o,i),i+=2)}while(32&n);if(256&n){var _=a.readUshort(o,i);for(i+=2,s.instr=[],l=0;l<_;l++)s.instr.push(o[i]),i++}}return s},t.GPOS={},t.GPOS.parse=function(e,r,n,a){return t._lctf.parse(e,r,n,a,t.GPOS.subt)},t.GPOS.subt=function(e,r,n,a){var o=t._bin,i=n,s={};if(s.fmt=o.readUshort(e,n),n+=2,1==r||2==r||3==r||7==r||8==r&&s.fmt<=2){var l=o.readUshort(e,n);n+=2,s.coverage=t._lctf.readCoverage(e,l+i)}if(1==r&&1==s.fmt){var c=o.readUshort(e,n);n+=2;var u=t._lctf.numOfOnes(c);0!=c&&(s.pos=t.GPOS.readValueRecord(e,n,c))}else if(2==r&&s.fmt>=1&&s.fmt<=2){c=o.readUshort(e,n),n+=2;var f=o.readUshort(e,n);n+=2,u=t._lctf.numOfOnes(c);var d=t._lctf.numOfOnes(f);if(1==s.fmt){s.pairsets=[];var h=o.readUshort(e,n);n+=2;for(var p=0;p<h;p++){var v=i+o.readUshort(e,n);n+=2;var g=o.readUshort(e,v);v+=2;for(var m=[],y=0;y<g;y++){var x=o.readUshort(e,v);v+=2,0!=c&&(T=t.GPOS.readValueRecord(e,v,c),v+=2*u),0!=f&&(P=t.GPOS.readValueRecord(e,v,f),v+=2*d),m.push({gid2:x,val1:T,val2:P})}s.pairsets.push(m)}}if(2==s.fmt){var b=o.readUshort(e,n);n+=2;var _=o.readUshort(e,n);n+=2;var w=o.readUshort(e,n);n+=2;var S=o.readUshort(e,n);for(n+=2,s.classDef1=t._lctf.readClassDef(e,i+b),s.classDef2=t._lctf.readClassDef(e,i+_),s.matrix=[],p=0;p<w;p++){var U=[];for(y=0;y<S;y++){var T=null,P=null;0!=c&&(T=t.GPOS.readValueRecord(e,n,c),n+=2*u),0!=f&&(P=t.GPOS.readValueRecord(e,n,f),n+=2*d),U.push({val1:T,val2:P})}s.matrix.push(U)}}}else{if(9==r&&1==s.fmt){var k=o.readUshort(e,n);n+=2;var C=o.readUint(e,n);if(n+=4,9==a.ltype)a.ltype=k;else if(a.ltype!=k)throw"invalid extension substitution";return t.GPOS.subt(e,a.ltype,i+C)}console.debug("unsupported GPOS table LookupType",r,"format",s.fmt)}return s},t.GPOS.readValueRecord=function(e,r,n){var a=t._bin,o=[];return o.push(1&n?a.readShort(e,r):0),r+=1&n?2:0,o.push(2&n?a.readShort(e,r):0),r+=2&n?2:0,o.push(4&n?a.readShort(e,r):0),r+=4&n?2:0,o.push(8&n?a.readShort(e,r):0),r+=8&n?2:0,o},t.GSUB={},t.GSUB.parse=function(e,r,n,a){return t._lctf.parse(e,r,n,a,t.GSUB.subt)},t.GSUB.subt=function(e,r,n,a){var o=t._bin,i=n,s={};if(s.fmt=o.readUshort(e,n),n+=2,1!=r&&4!=r&&5!=r&&6!=r)return null;if(1==r||4==r||5==r&&s.fmt<=2||6==r&&s.fmt<=2){var l=o.readUshort(e,n);n+=2,s.coverage=t._lctf.readCoverage(e,i+l)}if(1==r&&s.fmt>=1&&s.fmt<=2){if(1==s.fmt)s.delta=o.readShort(e,n),n+=2;else if(2==s.fmt){var c=o.readUshort(e,n);n+=2,s.newg=o.readUshorts(e,n,c),n+=2*s.newg.length}}else if(4==r){s.vals=[],c=o.readUshort(e,n),n+=2;for(var u=0;u<c;u++){var f=o.readUshort(e,n);n+=2,s.vals.push(t.GSUB.readLigatureSet(e,i+f))}}else if(5==r&&2==s.fmt){if(2==s.fmt){var d=o.readUshort(e,n);n+=2,s.cDef=t._lctf.readClassDef(e,i+d),s.scset=[];var h=o.readUshort(e,n);for(n+=2,u=0;u<h;u++){var p=o.readUshort(e,n);n+=2,s.scset.push(0==p?null:t.GSUB.readSubClassSet(e,i+p))}}}else if(6==r&&3==s.fmt){if(3==s.fmt){for(u=0;u<3;u++){c=o.readUshort(e,n),n+=2;for(var v=[],g=0;g<c;g++)v.push(t._lctf.readCoverage(e,i+o.readUshort(e,n+2*g)));n+=2*c,0==u&&(s.backCvg=v),1==u&&(s.inptCvg=v),2==u&&(s.ahedCvg=v)}c=o.readUshort(e,n),n+=2,s.lookupRec=t.GSUB.readSubstLookupRecords(e,n,c)}}else{if(7==r&&1==s.fmt){var m=o.readUshort(e,n);n+=2;var y=o.readUint(e,n);if(n+=4,9==a.ltype)a.ltype=m;else if(a.ltype!=m)throw"invalid extension substitution";return t.GSUB.subt(e,a.ltype,i+y)}console.debug("unsupported GSUB table LookupType",r,"format",s.fmt)}return s},t.GSUB.readSubClassSet=function(e,r){var n=t._bin.readUshort,a=r,o=[],i=n(e,r);r+=2;for(var s=0;s<i;s++){var l=n(e,r);r+=2,o.push(t.GSUB.readSubClassRule(e,a+l))}return o},t.GSUB.readSubClassRule=function(e,r){var n=t._bin.readUshort,a={},o=n(e,r),i=n(e,r+=2);r+=2,a.input=[];for(var s=0;s<o-1;s++)a.input.push(n(e,r)),r+=2;return a.substLookupRecords=t.GSUB.readSubstLookupRecords(e,r,i),a},t.GSUB.readSubstLookupRecords=function(e,r,n){for(var a=t._bin.readUshort,o=[],i=0;i<n;i++)o.push(a(e,r),a(e,r+2)),r+=4;return o},t.GSUB.readChainSubClassSet=function(e,r){var n=t._bin,a=r,o=[],i=n.readUshort(e,r);r+=2;for(var s=0;s<i;s++){var l=n.readUshort(e,r);r+=2,o.push(t.GSUB.readChainSubClassRule(e,a+l))}return o},t.GSUB.readChainSubClassRule=function(e,r){for(var n=t._bin,a={},o=["backtrack","input","lookahead"],i=0;i<o.length;i++){var s=n.readUshort(e,r);r+=2,1==i&&s--,a[o[i]]=n.readUshorts(e,r,s),r+=2*a[o[i]].length}return s=n.readUshort(e,r),r+=2,a.subst=n.readUshorts(e,r,2*s),r+=2*a.subst.length,a},t.GSUB.readLigatureSet=function(e,r){var n=t._bin,a=r,o=[],i=n.readUshort(e,r);r+=2;for(var s=0;s<i;s++){var l=n.readUshort(e,r);r+=2,o.push(t.GSUB.readLigature(e,a+l))}return o},t.GSUB.readLigature=function(e,r){var n=t._bin,a={chain:[]};a.nglyph=n.readUshort(e,r),r+=2;var o=n.readUshort(e,r);r+=2;for(var i=0;i<o-1;i++)a.chain.push(n.readUshort(e,r)),r+=2;return a},t.head={},t.head.parse=function(e,r,n){var a=t._bin,o={};return a.readFixed(e,r),r+=4,o.fontRevision=a.readFixed(e,r),r+=4,a.readUint(e,r),r+=4,a.readUint(e,r),r+=4,o.flags=a.readUshort(e,r),r+=2,o.unitsPerEm=a.readUshort(e,r),r+=2,o.created=a.readUint64(e,r),r+=8,o.modified=a.readUint64(e,r),r+=8,o.xMin=a.readShort(e,r),r+=2,o.yMin=a.readShort(e,r),r+=2,o.xMax=a.readShort(e,r),r+=2,o.yMax=a.readShort(e,r),r+=2,o.macStyle=a.readUshort(e,r),r+=2,o.lowestRecPPEM=a.readUshort(e,r),r+=2,o.fontDirectionHint=a.readShort(e,r),r+=2,o.indexToLocFormat=a.readShort(e,r),r+=2,o.glyphDataFormat=a.readShort(e,r),r+=2,o},t.hhea={},t.hhea.parse=function(e,r,n){var a=t._bin,o={};return a.readFixed(e,r),r+=4,o.ascender=a.readShort(e,r),r+=2,o.descender=a.readShort(e,r),r+=2,o.lineGap=a.readShort(e,r),r+=2,o.advanceWidthMax=a.readUshort(e,r),r+=2,o.minLeftSideBearing=a.readShort(e,r),r+=2,o.minRightSideBearing=a.readShort(e,r),r+=2,o.xMaxExtent=a.readShort(e,r),r+=2,o.caretSlopeRise=a.readShort(e,r),r+=2,o.caretSlopeRun=a.readShort(e,r),r+=2,o.caretOffset=a.readShort(e,r),r+=10,o.metricDataFormat=a.readShort(e,r),r+=2,o.numberOfHMetrics=a.readUshort(e,r),r+=2,o},t.hmtx={},t.hmtx.parse=function(e,r,n,a){for(var o=t._bin,i={aWidth:[],lsBearing:[]},s=0,l=0,c=0;c<a.maxp.numGlyphs;c++)c<a.hhea.numberOfHMetrics&&(s=o.readUshort(e,r),r+=2,l=o.readShort(e,r),r+=2),i.aWidth.push(s),i.lsBearing.push(l);return i},t.kern={},t.kern.parse=function(e,r,n,a){var o=t._bin,i=o.readUshort(e,r);if(r+=2,1==i)return t.kern.parseV1(e,r-2,n,a);var s=o.readUshort(e,r);r+=2;for(var l={glyph1:[],rval:[]},c=0;c<s;c++){r+=2,n=o.readUshort(e,r),r+=2;var u=o.readUshort(e,r);r+=2;var f=u>>>8;if(0!=(f&=15))throw"unknown kern table format: "+f;r=t.kern.readFormat0(e,r,l)}return l},t.kern.parseV1=function(e,r,n,a){var o=t._bin;o.readFixed(e,r),r+=4;var i=o.readUint(e,r);r+=4;for(var s={glyph1:[],rval:[]},l=0;l<i;l++){o.readUint(e,r),r+=4;var c=o.readUshort(e,r);r+=2,o.readUshort(e,r),r+=2;var u=c>>>8;if(0!=(u&=15))throw"unknown kern table format: "+u;r=t.kern.readFormat0(e,r,s)}return s},t.kern.readFormat0=function(e,r,n){var a=t._bin,o=-1,i=a.readUshort(e,r);r+=2,a.readUshort(e,r),r+=2,a.readUshort(e,r),r+=2,a.readUshort(e,r),r+=2;for(var s=0;s<i;s++){var l=a.readUshort(e,r);r+=2;var c=a.readUshort(e,r);r+=2;var u=a.readShort(e,r);r+=2,l!=o&&(n.glyph1.push(l),n.rval.push({glyph2:[],vals:[]}));var f=n.rval[n.rval.length-1];f.glyph2.push(c),f.vals.push(u),o=l}return r},t.loca={},t.loca.parse=function(e,r,n,a){var o=t._bin,i=[],s=a.head.indexToLocFormat,l=a.maxp.numGlyphs+1;if(0==s)for(var c=0;c<l;c++)i.push(o.readUshort(e,r+(c<<1))<<1);if(1==s)for(c=0;c<l;c++)i.push(o.readUint(e,r+(c<<2)));return i},t.maxp={},t.maxp.parse=function(e,r,n){var a=t._bin,o={},i=a.readUint(e,r);return r+=4,o.numGlyphs=a.readUshort(e,r),r+=2,65536==i&&(o.maxPoints=a.readUshort(e,r),r+=2,o.maxContours=a.readUshort(e,r),r+=2,o.maxCompositePoints=a.readUshort(e,r),r+=2,o.maxCompositeContours=a.readUshort(e,r),r+=2,o.maxZones=a.readUshort(e,r),r+=2,o.maxTwilightPoints=a.readUshort(e,r),r+=2,o.maxStorage=a.readUshort(e,r),r+=2,o.maxFunctionDefs=a.readUshort(e,r),r+=2,o.maxInstructionDefs=a.readUshort(e,r),r+=2,o.maxStackElements=a.readUshort(e,r),r+=2,o.maxSizeOfInstructions=a.readUshort(e,r),r+=2,o.maxComponentElements=a.readUshort(e,r),r+=2,o.maxComponentDepth=a.readUshort(e,r),r+=2),o},t.name={},t.name.parse=function(e,r,n){var a=t._bin,o={};a.readUshort(e,r),r+=2;var i=a.readUshort(e,r);r+=2,a.readUshort(e,r);for(var s,l=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],c=r+=2,u=0;u<i;u++){var f=a.readUshort(e,r);r+=2;var d=a.readUshort(e,r);r+=2;var h=a.readUshort(e,r);r+=2;var p=a.readUshort(e,r);r+=2;var v=a.readUshort(e,r);r+=2;var g=a.readUshort(e,r);r+=2;var m,y=l[p],x=c+12*i+g;if(0==f)m=a.readUnicode(e,x,v/2);else if(3==f&&0==d)m=a.readUnicode(e,x,v/2);else if(0==d)m=a.readASCII(e,x,v);else if(1==d)m=a.readUnicode(e,x,v/2);else if(3==d)m=a.readUnicode(e,x,v/2);else{if(1!=f)throw"unknown encoding "+d+", platformID: "+f;m=a.readASCII(e,x,v),console.debug("reading unknown MAC encoding "+d+" as ASCII")}var b="p"+f+","+h.toString(16);null==o[b]&&(o[b]={}),o[b][void 0!==y?y:p]=m,o[b]._lang=h}for(var _ in o)if(null!=o[_].postScriptName&&1033==o[_]._lang)return o[_];for(var _ in o)if(null!=o[_].postScriptName&&0==o[_]._lang)return o[_];for(var _ in o)if(null!=o[_].postScriptName&&3084==o[_]._lang)return o[_];for(var _ in o)if(null!=o[_].postScriptName)return o[_];for(var _ in o){s=_;break}return console.debug("returning name table with languageID "+o[s]._lang),o[s]},t["OS/2"]={},t["OS/2"].parse=function(e,r,n){var a=t._bin.readUshort(e,r);r+=2;var o={};if(0==a)t["OS/2"].version0(e,r,o);else if(1==a)t["OS/2"].version1(e,r,o);else if(2==a||3==a||4==a)t["OS/2"].version2(e,r,o);else{if(5!=a)throw"unknown OS/2 table version: "+a;t["OS/2"].version5(e,r,o)}return o},t["OS/2"].version0=function(e,r,n){var a=t._bin;return n.xAvgCharWidth=a.readShort(e,r),r+=2,n.usWeightClass=a.readUshort(e,r),r+=2,n.usWidthClass=a.readUshort(e,r),r+=2,n.fsType=a.readUshort(e,r),r+=2,n.ySubscriptXSize=a.readShort(e,r),r+=2,n.ySubscriptYSize=a.readShort(e,r),r+=2,n.ySubscriptXOffset=a.readShort(e,r),r+=2,n.ySubscriptYOffset=a.readShort(e,r),r+=2,n.ySuperscriptXSize=a.readShort(e,r),r+=2,n.ySuperscriptYSize=a.readShort(e,r),r+=2,n.ySuperscriptXOffset=a.readShort(e,r),r+=2,n.ySuperscriptYOffset=a.readShort(e,r),r+=2,n.yStrikeoutSize=a.readShort(e,r),r+=2,n.yStrikeoutPosition=a.readShort(e,r),r+=2,n.sFamilyClass=a.readShort(e,r),r+=2,n.panose=a.readBytes(e,r,10),r+=10,n.ulUnicodeRange1=a.readUint(e,r),r+=4,n.ulUnicodeRange2=a.readUint(e,r),r+=4,n.ulUnicodeRange3=a.readUint(e,r),r+=4,n.ulUnicodeRange4=a.readUint(e,r),r+=4,n.achVendID=[a.readInt8(e,r),a.readInt8(e,r+1),a.readInt8(e,r+2),a.readInt8(e,r+3)],r+=4,n.fsSelection=a.readUshort(e,r),r+=2,n.usFirstCharIndex=a.readUshort(e,r),r+=2,n.usLastCharIndex=a.readUshort(e,r),r+=2,n.sTypoAscender=a.readShort(e,r),r+=2,n.sTypoDescender=a.readShort(e,r),r+=2,n.sTypoLineGap=a.readShort(e,r),r+=2,n.usWinAscent=a.readUshort(e,r),r+=2,n.usWinDescent=a.readUshort(e,r),r+=2},t["OS/2"].version1=function(e,r,n){var a=t._bin;return r=t["OS/2"].version0(e,r,n),n.ulCodePageRange1=a.readUint(e,r),r+=4,n.ulCodePageRange2=a.readUint(e,r),r+=4},t["OS/2"].version2=function(e,r,n){var a=t._bin;return r=t["OS/2"].version1(e,r,n),n.sxHeight=a.readShort(e,r),r+=2,n.sCapHeight=a.readShort(e,r),r+=2,n.usDefault=a.readUshort(e,r),r+=2,n.usBreak=a.readUshort(e,r),r+=2,n.usMaxContext=a.readUshort(e,r),r+=2},t["OS/2"].version5=function(e,r,n){var a=t._bin;return r=t["OS/2"].version2(e,r,n),n.usLowerOpticalPointSize=a.readUshort(e,r),r+=2,n.usUpperOpticalPointSize=a.readUshort(e,r),r+=2},t.post={},t.post.parse=function(e,r,n){var a=t._bin,o={};return o.version=a.readFixed(e,r),r+=4,o.italicAngle=a.readFixed(e,r),r+=4,o.underlinePosition=a.readShort(e,r),r+=2,o.underlineThickness=a.readShort(e,r),r+=2,o},null==t&&(t={}),null==t.U&&(t.U={}),t.U.codeToGlyph=function(e,t){var r=e.cmap,n=-1;if(null!=r.p0e4?n=r.p0e4:null!=r.p3e1?n=r.p3e1:null!=r.p1e0?n=r.p1e0:null!=r.p0e3&&(n=r.p0e3),-1==n)throw"no familiar platform and encoding!";var a=r.tables[n];if(0==a.format)return t>=a.map.length?0:a.map[t];if(4==a.format){for(var o=-1,i=0;i<a.endCount.length;i++)if(t<=a.endCount[i]){o=i;break}return -1==o||a.startCount[o]>t?0:65535&(0!=a.idRangeOffset[o]?a.glyphIdArray[t-a.startCount[o]+(a.idRangeOffset[o]>>1)-(a.idRangeOffset.length-o)]:t+a.idDelta[o])}if(12==a.format){if(t>a.groups[a.groups.length-1][1])return 0;for(i=0;i<a.groups.length;i++){var s=a.groups[i];if(s[0]<=t&&t<=s[1])return s[2]+(t-s[0])}return 0}throw"unknown cmap table format "+a.format},t.U.glyphToPath=function(e,r){var n={cmds:[],crds:[]};if(e.SVG&&e.SVG.entries[r]){var a=e.SVG.entries[r];return null==a?n:("string"==typeof a&&(a=t.SVG.toPath(a),e.SVG.entries[r]=a),a)}if(e.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:e.CFF.Private?e.CFF.Private.defaultWidthX:0,open:!1},i=e.CFF,s=e.CFF.Private;if(i.ROS){for(var l=0;i.FDSelect[l+2]<=r;)l+=2;s=i.FDArray[i.FDSelect[l+1]].Private}t.U._drawCFF(e.CFF.CharStrings[r],o,i,s,n)}else e.glyf&&t.U._drawGlyf(r,e,n);return n},t.U._drawGlyf=function(e,r,n){var a=r.glyf[e];null==a&&(a=r.glyf[e]=t.glyf._parseGlyf(r,e)),null!=a&&(a.noc>-1?t.U._simpleGlyph(a,n):t.U._compoGlyph(a,r,n))},t.U._simpleGlyph=function(e,r){for(var n=0;n<e.noc;n++){for(var a=0==n?0:e.endPts[n-1]+1,o=e.endPts[n],i=a;i<=o;i++){var s=i==a?o:i-1,l=i==o?a:i+1,c=1&e.flags[i],u=1&e.flags[s],f=1&e.flags[l],d=e.xs[i],h=e.ys[i];if(i==a){if(c){if(!u){t.U.P.moveTo(r,d,h);continue}t.U.P.moveTo(r,e.xs[s],e.ys[s])}else u?t.U.P.moveTo(r,e.xs[s],e.ys[s]):t.U.P.moveTo(r,(e.xs[s]+d)/2,(e.ys[s]+h)/2)}c?u&&t.U.P.lineTo(r,d,h):f?t.U.P.qcurveTo(r,d,h,e.xs[l],e.ys[l]):t.U.P.qcurveTo(r,d,h,(d+e.xs[l])/2,(h+e.ys[l])/2)}t.U.P.closePath(r)}},t.U._compoGlyph=function(e,r,n){for(var a=0;a<e.parts.length;a++){var o={cmds:[],crds:[]},i=e.parts[a];t.U._drawGlyf(i.glyphIndex,r,o);for(var s=i.m,l=0;l<o.crds.length;l+=2){var c=o.crds[l],u=o.crds[l+1];n.crds.push(c*s.a+u*s.b+s.tx),n.crds.push(c*s.c+u*s.d+s.ty)}for(l=0;l<o.cmds.length;l++)n.cmds.push(o.cmds[l])}},t.U._getGlyphClass=function(e,r){var n=t._lctf.getInterval(r,e);return -1==n?0:r[n+2]},t.U.getPairAdjustment=function(e,r,n){var a=0,o=!1;if(e.GPOS)for(var i=e.GPOS,s=i.lookupList,l=i.featureList,c=[],u=0;u<l.length;u++){var f=l[u];if("kern"==f.tag){o=!0;for(var d=0;d<f.tab.length;d++)if(!c[f.tab[d]]){c[f.tab[d]]=!0;for(var h=s[f.tab[d]],p=0;p<h.tabs.length;p++)if(null!=h.tabs[p]){var v,g,m=h.tabs[p];if(!m.coverage||-1!=(g=t._lctf.coverageIndex(m.coverage,r))){if(1==h.ltype);else if(2==h.ltype){if(1==m.fmt){var y=m.pairsets[g];for(u=0;u<y.length;u++)y[u].gid2==n&&(v=y[u])}else if(2==m.fmt){var x=t.U._getGlyphClass(r,m.classDef1),b=t.U._getGlyphClass(n,m.classDef2);v=m.matrix[x][b]}v&&v.val1&&v.val1[2]&&(a+=v.val1[2]),v&&v.val2&&v.val2[0]&&(a+=v.val2[0])}}}}}}if(e.kern&&!o){var _=e.kern.glyph1.indexOf(r);if(-1!=_){var w=e.kern.rval[_].glyph2.indexOf(n);-1!=w&&(a+=e.kern.rval[_].vals[w])}}return a},t.U._applySubs=function(e,r,n,a){for(var o=e.length-r-1,i=0;i<n.tabs.length;i++)if(null!=n.tabs[i]){var s,l=n.tabs[i];if(!l.coverage||-1!=(s=t._lctf.coverageIndex(l.coverage,e[r]))){if(1==n.ltype)e[r],1==l.fmt?e[r]=e[r]+l.delta:e[r]=l.newg[s];else if(4==n.ltype)for(var c=l.vals[s],u=0;u<c.length;u++){var f=c[u],d=f.chain.length;if(!(d>o)){for(var h=!0,p=0,v=0;v<d;v++){for(;-1==e[r+p+(1+v)];)p++;f.chain[v]!=e[r+p+(1+v)]&&(h=!1)}if(h){for(v=0,e[r]=f.nglyph;v<d+p;v++)e[r+v+1]=-1;break}}}else if(5==n.ltype&&2==l.fmt)for(var g=t._lctf.getInterval(l.cDef,e[r]),m=l.cDef[g+2],y=l.scset[m],x=0;x<y.length;x++){var b=y[x],_=b.input;if(!(_.length>o)){for(h=!0,v=0;v<_.length;v++){var w=t._lctf.getInterval(l.cDef,e[r+1+v]);if(-1==g&&l.cDef[w+2]!=_[v]){h=!1;break}}if(h){var S=b.substLookupRecords;for(u=0;u<S.length;u+=2)S[u],S[u+1]}}}else if(6==n.ltype&&3==l.fmt){if(!t.U._glsCovered(e,l.backCvg,r-l.backCvg.length)||!t.U._glsCovered(e,l.inptCvg,r)||!t.U._glsCovered(e,l.ahedCvg,r+l.inptCvg.length))continue;var U=l.lookupRec;for(x=0;x<U.length;x+=2){g=U[x];var T=a[U[x+1]];t.U._applySubs(e,r+g,T,a)}}}}},t.U._glsCovered=function(e,r,n){for(var a=0;a<r.length;a++)if(-1==t._lctf.coverageIndex(r[a],e[n+a]))return!1;return!0},t.U.glyphsToPath=function(e,r,n){for(var a={cmds:[],crds:[]},o=0,i=0;i<r.length;i++){var s=r[i];if(-1!=s){for(var l=i<r.length-1&&-1!=r[i+1]?r[i+1]:0,c=t.U.glyphToPath(e,s),u=0;u<c.crds.length;u+=2)a.crds.push(c.crds[u]+o),a.crds.push(c.crds[u+1]);for(n&&a.cmds.push(n),u=0;u<c.cmds.length;u++)a.cmds.push(c.cmds[u]);n&&a.cmds.push("X"),o+=e.hmtx.aWidth[s],i<r.length-1&&(o+=t.U.getPairAdjustment(e,s,l))}}return a},t.U.P={},t.U.P.moveTo=function(e,t,r){e.cmds.push("M"),e.crds.push(t,r)},t.U.P.lineTo=function(e,t,r){e.cmds.push("L"),e.crds.push(t,r)},t.U.P.curveTo=function(e,t,r,n,a,o,i){e.cmds.push("C"),e.crds.push(t,r,n,a,o,i)},t.U.P.qcurveTo=function(e,t,r,n,a){e.cmds.push("Q"),e.crds.push(t,r,n,a)},t.U.P.closePath=function(e){e.cmds.push("Z")},t.U._drawCFF=function(e,r,n,a,o){for(var i=r.stack,s=r.nStems,l=r.haveWidth,c=r.width,u=r.open,f=0,d=r.x,h=r.y,p=0,v=0,g=0,m=0,y=0,x=0,b=0,_=0,w=0,S=0,U={val:0,size:0};f<e.length;){t.CFF.getCharString(e,f,U);var T=U.val;if(f+=U.size,"o1"==T||"o18"==T)i.length%2==0||l||(c=i.shift()+a.nominalWidthX),s+=i.length>>1,i.length=0,l=!0;else if("o3"==T||"o23"==T)i.length%2==0||l||(c=i.shift()+a.nominalWidthX),s+=i.length>>1,i.length=0,l=!0;else if("o4"==T)i.length>1&&!l&&(c=i.shift()+a.nominalWidthX,l=!0),u&&t.U.P.closePath(o),h+=i.pop(),t.U.P.moveTo(o,d,h),u=!0;else if("o5"==T)for(;i.length>0;)d+=i.shift(),h+=i.shift(),t.U.P.lineTo(o,d,h);else if("o6"==T||"o7"==T)for(var P=i.length,k="o6"==T,C=0;C<P;C++){var E=i.shift();k?d+=E:h+=E,k=!k,t.U.P.lineTo(o,d,h)}else if("o8"==T||"o24"==T){P=i.length;for(var A=0;A+6<=P;)p=d+i.shift(),v=h+i.shift(),g=p+i.shift(),m=v+i.shift(),d=g+i.shift(),h=m+i.shift(),t.U.P.curveTo(o,p,v,g,m,d,h),A+=6;"o24"==T&&(d+=i.shift(),h+=i.shift(),t.U.P.lineTo(o,d,h))}else{if("o11"==T)break;if("o1234"==T||"o1235"==T||"o1236"==T||"o1237"==T)"o1234"==T&&(v=h,g=(p=d+i.shift())+i.shift(),S=m=v+i.shift(),x=m,_=h,d=(b=(y=(w=g+i.shift())+i.shift())+i.shift())+i.shift(),t.U.P.curveTo(o,p,v,g,m,w,S),t.U.P.curveTo(o,y,x,b,_,d,h)),"o1235"==T&&(p=d+i.shift(),v=h+i.shift(),g=p+i.shift(),m=v+i.shift(),w=g+i.shift(),S=m+i.shift(),y=w+i.shift(),x=S+i.shift(),b=y+i.shift(),_=x+i.shift(),d=b+i.shift(),h=_+i.shift(),i.shift(),t.U.P.curveTo(o,p,v,g,m,w,S),t.U.P.curveTo(o,y,x,b,_,d,h)),"o1236"==T&&(p=d+i.shift(),v=h+i.shift(),g=p+i.shift(),S=m=v+i.shift(),x=m,b=(y=(w=g+i.shift())+i.shift())+i.shift(),_=x+i.shift(),d=b+i.shift(),t.U.P.curveTo(o,p,v,g,m,w,S),t.U.P.curveTo(o,y,x,b,_,d,h)),"o1237"==T&&(p=d+i.shift(),v=h+i.shift(),g=p+i.shift(),m=v+i.shift(),w=g+i.shift(),S=m+i.shift(),y=w+i.shift(),x=S+i.shift(),Math.abs((b=y+i.shift())-d)>Math.abs((_=x+i.shift())-h)?d=b+i.shift():h=_+i.shift(),t.U.P.curveTo(o,p,v,g,m,w,S),t.U.P.curveTo(o,y,x,b,_,d,h));else if("o14"==T){if(i.length>0&&!l&&(c=i.shift()+n.nominalWidthX,l=!0),4==i.length){var D=i.shift(),M=i.shift(),F=i.shift(),R=i.shift(),O=t.CFF.glyphBySE(n,F),I=t.CFF.glyphBySE(n,R);t.U._drawCFF(n.CharStrings[O],r,n,a,o),r.x=D,r.y=M,t.U._drawCFF(n.CharStrings[I],r,n,a,o)}u&&(t.U.P.closePath(o),u=!1)}else if("o19"==T||"o20"==T)i.length%2==0||l||(c=i.shift()+a.nominalWidthX),s+=i.length>>1,i.length=0,l=!0,f+=s+7>>3;else if("o21"==T)i.length>2&&!l&&(c=i.shift()+a.nominalWidthX,l=!0),h+=i.pop(),d+=i.pop(),u&&t.U.P.closePath(o),t.U.P.moveTo(o,d,h),u=!0;else if("o22"==T)i.length>1&&!l&&(c=i.shift()+a.nominalWidthX,l=!0),d+=i.pop(),u&&t.U.P.closePath(o),t.U.P.moveTo(o,d,h),u=!0;else if("o25"==T){for(;i.length>6;)d+=i.shift(),h+=i.shift(),t.U.P.lineTo(o,d,h);p=d+i.shift(),v=h+i.shift(),g=p+i.shift(),m=v+i.shift(),d=g+i.shift(),h=m+i.shift(),t.U.P.curveTo(o,p,v,g,m,d,h)}else if("o26"==T)for(i.length%2&&(d+=i.shift());i.length>0;)p=d,v=h+i.shift(),d=g=p+i.shift(),h=(m=v+i.shift())+i.shift(),t.U.P.curveTo(o,p,v,g,m,d,h);else if("o27"==T)for(i.length%2&&(h+=i.shift());i.length>0;)v=h,g=(p=d+i.shift())+i.shift(),m=v+i.shift(),d=g+i.shift(),h=m,t.U.P.curveTo(o,p,v,g,m,d,h);else if("o10"==T||"o29"==T){var B="o10"==T?a:n;if(0==i.length)console.debug("error: empty stack");else{var z=i.pop(),j=B.Subrs[z+B.Bias];r.x=d,r.y=h,r.nStems=s,r.haveWidth=l,r.width=c,r.open=u,t.U._drawCFF(j,r,n,a,o),d=r.x,h=r.y,s=r.nStems,l=r.haveWidth,c=r.width,u=r.open}}else if("o30"==T||"o31"==T){var L=i.length,G=(A=0,"o31"==T);for(A+=L-(P=-3&L);A<P;)G?(v=h,g=(p=d+i.shift())+i.shift(),h=(m=v+i.shift())+i.shift(),P-A==5?(d=g+i.shift(),A++):d=g,G=!1):(p=d,v=h+i.shift(),g=p+i.shift(),m=v+i.shift(),d=g+i.shift(),P-A==5?(h=m+i.shift(),A++):h=m,G=!0),t.U.P.curveTo(o,p,v,g,m,d,h),A+=4}else{if("o"==(T+"").charAt(0))throw console.debug("Unknown operation: "+T,e),T;i.push(T)}}}r.x=d,r.y=h,r.nStems=s,r.haveWidth=l,r.width=c,r.open=u},r=t,e.Typr=r,e.default={Typr:r},Object.defineProperty(e,"__esModule",{value:!0}),e).Typr},/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function(){return function(e){var t=Uint8Array,r=Uint16Array,n=Uint32Array,a=new t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),o=new t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),i=new t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=function(e,t){for(var a=new r(31),o=0;o<31;++o)a[o]=t+=1<<e[o-1];var i=new n(a[30]);for(o=1;o<30;++o)for(var s=a[o];s<a[o+1];++s)i[s]=s-a[o]<<5|o;return[a,i]},l=s(a,2),c=l[0],u=l[1];c[28]=258,u[258]=28;for(var f=s(o,0)[0],d=new r(32768),h=0;h<32768;++h){var p=(43690&h)>>>1|(21845&h)<<1;p=(61680&(p=(52428&p)>>>2|(13107&p)<<2))>>>4|(3855&p)<<4,d[h]=((65280&p)>>>8|(255&p)<<8)>>>1}var v=function(e,t,n){for(var a=e.length,o=0,i=new r(t);o<a;++o)++i[e[o]-1];var s,l=new r(t);for(o=0;o<t;++o)l[o]=l[o-1]+i[o-1]<<1;if(n){s=new r(1<<t);var c=15-t;for(o=0;o<a;++o)if(e[o])for(var u=o<<4|e[o],f=t-e[o],h=l[e[o]-1]++<<f,p=h|(1<<f)-1;h<=p;++h)s[d[h]>>>c]=u}else for(s=new r(a),o=0;o<a;++o)e[o]&&(s[o]=d[l[e[o]-1]++]>>>15-e[o]);return s},g=new t(288);for(h=0;h<144;++h)g[h]=8;for(h=144;h<256;++h)g[h]=9;for(h=256;h<280;++h)g[h]=7;for(h=280;h<288;++h)g[h]=8;var m=new t(32);for(h=0;h<32;++h)m[h]=5;var y=v(g,9,1),x=v(m,5,1),b=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},_=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(7&t)&r},w=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(7&t)},S=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],U=function(e,t,r){var n=Error(t||S[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,U),!r)throw n;return n},T=function(e,s,l){var u,d,h,p,g=e.length;if(!g||l&&!l.l&&g<5)return s||new t(0);var m=!s||l,S=!l||l.i;l||(l={}),s||(s=new t(3*g));var T,P=function(e){var r=s.length;if(e>r){var n=new t(Math.max(2*r,e));n.set(s),s=n}},k=l.f||0,C=l.p||0,E=l.b||0,A=l.l,D=l.d,M=l.m,F=l.n,R=8*g;do{if(!A){l.f=k=_(e,C,1);var O=_(e,C+1,3);if(C+=3,!O){var I=e[(H=((T=C)/8|0)+(7&T&&1)+4)-4]|e[H-3]<<8,B=H+I;if(B>g){S&&U(0);break}m&&P(E+I),s.set(e.subarray(H,B),E),l.b=E+=I,l.p=C=8*B;continue}if(1==O)A=y,D=x,M=9,F=5;else if(2==O){var z=_(e,C,31)+257,j=_(e,C+10,15)+4,L=z+_(e,C+5,31)+1;C+=14;for(var G=new t(L),N=new t(19),V=0;V<j;++V)N[i[V]]=_(e,C+3*V,7);C+=3*j;var W=b(N),X=(1<<W)-1,q=v(N,W,1);for(V=0;V<L;){var H,Y=q[_(e,C,X)];if(C+=15&Y,(H=Y>>>4)<16)G[V++]=H;else{var $=0,Z=0;for(16==H?(Z=3+_(e,C,3),C+=2,$=G[V-1]):17==H?(Z=3+_(e,C,7),C+=3):18==H&&(Z=11+_(e,C,127),C+=7);Z--;)G[V++]=$}}var K=G.subarray(0,z),Q=G.subarray(z);M=b(K),F=b(Q),A=v(K,M,1),D=v(Q,F,1)}else U(1);if(C>R){S&&U(0);break}}m&&P(E+131072);for(var J=(1<<M)-1,ee=(1<<F)-1,et=C;;et=C){var er=($=A[w(e,C)&J])>>>4;if((C+=15&$)>R){S&&U(0);break}if($||U(2),er<256)s[E++]=er;else{if(256==er){et=C,A=null;break}var en=er-254;if(er>264){var ea=a[V=er-257];en=_(e,C,(1<<ea)-1)+c[V],C+=ea}var eo=D[w(e,C)&ee],ei=eo>>>4;if(eo||U(3),C+=15&eo,Q=f[ei],ei>3&&(ea=o[ei],Q+=w(e,C)&(1<<ea)-1,C+=ea),C>R){S&&U(0);break}m&&P(E+131072);for(var es=E+en;E<es;E+=4)s[E]=s[E-Q],s[E+1]=s[E+1-Q],s[E+2]=s[E+2-Q],s[E+3]=s[E+3-Q];E=es}}l.l=A,l.p=et,l.b=E,A&&(k=1,l.m=M,l.d=D,l.n=F)}while(!k);return E==s.length?s:(u=s,(d=0)<0&&(d=0),(null==(h=E)||h>u.length)&&(h=u.length),(p=new(u instanceof r?r:u instanceof n?n:t)(h-d)).set(u.subarray(d,h)),p)},P=new t(0),k="undefined"!=typeof TextDecoder&&new TextDecoder;try{k.decode(P,{stream:!0})}catch(e){}return e.convert_streams=function(e){var t=new DataView(e),r=0;function n(){var e=t.getUint16(r);return r+=2,e}function a(){var e=t.getUint32(r);return r+=4,e}function o(e){m.setUint16(y,e),y+=2}function i(e){m.setUint32(y,e),y+=4}for(var s={signature:a(),flavor:a(),length:a(),numTables:n(),reserved:n(),totalSfntSize:a(),majorVersion:n(),minorVersion:n(),metaOffset:a(),metaLength:a(),metaOrigLength:a(),privOffset:a(),privLength:a()},l=0;Math.pow(2,l)<=s.numTables;)l++;l--;for(var c=16*Math.pow(2,l),u=16*s.numTables-c,f=12,d=[],h=0;h<s.numTables;h++)d.push({tag:a(),offset:a(),compLength:a(),origLength:a(),origChecksum:a()}),f+=16;var p,v=new Uint8Array(12+16*d.length+d.reduce(function(e,t){return e+t.origLength+4},0)),g=v.buffer,m=new DataView(g),y=0;return i(s.flavor),o(s.numTables),o(c),o(l),o(u),d.forEach(function(e){i(e.tag),i(e.origChecksum),i(f),i(e.origLength),e.outOffset=f,(f+=e.origLength)%4!=0&&(f+=4-f%4)}),d.forEach(function(t){var r=e.slice(t.offset,t.offset+t.compLength);if(t.compLength!=t.origLength){var n=new Uint8Array(t.origLength);T(new Uint8Array(r,2),n)}else n=new Uint8Array(r);v.set(n,t.outOffset);var a=0;(f=t.outOffset+t.origLength)%4!=0&&(a=4-f%4),v.set(new Uint8Array(a).buffer,t.outOffset+t.origLength),p=f+a}),g.slice(0,p)},Object.defineProperty(e,"__esModule",{value:!0}),e}({}).convert_streams},function(e,t){let r;let n={M:2,L:2,Q:4,C:6,Z:0},a={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},o=[null,"isol","init","fina","medi"];return function(i){let s=new Uint8Array(i,0,4),l=e._bin.readASCII(s,0,4);if("wOFF"===l)i=t(i);else if("wOF2"===l)throw Error("woff2 fonts not supported");return function(t){let i=Object.create(null),s={unitsPerEm:t.head.unitsPerEm,ascender:t.hhea.ascender,descender:t.hhea.descender,forEachGlyph(l,c,u,f){let d=0,h=1/s.unitsPerEm*c,p=function(t,n){let i=[];for(let r=0;r<n.length;r++){let a=n.codePointAt(r);a>65535&&r++,i.push(e.U.codeToGlyph(t,a))}let s=t.GSUB;if(s){let t;let{lookupList:l,featureList:c}=s,u=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws)$/,f=[];c.forEach(s=>{if(u.test(s.tag))for(let c=0;c<s.tab.length;c++){if(f[s.tab[c]])continue;f[s.tab[c]]=!0;let u=l[s.tab[c]],d=/^(isol|init|fina|medi)$/.test(s.tag);d&&!t&&(t=function(e){let t=new Uint8Array(e.length),n=32,o=1,i=-1;for(let s=0;s<e.length;s++){let l=e.codePointAt(s),c=0|function(e){if(!r){let e={R:2,L:1,D:4,C:16,U:32,T:8};for(let t in r=new Map,a){let n=0;a[t].split(",").forEach(a=>{let[o,i]=a.split("+");o=parseInt(o,36),i=i?parseInt(i,36):0,r.set(n+=o,e[t]);for(let a=i;a--;)r.set(++n,e[t])})}}return r.get(e)||32}(l),u=1;!(8&c)&&(21&n?22&c?(u=3,(1===o||3===o)&&t[i]++):33&c&&(2===o||4===o)&&t[i]--:34&n&&(2===o||4===o)&&t[i]--,o=t[s]=u,n=c,i=s,l>65535&&s++)}return t}(n));for(let r=0;r<i.length;r++)t&&d&&o[t[r]]!==s.tag||e.U._applySubs(i,r,u,l)}})}return i}(t,l),v=0,g=-1;return p.forEach((r,a)=>{if(-1!==r){let a=i[r];if(!a){let o,s,l,c;let{cmds:u,crds:f}=e.U.glyphToPath(t,r),d="",h=0;for(let e=0,t=u.length;e<t;e++){let t=n[u[e]];d+=u[e];for(let e=1;e<=t;e++)d+=(e>1?",":"")+f[h++]}if(f.length){o=s=1/0,l=c=-1/0;for(let e=0,t=f.length;e<t;e+=2){let t=f[e],r=f[e+1];t<o&&(o=t),r<s&&(s=r),t>l&&(l=t),r>c&&(c=r)}}else o=l=s=c=0;a=i[r]={index:r,advanceWidth:t.hmtx.aWidth[r],xMin:o,yMin:s,xMax:l,yMax:c,path:d,pathCommandCount:u.length}}-1!==g&&(d+=e.U.getPairAdjustment(t,g,r)*h),f.call(null,a,d,v),a.advanceWidth&&(d+=a.advanceWidth*h),u&&(d+=u*c),g=r}v+=l.codePointAt(v)>65535?2:1}),d}};return s}(e.parse(i)[0])}}],init:(e,t,r)=>r(e(),t())}),en={defaultFontURL:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},ea=new c.Color;function eo(){return(self.performance||Date).now()}let ei=Object.create(null);function es(e,t){var r;e=function(e,t){for(let r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e}({},e);let n=eo();if(e.font=(r=e.font||en.defaultFontURL,a||(a="undefined"==typeof document?{}:document.createElement("a")),a.href=r,a.href),e.text=""+e.text,e.sdfGlyphSize=e.sdfGlyphSize||en.sdfGlyphSize,null!=e.colorRanges){let t={};for(let r in e.colorRanges)if(e.colorRanges.hasOwnProperty(r)){let n=e.colorRanges[r];"number"!=typeof n&&(n=ea.set(n).getHex()),t[r]=n}e.colorRanges=t}Object.freeze(e);let{textureWidth:o,sdfExponent:i}=en,{sdfGlyphSize:s}=e,l=o/s*4,u=ei[s];if(!u){let e=document.createElement("canvas");e.width=o,e.height=256*s/l,(u=ei[s]={glyphCount:0,sdfGlyphSize:s,sdfCanvas:e,sdfTexture:new c.Texture(e,void 0,void 0,void 0,c.LinearFilter,c.LinearFilter),contextLost:!1,glyphsByFont:new Map}).sdfTexture.generateMipmaps=!1,function(e){let t=e.sdfCanvas;t.addEventListener("webglcontextlost",t=>{console.log("Context Lost",t),t.preventDefault(),e.contextLost=!0}),t.addEventListener("webglcontextrestored",t=>{console.log("Context Restored",t),e.contextLost=!1;let r=[];e.glyphsByFont.forEach(t=>{t.forEach(t=>{r.push(el(t,e,!0))})}),T.all(r).then(()=>{ec(e),e.sdfTexture.needsUpdate=!0})})}(u)}let{sdfTexture:f,sdfCanvas:d}=u,h=u.glyphsByFont.get(e.font);h||u.glyphsByFont.set(e.font,h=new Map),ef(e).then(r=>{let{glyphIds:a,glyphPositions:c,fontSize:p,unitsPerEm:v,timings:g}=r,m=[],y=new Float32Array(4*a.length),x=p/v,b=0,_=0,w=eo();a.forEach((e,t)=>{let n=h.get(e);if(!n){let{path:t,pathBounds:a}=r.glyphData[e],o=Math.max(a[2]-a[0],a[3]-a[1])/s*(en.sdfMargin*s+.5),i=u.glyphCount++,l=[a[0]-o,a[1]-o,a[2]+o,a[3]+o];h.set(e,n={path:t,atlasIndex:i,sdfViewBox:l}),m.push(n)}let{sdfViewBox:o}=n,i=c[_++],l=c[_++];y[b++]=i+o[0]*x,y[b++]=l+o[1]*x,y[b++]=i+o[2]*x,y[b++]=l+o[3]*x,a[t]=n.atlasIndex}),g.quads=(g.quads||0)+(eo()-w);let S=eo();g.sdf={};let U=d.height,P=Math.pow(2,Math.ceil(Math.log2(Math.ceil(u.glyphCount/l)*s)));P>U&&(console.info(`Increasing SDF texture size ${U}->${P}`),et(d,o,P),f.dispose()),T.all(m.map(t=>el(t,u,e.gpuAccelerateSDF).then(({timing:e})=>{g.sdf[t.atlasIndex]=e}))).then(()=>{m.length&&!u.contextLost&&(ec(u),f.needsUpdate=!0),g.sdfTotal=eo()-S,g.total=eo()-n,t(Object.freeze({parameters:e,sdfTexture:f,sdfGlyphSize:s,sdfExponent:i,glyphBounds:y,glyphAtlasIndices:a,glyphColors:r.glyphColors,caretPositions:r.caretPositions,caretHeight:r.caretHeight,chunkedBounds:r.chunkedBounds,ascender:r.ascender,descender:r.descender,lineHeight:r.lineHeight,topBaseline:r.topBaseline,blockBounds:r.blockBounds,visibleBounds:r.visibleBounds,timings:r.timings,get totalBounds(){return console.log("totalBounds deprecated, use blockBounds instead"),r.blockBounds},get totalBlockSize(){console.log("totalBlockSize deprecated, use blockBounds instead");let[e,t,n,a]=r.blockBounds;return[n-e,a-t]}}))})}),T.all([]).then(()=>{!u.contextLost&&(d._warm||(Q.webgl.isSupported(d),d._warm=!0))})}function el({path:e,atlasIndex:t,sdfViewBox:r},{sdfGlyphSize:a,sdfCanvas:o,contextLost:i},s){if(i)return Promise.resolve({timing:-1});let{textureWidth:l,sdfExponent:c}=en,u=Math.max(r[2]-r[0],r[3]-r[1]),f=Math.floor(t/4),d=f%(l/a)*a,h=Math.floor(f/(l/a))*a;return function(e,t,r,a,o,i,s,l,c,u,f=!0){return f?J(e,t,r,a,o,i,s,l,c,u).then(null,f=>(n||(console.warn("WebGL SDF generation failed, falling back to JS",f),n=!0),ee(e,t,r,a,o,i,s,l,c,u))):ee(e,t,r,a,o,i,s,l,c,u)}(a,a,e,r,u,c,o,d,h,t%4,s)}function ec(e){if("function"!=typeof createImageBitmap){console.info("Safari<15: applying SDF canvas workaround");let{sdfCanvas:t,sdfTexture:r}=e,{width:n,height:a}=t,o=e.sdfCanvas.getContext("webgl"),i=r.image.data;i&&i.length===n*a*4||(i=new Uint8Array(n*a*4),r.image={width:n,height:a,data:i},r.flipY=!1,r.isDataTexture=!0),o.readPixels(0,0,n,a,o.RGBA,o.UNSIGNED_BYTE,i)}}let eu=R({name:"Typesetter",dependencies:[en,er,function(e,t,r){let{defaultFontURL:n}=r,a=Object.create(null),o=1/0,i=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,s=/[\s\-\u007C\u00AD\u2010\u2012-\u2014\u2027\u2056\u2E17\u2E40]/;function l(t,r){t||(t=n);let o=a[t];if(o)o.pending?o.pending.push(r):r(o);else{var i,s;a[t]={pending:[r]},i=t,s=e=>{let r=a[t].pending;a[t]=e,r.forEach(t=>t(e))},function t(){let r=e=>{console.error(`Failure loading font ${i}${i===n?"":"; trying fallback"}`,e),i!==n&&(i=n,t())};try{let t=new XMLHttpRequest;t.open("get",i,!0),t.responseType="arraybuffer",t.onload=function(){if(t.status>=400)r(Error(t.statusText));else if(t.status>0)try{let r=e(t.response);s(r)}catch(e){r(e)}},t.onerror=r,t.send()}catch(e){r(e)}}()}}function c({text:e="",font:r=n,sdfGlyphSize:a=64,fontSize:c=1,letterSpacing:p=0,lineHeight:v="normal",maxWidth:g=o,direction:m,textAlign:y="left",textIndent:x=0,whiteSpace:b="normal",overflowWrap:_="normal",anchorX:w=0,anchorY:S=0,includeCaretPositions:U=!1,chunkedBoundsSize:T=8192,colorRanges:P=null},k,C=!1){let E=d(),A={fontLoad:0,typesetting:0};e.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),e=e.replace(/\r\n/g,"\n").replace(/\r/g,"\n")),c=+c,p=+p,g=+g,v=v||"normal",x=+x,l(r,r=>{let n=isFinite(g),a=null,l=null,D=null,M=null,F=null,R=null,O=null,I=0,B=0,z="nowrap"!==b,{ascender:j,descender:L,unitsPerEm:G}=r;A.fontLoad=d()-E;let N=d(),V=c/G;"normal"===v&&(v=(j-L)/G);let W=((v*=c)-(j-L)*V)/2,X=-(j*V+W),q=Math.min(v,(j-L)*V),H=(j+L)/2*V-q/2,Y=x,$=new h,Z=[$];r.forEachGlyph(e,c,p,(t,r,a)=>{let o;let l=e.charAt(a),u=t.advanceWidth*V,f=$.count;if("isEmpty"in t||(t.isWhitespace=!!l&&/\s/.test(l),t.canBreakAfter=!!l&&s.test(l),t.isEmpty=t.xMin===t.xMax||t.yMin===t.yMax||i.test(l)),!t.isWhitespace&&!t.isEmpty&&B++,z&&n&&!t.isWhitespace&&r+u+Y>g&&f){if($.glyphAt(f-1).glyphObj.canBreakAfter)o=new h,Y=-r;else for(let e=f;e--;){if(0===e&&"break-word"===_){o=new h,Y=-r;break}if($.glyphAt(e).glyphObj.canBreakAfter){let t=(o=$.splitAt(e+1)).glyphAt(0).x;Y-=t;for(let e=o.count;e--;)o.glyphAt(e).x-=t;break}}o&&($.isSoftWrapped=!0,$=o,Z.push($),I=g)}let d=$.glyphAt($.count);d.glyphObj=t,d.x=r+Y,d.width=u,d.charIndex=a,"\n"===l&&($=new h,Z.push($),Y=-(r+u+p*c)+x)}),Z.forEach(e=>{for(let t=e.count;t--;){let{glyphObj:r,x:n,width:a}=e.glyphAt(t);if(!r.isWhitespace){e.width=n+a,e.width>I&&(I=e.width);return}}});let K=0,Q=0;if(w&&("number"==typeof w?K=-w:"string"==typeof w&&(K=-I*("left"===w?0:"center"===w?.5:"right"===w?1:u(w)))),S){if("number"==typeof S)Q=-S;else if("string"==typeof S){let e=Z.length*v;Q="top"===S?0:"top-baseline"===S?-X:"middle"===S?e/2:"bottom"===S?e:"bottom-baseline"===S?e-W+L*V:u(S)*e}}if(!C){let n,i;let s=t.getEmbeddingLevels(e,m);a=new Uint16Array(B),l=new Float32Array(2*B),D={},R=[o,o,-o,-o],O=[];let c=X;U&&(F=new Float32Array(3*e.length)),P&&(M=new Uint8Array(3*B));let u=0,d=-1,h=-1;if(Z.forEach((p,g)=>{let{count:m,width:x}=p;if(m>0){let v,g=0;for(let e=m;e--&&p.glyphAt(e).glyphObj.isWhitespace;)g++;let b=0,_=0;if("center"===y)b=(I-x)/2;else if("right"===y)b=I-x;else if("justify"===y&&p.isSoftWrapped){let e=0;for(let t=m-g;t--;)p.glyphAt(t).glyphObj.isWhitespace&&e++;_=(I-x)/e}if(_||b){let e=0;for(let t=0;t<m;t++){let r=p.glyphAt(t),n=r.glyphObj;r.x+=b+e,0!==_&&n.isWhitespace&&t<m-g&&(e+=_,r.width+=_)}}let w=t.getReorderSegments(e,s,p.glyphAt(0).charIndex,p.glyphAt(p.count-1).charIndex);for(let e=0;e<w.length;e++){let[t,r]=w[e],n=1/0,a=-1/0;for(let e=0;e<m;e++)if(p.glyphAt(e).charIndex>=t){let t=e,o=e;for(;o<m;o++){let e=p.glyphAt(o);if(e.charIndex>r)break;o<m-g&&(n=Math.min(n,e.x),a=Math.max(a,e.x+e.width))}for(let e=t;e<o;e++){let t=p.glyphAt(e);t.x=a-(t.x+t.width-n)}break}}let S=e=>v=e;for(let g=0;g<m;g++){let m=p.glyphAt(g),y=(v=m.glyphObj).index,x=1&s.levels[m.charIndex];if(x){let n=t.getMirroredCharacter(e[m.charIndex]);n&&r.forEachGlyph(n,0,0,S)}if(U){let{charIndex:e}=m,t=m.x+K,r=m.x+m.width+K;F[3*e]=x?r:t,F[3*e+1]=x?t:r,F[3*e+2]=c+H+Q;let n=e-d;n>1&&f(F,d,n),d=e}if(P){let{charIndex:e}=m;for(;e>h;)h++,P.hasOwnProperty(h)&&(i=P[h])}if(!v.isWhitespace&&!v.isEmpty){let e=u++;D[y]||(D[y]={path:v.path,pathBounds:[v.xMin,v.yMin,v.xMax,v.yMax]});let t=m.x+K,r=c+Q;l[2*e]=t,l[2*e+1]=r;let s=t+v.xMin*V,f=r+v.yMin*V,d=t+v.xMax*V,h=r+v.yMax*V;s<R[0]&&(R[0]=s),f<R[1]&&(R[1]=f),d>R[2]&&(R[2]=d),h>R[3]&&(R[3]=h),e%T==0&&(n={start:e,end:e,rect:[o,o,-o,-o]},O.push(n)),n.end++;let p=n.rect;if(s<p[0]&&(p[0]=s),f<p[1]&&(p[1]=f),d>p[2]&&(p[2]=d),h>p[3]&&(p[3]=h),a[e]=y,P){let t=3*e;M[t]=i>>16&255,M[t+1]=i>>8&255,M[t+2]=255&i}}}}c-=v}),F){let t=e.length-d;t>1&&f(F,d,t)}}A.typesetting=d()-N,k({glyphIds:a,glyphPositions:l,glyphData:D,caretPositions:F,caretHeight:q,glyphColors:M,chunkedBounds:O,fontSize:c,unitsPerEm:G,ascender:j*V,descender:L*V,lineHeight:v,topBaseline:X,blockBounds:[K,Q-Z.length*v,K+I,Q],visibleBounds:R,timings:A})})}function u(e){let t=e.match(/^([\d.]+)%$/),r=t?parseFloat(t[1]):NaN;return isNaN(r)?0:r/100}function f(e,t,r){let n=e[3*t],a=e[3*t+1],o=e[3*t+2],i=(a-n)/r;for(let a=0;a<r;a++){let r=(t+a)*3;e[r]=n+i*a,e[r+1]=n+i*(a+1),e[r+2]=o}}function d(){return(self.performance||Date).now()}function h(){this.data=[]}let p=["glyphObj","x","width","charIndex"];return h.prototype={width:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/p.length)},glyphAt(e){let t=h.flyweight;return t.data=this.data,t.index=e,t},splitAt(e){let t=new h;return t.data=this.data.splice(e*p.length),t}},h.flyweight=p.reduce((e,t,r,n)=>(Object.defineProperty(e,t,{get(){return this.data[this.index*p.length+r]},set(e){this.data[this.index*p.length+r]=e}}),e),{data:null,index:0}),{typeset:c,measure:function(e,t){c(e,e=>{let[r,n,a,o]=e.blockBounds;t({width:a-r,height:o-n})},{metricsOnly:!0})},loadFont:l}},function(){return function(e){var t,r,n,a,o={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},i={},s={};i.L=1,s[1]="L",Object.keys(o).forEach(function(e,t){i[e]=1<<t+1,s[i[e]]=e}),Object.freeze(i);var l=i.LRI|i.RLI|i.FSI,c=i.L|i.R|i.AL,u=i.B|i.S|i.WS|i.ON|i.FSI|i.LRI|i.RLI|i.PDI,f=i.BN|i.RLE|i.LRE|i.RLO|i.LRO|i.PDF,d=i.S|i.WS|i.B|l|i.PDI|f,h=null;function p(e){return function(){if(!h){h=new Map;var e=function(e){if(o.hasOwnProperty(e)){var t=0;o[e].split(",").forEach(function(r){var n=r.split("+"),a=n[0],o=n[1];a=parseInt(a,36),o=o?parseInt(o,36):0,h.set(t+=a,i[e]);for(var s=0;s<o;s++)h.set(++t,i[e])})}};for(var t in o)e(t)}}(),h.get(e.codePointAt(0))||i.L}var v={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function g(e,t){var r,n=0,a=new Map,o=t&&new Map;return e.split(",").forEach(function e(i){if(-1!==i.indexOf("+"))for(var s=+i;s--;)e(r);else{r=i;var l=i.split(">"),c=l[0],u=l[1];c=String.fromCodePoint(n+=parseInt(c,36)),u=String.fromCodePoint(n+=parseInt(u,36)),a.set(c,u),t&&o.set(u,c)}}),{map:a,reverseMap:o}}function m(){if(!t){var e=g(v.pairs,!0),a=e.map,o=e.reverseMap;t=a,r=o,n=g(v.canonical,!1).map}}function y(e){return m(),t.get(e)||null}function x(e){return m(),r.get(e)||null}function b(e){return m(),n.get(e)||null}var _=i.L,w=i.R,S=i.EN,U=i.ES,T=i.ET,P=i.AN,k=i.CS,C=i.B,E=i.S,A=i.ON,D=i.BN,M=i.NSM,F=i.AL,R=i.LRO,O=i.RLO,I=i.LRE,B=i.RLE,z=i.PDF,j=i.LRI,L=i.RLI,G=i.FSI,N=i.PDI;function V(e){return function(){if(!a){var e=g("14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",!0),t=e.map;e.reverseMap.forEach(function(e,r){t.set(r,e)}),a=t}}(),a.get(e)||null}function W(e,t,r,n){var a=e.length;r=Math.max(0,null==r?0:+r),n=Math.min(a-1,null==n?a-1:+n);var o=[];return t.paragraphs.forEach(function(a){var i=Math.max(r,a.start),s=Math.min(n,a.end);if(i<s){for(var l=t.levels.slice(i,s+1),c=s;c>=i&&p(e[c])&d;c--)l[c]=a.level;for(var u=a.level,f=1/0,h=0;h<l.length;h++){var v=l[h];v>u&&(u=v),v<f&&(f=1|v)}for(var g=u;g>=f;g--)for(var m=0;m<l.length;m++)if(l[m]>=g){for(var y=m;m+1<l.length&&l[m+1]>=g;)m++;m>y&&o.push([y+i,m+i])}}}),o}function X(e,t,r,n){for(var a=W(e,t,r,n),o=[],i=0;i<e.length;i++)o[i]=i;return a.forEach(function(e){for(var t=e[0],r=e[1],n=o.slice(t,r+1),a=n.length;a--;)o[r-a]=n[a]}),o}return e.closingToOpeningBracket=x,e.getBidiCharType=p,e.getBidiCharTypeName=function(e){return s[p(e)]},e.getCanonicalBracket=b,e.getEmbeddingLevels=function(e,t){for(var r=new Uint32Array(e.length),n=0;n<e.length;n++)r[n]=p(e[n]);var a=new Map;function o(e,t){var n=r[e];r[e]=t,a.set(n,a.get(n)-1),n&u&&a.set(u,a.get(u)-1),a.set(t,(a.get(t)||0)+1),t&u&&a.set(u,(a.get(u)||0)+1)}for(var i=new Uint8Array(e.length),s=new Map,h=[],v=null,g=0;g<e.length;g++)v||h.push(v={start:g,end:e.length-1,level:"rtl"===t?1:"ltr"===t?0:tA(g,!1)}),r[g]&C&&(v.end=g,v=null);for(var m=B|I|O|R|l|N|z|C,V=function(e){return e+(1&e?1:2)},W=function(e){return e+(1&e?2:1)},X=0;X<h.length;X++){var q=[{_level:(v=h[X]).level,_override:0,_isolate:0}],H=void 0,Y=0,$=0,Z=0;a.clear();for(var K=v.start;K<=v.end;K++){var Q=r[K];if(H=q[q.length-1],a.set(Q,(a.get(Q)||0)+1),Q&u&&a.set(u,(a.get(u)||0)+1),Q&m){if(Q&(B|I)){i[K]=H._level;var J=(Q===B?W:V)(H._level);!(J<=125)||Y||$?!Y&&$++:q.push({_level:J,_override:0,_isolate:0})}else if(Q&(O|R)){i[K]=H._level;var ee=(Q===O?W:V)(H._level);!(ee<=125)||Y||$?!Y&&$++:q.push({_level:ee,_override:Q&O?w:_,_isolate:0})}else if(Q&l){Q&G&&(Q=1===tA(K+1,!0)?L:j),i[K]=H._level,H._override&&o(K,H._override);var et=(Q===L?W:V)(H._level);et<=125&&0===Y&&0===$?(Z++,q.push({_level:et,_override:0,_isolate:1,_isolInitIndex:K})):Y++}else if(Q&N){if(Y>0)Y--;else if(Z>0){for($=0;!q[q.length-1]._isolate;)q.pop();var er=q[q.length-1]._isolInitIndex;null!=er&&(s.set(er,K),s.set(K,er)),q.pop(),Z--}H=q[q.length-1],i[K]=H._level,H._override&&o(K,H._override)}else Q&z?(0===Y&&($>0?$--:!H._isolate&&q.length>1&&(q.pop(),H=q[q.length-1])),i[K]=H._level):Q&C&&(i[K]=v.level)}else i[K]=H._level,H._override&&Q!==D&&o(K,H._override)}for(var en=[],ea=null,eo=v.start;eo<=v.end;eo++){var ei=r[eo];if(!(ei&f)){var es=i[eo],el=ei&l,ec=ei===N;ea&&es===ea._level?(ea._end=eo,ea._endsWithIsolInit=el):en.push(ea={_start:eo,_end:eo,_level:es,_startsWithPDI:ec,_endsWithIsolInit:el})}}for(var eu=[],ef=0;ef<en.length;ef++){var ed=en[ef];if(!ed._startsWithPDI||ed._startsWithPDI&&!s.has(ed._start)){for(var eh=[ea=ed],ep=void 0;ea&&ea._endsWithIsolInit&&null!=(ep=s.get(ea._end));)for(var ev=ef+1;ev<en.length;ev++)if(en[ev]._start===ep){eh.push(ea=en[ev]);break}for(var eg=[],em=0;em<eh.length;em++)for(var ey=eh[em],ex=ey._start;ex<=ey._end;ex++)eg.push(ex);for(var eb=i[eg[0]],e_=v.level,ew=eg[0]-1;ew>=0;ew--)if(!(r[ew]&f)){e_=i[ew];break}var eS=eg[eg.length-1],eU=i[eS],eT=v.level;if(!(r[eS]&l)){for(var eP=eS+1;eP<=v.end;eP++)if(!(r[eP]&f)){eT=i[eP];break}}eu.push({_seqIndices:eg,_sosType:Math.max(e_,eb)%2?w:_,_eosType:Math.max(eT,eU)%2?w:_})}}for(var ek=0;ek<eu.length;ek++){var eC=eu[ek],eE=eC._seqIndices,eA=eC._sosType,eD=eC._eosType,eM=1&i[eE[0]]?w:_;if(a.get(M))for(var eF=0;eF<eE.length;eF++){var eR=eE[eF];if(r[eR]&M){for(var eO=eA,eI=eF-1;eI>=0;eI--)if(!(r[eE[eI]]&f)){eO=r[eE[eI]];break}o(eR,eO&(l|N)?A:eO)}}if(a.get(S))for(var eB=0;eB<eE.length;eB++){var ez=eE[eB];if(r[ez]&S)for(var ej=eB-1;ej>=-1;ej--){var eL=-1===ej?eA:r[eE[ej]];if(eL&c){eL===F&&o(ez,P);break}}}if(a.get(F))for(var eG=0;eG<eE.length;eG++){var eN=eE[eG];r[eN]&F&&o(eN,w)}if(a.get(U)||a.get(k))for(var eV=1;eV<eE.length-1;eV++){var eW=eE[eV];if(r[eW]&(U|k)){for(var eX=0,eq=0,eH=eV-1;eH>=0&&(eX=r[eE[eH]])&f;eH--);for(var eY=eV+1;eY<eE.length&&(eq=r[eE[eY]])&f;eY++);eX===eq&&(r[eW]===U?eX===S:eX&(S|P))&&o(eW,eX)}}if(a.get(S)){for(var e$=0;e$<eE.length;e$++)if(r[eE[e$]]&S){for(var eZ=e$-1;eZ>=0&&r[eE[eZ]]&(T|f);eZ--)o(eE[eZ],S);for(e$++;e$<eE.length&&r[eE[e$]]&(T|f|S);e$++)r[eE[e$]]!==S&&o(eE[e$],S)}}if(a.get(T)||a.get(U)||a.get(k))for(var eK=0;eK<eE.length;eK++){var eQ=eE[eK];if(r[eQ]&(T|U|k)){o(eQ,A);for(var eJ=eK-1;eJ>=0&&r[eE[eJ]]&f;eJ--)o(eE[eJ],A);for(var e1=eK+1;e1<eE.length&&r[eE[e1]]&f;e1++)o(eE[e1],A)}}if(a.get(S))for(var e0=0,e2=eA;e0<eE.length;e0++){var e3=eE[e0],e4=r[e3];e4&S?e2===_&&o(e3,_):e4&c&&(e2=e4)}if(a.get(u)){for(var e5=w|S|P,e6=e5|_,e8=[],e7=[],e9=0;e9<eE.length;e9++)if(r[eE[e9]]&u){var te=e[eE[e9]],tt=void 0;if(null!==y(te)){if(e7.length<63)e7.push({char:te,seqIndex:e9});else break}else if(null!==(tt=x(te)))for(var tr=e7.length-1;tr>=0;tr--){var tn=e7[tr].char;if(tn===tt||tn===x(b(te))||y(b(tn))===te){e8.push([e7[tr].seqIndex,e9]),e7.length=tr;break}}}e8.sort(function(e,t){return e[0]-t[0]});for(var ta=0;ta<e8.length;ta++){for(var to=e8[ta],ti=to[0],ts=to[1],tl=!1,tc=0,tu=ti+1;tu<ts;tu++){var tf=eE[tu];if(r[tf]&e6){tl=!0;var td=r[tf]&e5?w:_;if(td===eM){tc=td;break}}}if(tl&&!tc){tc=eA;for(var th=ti-1;th>=0;th--){var tp=eE[th];if(r[tp]&e6){var tv=r[tp]&e5?w:_;tc=tv!==eM?tv:eM;break}}}if(tc){if(r[eE[ti]]=r[eE[ts]]=tc,tc!==eM){for(var tg=ti+1;tg<eE.length;tg++)if(!(r[eE[tg]]&f)){p(e[eE[tg]])&M&&(r[eE[tg]]=tc);break}}if(tc!==eM){for(var tm=ts+1;tm<eE.length;tm++)if(!(r[eE[tm]]&f)){p(e[eE[tm]])&M&&(r[eE[tm]]=tc);break}}}}for(var ty=0;ty<eE.length;ty++)if(r[eE[ty]]&u){for(var tx=ty,tb=ty,t_=eA,tw=ty-1;tw>=0;tw--)if(r[eE[tw]]&f)tx=tw;else{t_=r[eE[tw]]&e5?w:_;break}for(var tS=eD,tU=ty+1;tU<eE.length;tU++)if(r[eE[tU]]&(u|f))tb=tU;else{tS=r[eE[tU]]&e5?w:_;break}for(var tT=tx;tT<=tb;tT++)r[eE[tT]]=t_===tS?t_:eM;ty=tb}}}for(var tP=v.start;tP<=v.end;tP++){var tk=i[tP],tC=r[tP];if(1&tk?tC&(_|S|P)&&i[tP]++:tC&w?i[tP]++:tC&(P|S)&&(i[tP]+=2),tC&f&&(i[tP]=0===tP?v.level:i[tP-1]),tP===v.end||p(e[tP])&(E|C))for(var tE=tP;tE>=0&&p(e[tE])&d;tE--)i[tE]=v.level}}return{levels:i,paragraphs:h};function tA(t,n){for(var a=t;a<e.length;a++){var o=r[a];if(o&(w|F))return 1;if(o&(C|_)||n&&o===N)break;if(o&l){var i=function(t){for(var n=1,a=t+1;a<e.length;a++){var o=r[a];if(o&C)break;if(o&N){if(0==--n)return a}else o&l&&n++}return -1}(a);a=-1===i?e.length:i}}return 0}},e.getMirroredCharacter=V,e.getMirroredCharactersMap=function(e,t,r,n){var a=e.length;r=Math.max(0,null==r?0:+r),n=Math.min(a-1,null==n?a-1:+n);for(var o=new Map,i=r;i<=n;i++)if(1&t[i]){var s=V(e[i]);null!==s&&o.set(i,s)}return o},e.getReorderSegments=W,e.getReorderedIndices=X,e.getReorderedString=function(e,t,r,n){var a=X(e,t,r,n),o=[].concat(e);return a.forEach(function(r,n){o[n]=(1&t.levels[r]?V(e[r]):null)||e[r]}),o.join("")},e.openingToClosingBracket=y,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}],init(e,t,r,n){let{defaultFontURL:a}=e;return r(t,n(),{defaultFontURL:a})}}),ef=R({name:"Typesetter",dependencies:[eu,B],init:(e,t)=>function(r){let n=new t;return e.typeset(r,n.resolve),n},getTransferables(e){let t=[e.glyphPositions.buffer,e.glyphIds.buffer];return e.caretPositions&&t.push(e.caretPositions.buffer),e.glyphColors&&t.push(e.glyphColors.buffer),t}}),ed=(()=>{let e={},t="aTroikaGlyphIndex";class r extends c.InstancedBufferGeometry{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new c.Sphere,this.boundingBox=new c.Box3}computeBoundingSphere(){}computeBoundingBox(){}setSide(e){let t=this.getIndex().count;this.setDrawRange(e===c.BackSide?t/2:0,e===c.DoubleSide?t:t/2)}set detail(t){if(t!==this._detail){this._detail=t,("number"!=typeof t||t<1)&&(t=1);let r=function(t){let r=e[t];if(!r){let n=new c.PlaneBufferGeometry(1,1,t,t),a=n.clone(),o=n.attributes,i=a.attributes,s=new c.BufferGeometry,l=o.uv.count;for(let e=0;e<l;e++)i.position.array[3*e]*=-1,i.normal.array[3*e+2]*=-1;["position","normal","uv"].forEach(e=>{s.setAttribute(e,new c.Float32BufferAttribute([...o[e].array,...i[e].array],o[e].itemSize))}),s.setIndex([...n.index.array,...a.index.array.map(e=>e+l)]),s.translate(.5,.5,0),r=e[t]=s}return r}(t);["position","normal","uv"].forEach(e=>{this.attributes[e]=r.attributes[e].clone()}),this.setIndex(r.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,r,o,i,s){n(this,"aTroikaGlyphBounds",e,4),n(this,t,r,1),n(this,"aTroikaGlyphColor",s,3),this._blockBounds=o,this._chunkedBounds=i,a(this,r.length),this._updateBounds()}_updateBounds(){let e=this._blockBounds;if(e){let{curveRadius:t,boundingBox:r}=this;if(t){let{PI:n,floor:a,min:o,max:i,sin:s,cos:l}=Math,c=n/2,u=2*n,f=Math.abs(t),d=e[0]/f,h=e[2]/f,p=a((d+c)/u)!==a((h+c)/u)?-f:o(s(d)*f,s(h)*f),v=a((d-c)/u)!==a((h-c)/u)?f:i(s(d)*f,s(h)*f),g=a((d+n)/u)!==a((h+n)/u)?2*f:i(f-l(d)*f,f-l(h)*f);r.min.set(p,e[1],t<0?-g:0),r.max.set(v,e[3],t<0?0:g)}else r.min.set(e[0],e[1],0),r.max.set(e[2],e[3],0);r.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let r=this.getAttribute(t).count,n=this._chunkedBounds;if(n)for(let t=n.length;t--;){r=n[t].end;let a=n[t].rect;if(a[1]<e.w&&a[3]>e.y&&a[0]<e.z&&a[2]>e.x)break}a(this,r)}}function n(e,t,r,n){let a=e.getAttribute(t);r?a&&a.array.length===r.length?(a.array.set(r),a.needsUpdate=!0):(e.setAttribute(t,new c.InstancedBufferAttribute(r,n)),delete e._maxInstanceCount,e.dispose()):a&&e.deleteAttribute(t)}function a(e,t){e[e.hasOwnProperty("instanceCount")?"instanceCount":"maxInstancedCount"]=t}return r.prototype.setAttribute||(r.prototype.setAttribute=function(e,t){return this.attributes[e]=t,this}),r})(),eh=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaDistanceOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,ep=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaDistanceOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaDistanceOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,ev=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaDistanceOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaOutlineOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,eg=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaDistanceOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`,em=(()=>{let e=new c.MeshBasicMaterial({color:16777215,side:c.DoubleSide,transparent:!0}),t=new c.Matrix4,r=new c.Vector3,n=new c.Vector3,a=[],o=new c.Vector3,i="+x+y";function s(e){return Array.isArray(e)?e[0]:e}let l=()=>{let t=new c.Mesh(new c.PlaneBufferGeometry(1,1),e);return l=()=>t,t},u=()=>{let t=new c.Mesh(new c.PlaneBufferGeometry(1,1,32,1),e);return u=()=>t,t},f={type:"syncstart"},d={type:"synccomplete"},h=["font","fontSize","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],p=h.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class v extends c.Mesh{constructor(){super(new ed,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.fontSize=.1,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=8421504,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=i,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(f),es({text:this.text,font:this.font,fontSize:this.fontSize||.1,letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF},t=>{this._isSyncing=!1,this._textRenderInfo=t,this.geometry.updateGlyphs(t.glyphBounds,t.glyphAtlasIndices,t.blockBounds,t.chunkedBounds,t.glyphColors);let r=this._queuedSyncs;r&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{r.forEach(e=>e&&e())})),this.dispatchEvent(d),e&&e()})))}onBeforeRender(e,t,r,n,a,o){this.sync(),a.isTroikaTextMaterial&&this._prepareForRender(a),a._hadOwnSide=a.hasOwnProperty("side"),this.geometry.setSide(a._actualSide=a.side),a.side=c.FrontSide}onAfterRender(e,t,r,n,a,o){a._hadOwnSide?a.side=a._actualSide:delete a.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let t=this._derivedMaterial,r=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=e.clone());if(t&&t.baseMaterial===r||(t=this._derivedMaterial=function(e){let t=function e(t,r){let n=function(e){let t=JSON.stringify(e,Y),r=Z.get(t);return null==r&&Z.set(t,r=++$),r}(r),a=W.get(t);if(a||W.set(t,a=Object.create(null)),a[n])return new a[n];let o=`_onBeforeCompile${n}`,i=function(e){t.onBeforeCompile.call(this,e);let a=this.customProgramCacheKey()+"|"+e.vertexShader+"|"+e.fragmentShader,i=X[a];if(!i){let t=function({vertexShader:e,fragmentShader:t},r,n){let{vertexDefs:a,vertexMainIntro:o,vertexMainOutro:i,vertexTransform:s,fragmentDefs:l,fragmentMainIntro:c,fragmentMainOutro:u,fragmentColorTransform:f,customRewriter:d,timeUniform:h}=r;if(a=a||"",o=o||"",i=i||"",l=l||"",c=c||"",u=u||"",(s||d)&&(e=L(e)),(f||d)&&(t=L(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,"\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"))),d){let r=d({vertexShader:e,fragmentShader:t});e=r.vertexShader,t=r.fragmentShader}if(f){let e=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,t=>(e.push(t),"")),u=`${f}
${e.join("\n")}
${u}`}if(h){let e=`
uniform float ${h};
`;a=e+a,l=e+l}return s&&(e=`vec3 troika_position_${n};
vec3 troika_normal_${n};
vec2 troika_uv_${n};
${e}
`,a=`${a}
void troikaVertexTransform${n}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${s}
}
`,o=`
troika_position_${n} = vec3(position);
troika_normal_${n} = vec3(normal);
troika_uv_${n} = vec2(uv);
troikaVertexTransform${n}(troika_position_${n}, troika_normal_${n}, troika_uv_${n});
${o}
`,e=e.replace(/\b(position|normal|uv)\b/g,(e,t,r,a)=>/\battribute\s+vec[23]\s+$/.test(a.substr(0,r))?t:`troika_${t}_${n}`)),{vertexShader:e=H(e,n,a,o,i),fragmentShader:t=H(t,n,l,c,u)}}(e,r,n);i=X[a]=t}e.vertexShader=i.vertexShader,e.fragmentShader=i.fragmentShader,N(e.uniforms,this.uniforms),r.timeUniform&&(e.uniforms[r.timeUniform]={get value(){return Date.now()-V}}),this[o]&&this[o](e)},s=function(){return l(r.chained?t:t.clone())},l=function(e){let a=Object.create(e,u);return Object.defineProperty(a,"baseMaterial",{value:t}),Object.defineProperty(a,"id",{value:q++}),a.uuid=function(){let e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,r=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(G[255&e]+G[e>>8&255]+G[e>>16&255]+G[e>>24&255]+"-"+G[255&t]+G[t>>8&255]+"-"+G[t>>16&15|64]+G[t>>24&255]+"-"+G[63&r|128]+G[r>>8&255]+"-"+G[r>>16&255]+G[r>>24&255]+G[255&n]+G[n>>8&255]+G[n>>16&255]+G[n>>24&255]).toUpperCase()}(),a.uniforms=N({},e.uniforms,r.uniforms),a.defines=N({},e.defines,r.defines),a.defines[`TROIKA_DERIVED_MATERIAL_${n}`]="",a.extensions=N({},e.extensions,r.extensions),a._listeners=void 0,a},u={constructor:{value:s},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return t.customProgramCacheKey()+"|"+n}},onBeforeCompile:{get:()=>i,set(e){this[o]=e}},copy:{writable:!0,configurable:!0,value:function(e){return t.copy.call(this,e),t.isShaderMaterial||t.isDerivedMaterial||(N(this.extensions,e.extensions),N(this.defines,e.defines),N(this.uniforms,c.UniformsUtils.clone(e.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){return l(new t.constructor).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let n=this._depthMaterial;return n||((n=this._depthMaterial=e(t.isDerivedMaterial?t.getDepthMaterial():new c.MeshDepthMaterial({depthPacking:c.RGBADepthPacking}),r)).defines.IS_DEPTH_MATERIAL="",n.uniforms=this.uniforms),n}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let n=this._distanceMaterial;return n||((n=this._distanceMaterial=e(t.isDerivedMaterial?t.getDistanceMaterial():new c.MeshDistanceMaterial,r)).defines.IS_DISTANCE_MATERIAL="",n.uniforms=this.uniforms),n}},dispose:{writable:!0,configurable:!0,value(){let{_depthMaterial:e,_distanceMaterial:r}=this;e&&e.dispose(),r&&r.dispose(),t.dispose.call(this)}}};return a[n]=s,new s}(e,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new c.Vector2},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new c.Vector4(0,0,0,0)},uTroikaClipRect:{value:new c.Vector4(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new c.Vector2},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new c.Color},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new c.Matrix3},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:eh,vertexTransform:ep,fragmentDefs:ev,fragmentColorTransform:eg,customRewriter({vertexShader:e,fragmentShader:t}){let r=/\buniform\s+vec3\s+diffuse\b/;return r.test(t)&&(t=t.replace(r,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),r.test(e)||(e=e.replace(j,"uniform vec3 diffuse;\n$&\nvTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;\n"))),{vertexShader:e,fragmentShader:t}}});return t.transparent=!0,Object.defineProperties(t,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),t}(r),r.addEventListener("dispose",function e(){r.removeEventListener("dispose",e),t.dispose()})),!this.outlineWidth&&!this.outlineBlur&&!this.outlineOffsetX&&!this.outlineOffsetY)return t;{let e=t._outlineMtl;return e||((e=t._outlineMtl=Object.create(t,{id:{value:t.id+.1}})).isTextOutlineMaterial=!0,e.depthWrite=!1,e.map=null,t.addEventListener("dispose",function r(){t.removeEventListener("dispose",r),e.dispose()})),[e,t]}}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return s(this.material).getDepthMaterial()}get customDistanceMaterial(){return s(this.material).getDistanceMaterial()}_prepareForRender(e){let a=e.isTextOutlineMaterial,s=e.uniforms,l=this.textRenderInfo;if(l){let e,t,r;let{sdfTexture:n,blockBounds:o}=l;s.uTroikaSDFTexture.value=n,s.uTroikaSDFTextureSize.value.set(n.image.width,n.image.height),s.uTroikaSDFGlyphSize.value=l.sdfGlyphSize,s.uTroikaSDFExponent.value=l.sdfExponent,s.uTroikaTotalBounds.value.fromArray(o),s.uTroikaUseGlyphColors.value=!a&&!!l.glyphColors;let i=0,c=0,u=0,f=0,d=0;if(a){let{outlineWidth:t,outlineOffsetX:r,outlineOffsetY:n,outlineBlur:a,outlineOpacity:o}=this;i=this._parsePercent(t)||0,c=Math.max(0,this._parsePercent(a)||0),e=o,f=this._parsePercent(r)||0,d=this._parsePercent(n)||0}else(u=Math.max(0,this._parsePercent(this.strokeWidth)||0))&&(r=this.strokeColor,s.uTroikaStrokeColor.value.set(null==r?8421504:r),null==(t=this.strokeOpacity)&&(t=1)),e=this.fillOpacity;s.uTroikaDistanceOffset.value=i,s.uTroikaPositionOffset.value.set(f,d),s.uTroikaBlurRadius.value=c,s.uTroikaStrokeWidth.value=u,s.uTroikaStrokeOpacity.value=t,s.uTroikaFillOpacity.value=null==e?1:e,s.uTroikaCurveRadius.value=this.curveRadius||0;let h=this.clipRect;if(h&&Array.isArray(h)&&4===h.length)s.uTroikaClipRect.value.fromArray(h);else{let e=100*(this.fontSize||.1);s.uTroikaClipRect.value.set(o[0]-e,o[1]-e,o[2]+e,o[3]+e)}this.geometry.applyClipRect(s.uTroikaClipRect.value)}s.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;let u=a?this.outlineColor||0:this.color;if(null==u)delete e.color;else{let t=e.hasOwnProperty("color")?e.color:e.color=new c.Color;(u!==t._input||"object"==typeof u)&&t.set(t._input=u)}let f=this.orientation||i;if(f!==e._orientation){let a=s.uTroikaOrient.value,l=(f=f.replace(/[^-+xyz]/g,""))!==i&&f.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,e,i,s,c]=l;r.set(0,0,0)[i]="-"===e?1:-1,n.set(0,0,0)[c]="-"===s?-1:1,t.lookAt(o,r.cross(n),n),a.setFromMatrix4(t)}else a.identity();e._orientation=f}}_parsePercent(e){if("string"==typeof e){let t=e.match(/^(-?[\d.]+)%$/),r=t?parseFloat(t[1]):NaN;e=(isNaN(r)?0:r/100)*this.fontSize}return e}localPositionToTextCoords(e,t=new c.Vector2){t.copy(e);let r=this.curveRadius;return r&&(t.x=Math.atan2(e.x,Math.abs(r)-Math.abs(e.z))*Math.abs(r)),t}worldPositionToTextCoords(e,t=new c.Vector2){return r.copy(e),this.localPositionToTextCoords(this.worldToLocal(r),t)}raycast(e,t){let{textRenderInfo:r,curveRadius:n}=this;if(r){let o=r.blockBounds,i=n?u():l(),s=i.geometry,{position:c,uv:f}=s.attributes;for(let e=0;e<f.count;e++){let t=o[0]+f.getX(e)*(o[2]-o[0]),r=o[1]+f.getY(e)*(o[3]-o[1]),a=0;n&&(a=n-Math.cos(t/n)*n,t=Math.sin(t/n)*n),c.setXYZ(e,t,r,a)}s.boundingSphere=this.geometry.boundingSphere,s.boundingBox=this.geometry.boundingBox,i.matrixWorld=this.matrixWorld,i.material.side=this.material.side,a.length=0,i.raycast(e,a);for(let e=0;e<a.length;e++)a[e].object=this,t.push(a[e])}}copy(e){let t=this.geometry;return super.copy(e),this.geometry=t,p.forEach(t=>{this[t]=e[t]}),this}clone(){return new this.constructor().copy(this)}}h.forEach(e=>{let t="_private_"+e;Object.defineProperty(v.prototype,e,{get(){return this[t]},set(e){e!==this[t]&&(this[t]=e,this._needsSync=!0)}})});let g=!1;return Object.defineProperty(v.prototype,"anchor",{get(){return this._deprecated_anchor},set(e){this._deprecated_anchor=e,g||(console.warn("TextMesh: `anchor` has been deprecated; use `anchorX` and `anchorY` instead."),g=!0),Array.isArray(e)?(this.anchorX=`${100*(+e[0]||0)}%`,this.anchorY=`${100*(+e[1]||0)}%`):this.anchorX=this.anchorY=0}}),v})();new WeakMap,new WeakMap;var ey=r(6924);let ex=l.forwardRef(({anchorX:e="center",anchorY:t="middle",font:r,children:n,characters:a,onSync:o,...i},c)=>{let u=(0,s.w)(({invalidate:e})=>e),[f]=l.useState(()=>new em),[d,h]=l.useMemo(()=>{let e=[],t="";return l.Children.forEach(n,r=>{"string"==typeof r||"number"==typeof r?t+=r:e.push(r)}),[e,t]},[n]);return(0,ey.Rq)(()=>new Promise(e=>(function({font:e,characters:t,sdfGlyphSize:r},n){es({font:e,sdfGlyphSize:r,text:Array.isArray(t)?t.join("\n"):""+t},n)})({font:r,characters:a},e)),["troika-text",r,a]),l.useLayoutEffect(()=>void f.sync(()=>{u(),o&&o(f)})),l.useEffect(()=>()=>f.dispose(),[f]),l.createElement("primitive",(0,w.Z)({object:f,ref:c,font:r,text:h,anchorX:e,anchorY:t},i),d)});function eb(e){let t=(0,l.useRef)(null),r=(0,s.w)(e=>e.camera);return(0,s.x)(()=>{let e=t.current;e&&e.setRotationFromEuler(r.rotation)}),(0,o.jsxs)("mesh",{ref:t,...e,renderOrder:0,children:[o.jsx(ex,{scale:[5,5,5],position:[0,2,0],color:"white",anchorX:"center",anchorY:"middle",children:e.text}),o.jsx("meshStandardMaterial",{transparent:!0})]})}class e_ extends c.DataTextureLoader{constructor(e){super(e),this.type=c.HalfFloatType}parse(e){let t,r,n;let a=function(e,t){switch(e){case 1:throw Error("THREE.RGBELoader: Read Error: "+(t||""));case 2:throw Error("THREE.RGBELoader: Write Error: "+(t||""));case 3:throw Error("THREE.RGBELoader: Bad File Format: "+(t||""));default:throw Error("THREE.RGBELoader: Memory Error: "+(t||""))}},o=function(e,t,r){t=t||1024;let n=e.pos,a=-1,o=0,i="",s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(n,n+128)));for(;0>(a=s.indexOf("\n"))&&o<t&&n<e.byteLength;)i+=s,o+=s.length,n+=128,s+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(n,n+128)));return -1<a&&(!1!==r&&(e.pos+=o+a+1),i+s.slice(0,a))},i=new Uint8Array(e);i.pos=0;let s=function(e){let t,r;let n=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,i=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,l=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};for(!(e.pos>=e.byteLength)&&(t=o(e))||a(1,"no header found"),(r=t.match(/^#\?(\S+)/))||a(3,"bad initial token"),c.valid|=1,c.programtype=r[1],c.string+=t+"\n";!1!==(t=o(e));){if(c.string+=t+"\n","#"===t.charAt(0)){c.comments+=t+"\n";continue}if((r=t.match(n))&&(c.gamma=parseFloat(r[1])),(r=t.match(i))&&(c.exposure=parseFloat(r[1])),(r=t.match(s))&&(c.valid|=2,c.format=r[1]),(r=t.match(l))&&(c.valid|=4,c.height=parseInt(r[1],10),c.width=parseInt(r[2],10)),2&c.valid&&4&c.valid)break}return 2&c.valid||a(3,"missing format specifier"),4&c.valid||a(3,"missing image size specifier"),c}(i),l=s.width,u=s.height,f=function(e,t,r){if(t<8||t>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);t!==(e[2]<<8|e[3])&&a(3,"wrong scanline width");let n=new Uint8Array(4*t*r);n.length||a(4,"unable to allocate buffer space");let o=0,i=0,s=4*t,l=new Uint8Array(4),c=new Uint8Array(s),u=r;for(;u>0&&i<e.byteLength;){i+4>e.byteLength&&a(1),l[0]=e[i++],l[1]=e[i++],l[2]=e[i++],l[3]=e[i++],(2!=l[0]||2!=l[1]||(l[2]<<8|l[3])!=t)&&a(3,"bad rgbe scanline format");let r=0,f;for(;r<s&&i<e.byteLength;){let t=(f=e[i++])>128;if(t&&(f-=128),(0===f||r+f>s)&&a(3,"bad scanline data"),t){let t=e[i++];for(let e=0;e<f;e++)c[r++]=t}else c.set(e.subarray(i,i+f),r),r+=f,i+=f}for(let e=0;e<t;e++){let r=0;n[o]=c[e+r],r+=t,n[o+1]=c[e+r],r+=t,n[o+2]=c[e+r],r+=t,n[o+3]=c[e+r],o+=4}u--}return n}(i.subarray(i.pos),l,u);switch(this.type){case c.FloatType:let d=new Float32Array(4*(n=f.length/4));for(let e=0;e<n;e++)!function(e,t,r,n){let a=Math.pow(2,e[t+3]-128)/255;r[n+0]=e[t+0]*a,r[n+1]=e[t+1]*a,r[n+2]=e[t+2]*a,r[n+3]=1}(f,4*e,d,4*e);t=d,r=c.FloatType;break;case c.HalfFloatType:let h=new Uint16Array(4*(n=f.length/4));for(let e=0;e<n;e++)!function(e,t,r,n){let a=Math.pow(2,e[t+3]-128)/255;r[n+0]=c.DataUtils.toHalfFloat(Math.min(e[t+0]*a,65504)),r[n+1]=c.DataUtils.toHalfFloat(Math.min(e[t+1]*a,65504)),r[n+2]=c.DataUtils.toHalfFloat(Math.min(e[t+2]*a,65504)),r[n+3]=c.DataUtils.toHalfFloat(1)}(f,4*e,h,4*e);t=h,r=c.HalfFloatType;break;default:throw Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:l,height:u,data:t,header:s.string,gamma:s.gamma,exposure:s.exposure,type:r}}setDataType(e){return this.type=e,this}load(e,t,r,n){return super.load(e,function(e,r){switch(e.type){case c.FloatType:case c.HalfFloatType:"colorSpace"in e?e.colorSpace="srgb-linear":e.encoding=3e3,e.minFilter=c.LinearFilter,e.magFilter=c.LinearFilter,e.generateMipmaps=!1,e.flipY=!0}t&&t(e,r)},r,n)}}let ew=e=>e&&e.isCubeTexture;class eS extends c.Mesh{constructor(e,t){var r,n;let a=ew(e),o=Math.floor(Math.log2((null!=(n=a?null==(r=e.image[0])?void 0:r.width:e.image.width)?n:1024)/4)),i=Math.pow(2,o),s=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,l=[a?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/(3*Math.max(i,112))}`,`#define CUBEUV_TEXEL_HEIGHT ${1/(4*i)}`,`#define CUBEUV_MAX_MIP ${o}.0`].join("\n")+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${parseInt(c.REVISION.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
        }
        `;super(new c.IcosahedronGeometry(1,16),new c.ShaderMaterial({uniforms:{map:{value:e},height:{value:(null==t?void 0:t.height)||15},radius:{value:(null==t?void 0:t.radius)||100}},fragmentShader:l,vertexShader:s,side:c.DoubleSide}))}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}let eU={sunset:"venice/venice_sunset_1k.hdr",dawn:"kiara/kiara_1_dawn_1k.hdr",night:"dikhololo/dikhololo_night_1k.hdr",warehouse:"empty-wharehouse/empty_warehouse_01_1k.hdr",forest:"forrest-slope/forest_slope_1k.hdr",apartment:"lebombo/lebombo_1k.hdr",studio:"studio-small-3/studio_small_03_1k.hdr",city:"potsdamer-platz/potsdamer_platz_1k.hdr",park:"rooitou/rooitou_park_1k.hdr",lobby:"st-fagans/st_fagans_interior_1k.hdr"},eT=e=>e.current&&e.current.isScene,eP=e=>eT(e)?e.current:e;function ek({scene:e,background:t=!1,map:r}){let n=(0,s.w)(e=>e.scene);return l.useLayoutEffect(()=>{if(r){let a=eP(e||n),o=a.background,i=a.environment;return"only"!==t&&(a.environment=r),t&&(a.background=r),()=>{"only"!==t&&(a.environment=i),t&&(a.background=o)}}},[n,e,r,t]),null}function eC({files:e=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"],path:t="",preset:r,encoding:n,extensions:a}){if(r){if(!(r in eU))throw Error("Preset must be one of: "+Object.keys(eU).join(", "));e=eU[r],t="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/hdris/"}let o=Array.isArray(e),i=o?c.CubeTextureLoader:e_,l=(0,s.z)(i,o?[e]:e,e=>{e.setPath(t),a&&a(e)}),u=o?l[0]:l;return u.mapping=o?c.CubeReflectionMapping:c.EquirectangularReflectionMapping,u.encoding=(null!=n?n:o)?c.sRGBEncoding:c.LinearEncoding,u}function eE({background:e=!1,scene:t,...r}){let n=eC(r),a=(0,s.w)(e=>e.scene);return l.useLayoutEffect(()=>{let r=eP(t||a),o=r.background,i=r.environment;return"only"!==e&&(r.environment=n),e&&(r.background=n),()=>{"only"!==e&&(r.environment=i),e&&(r.background=o)}},[n,e,t,a]),null}function eA({children:e,near:t=1,far:r=1e3,resolution:n=256,frames:a=1,map:o,background:i=!1,scene:u,files:f,path:d,preset:h,extensions:p}){let v=(0,s.w)(e=>e.gl),g=(0,s.w)(e=>e.scene),m=l.useRef(null),[y]=l.useState(()=>new c.Scene),x=l.useMemo(()=>{let e=new c.WebGLCubeRenderTarget(n);return e.texture.type=c.HalfFloatType,e},[n]);l.useLayoutEffect(()=>{1===a&&m.current.update(v,y);let e=eP(u||g),t=e.background,r=e.environment;return"only"!==i&&(e.environment=x.texture),i&&(e.background=x.texture),()=>{"only"!==i&&(e.environment=r),i&&(e.background=t)}},[e,y,x.texture,u,g,i,a,v]);let b=1;return(0,s.x)(()=>{(a===1/0||b<a)&&(m.current.update(v,y),b++)}),l.createElement(l.Fragment,null,(0,s.g)(l.createElement(l.Fragment,null,e,l.createElement("cubeCamera",{ref:m,args:[t,r,x]}),f||h?l.createElement(eE,{background:!0,files:f,preset:h,path:d,extensions:p}):o?l.createElement(ek,{background:!0,map:o,extensions:p}):null),y))}function eD(e){var t,r,n,a;let o=eC(e),i=e.map||o;l.useMemo(()=>{(0,s.e)({GroundProjectedEnvImpl:eS})},[]);let c=l.useMemo(()=>[i],[i]),u=null==(t=e.ground)?void 0:t.height,f=null==(r=e.ground)?void 0:r.radius,d=null!==(n=null==(a=e.ground)?void 0:a.scale)&&void 0!==n?n:1e3;return l.createElement(l.Fragment,null,l.createElement(ek,(0,w.Z)({},e,{map:i})),l.createElement("groundProjectedEnvImpl",{args:c,scale:d,height:u,radius:f}))}function eM(e){return e.ground?l.createElement(eD,e):e.map?l.createElement(ek,e):e.children?l.createElement(eA,e):l.createElement(eE,e)}var eF=Object.defineProperty,eR=(e,t,r)=>t in e?eF(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,eO=(e,t,r)=>(eR(e,"symbol"!=typeof t?t+"":t,r),r);let eI=new c.Ray,eB=new c.Plane,ez=Math.cos(Math.PI/180*70),ej=(e,t)=>(e%t+t)%t;class eL extends c.EventDispatcher{constructor(e,t){super(),eO(this,"object"),eO(this,"domElement"),eO(this,"enabled",!0),eO(this,"target",new c.Vector3),eO(this,"minDistance",0),eO(this,"maxDistance",1/0),eO(this,"minZoom",0),eO(this,"maxZoom",1/0),eO(this,"minPolarAngle",0),eO(this,"maxPolarAngle",Math.PI),eO(this,"minAzimuthAngle",-1/0),eO(this,"maxAzimuthAngle",1/0),eO(this,"enableDamping",!1),eO(this,"dampingFactor",.05),eO(this,"enableZoom",!0),eO(this,"zoomSpeed",1),eO(this,"enableRotate",!0),eO(this,"rotateSpeed",1),eO(this,"enablePan",!0),eO(this,"panSpeed",1),eO(this,"screenSpacePanning",!0),eO(this,"keyPanSpeed",7),eO(this,"zoomToCursor",!1),eO(this,"autoRotate",!1),eO(this,"autoRotateSpeed",2),eO(this,"reverseOrbit",!1),eO(this,"reverseHorizontalOrbit",!1),eO(this,"reverseVerticalOrbit",!1),eO(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),eO(this,"mouseButtons",{LEFT:c.MOUSE.ROTATE,MIDDLE:c.MOUSE.DOLLY,RIGHT:c.MOUSE.PAN}),eO(this,"touches",{ONE:c.TOUCH.ROTATE,TWO:c.TOUCH.DOLLY_PAN}),eO(this,"target0"),eO(this,"position0"),eO(this,"zoom0"),eO(this,"_domElementKeyEvents",null),eO(this,"getPolarAngle"),eO(this,"getAzimuthalAngle"),eO(this,"setPolarAngle"),eO(this,"setAzimuthalAngle"),eO(this,"getDistance"),eO(this,"listenToKeyEvents"),eO(this,"stopListenToKeyEvents"),eO(this,"saveState"),eO(this,"reset"),eO(this,"update"),eO(this,"connect"),eO(this,"dispose"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=e=>{let t=ej(e,2*Math.PI),n=u.phi;n<0&&(n+=2*Math.PI),t<0&&(t+=2*Math.PI);let a=Math.abs(t-n);2*Math.PI-a<a&&(t<n?t+=2*Math.PI:n+=2*Math.PI),f.phi=t-n,r.update()},this.setAzimuthalAngle=e=>{let t=ej(e,2*Math.PI),n=u.theta;n<0&&(n+=2*Math.PI),t<0&&(t+=2*Math.PI);let a=Math.abs(t-n);2*Math.PI-a<a&&(t<n?t+=2*Math.PI:n+=2*Math.PI),f.theta=t-n,r.update()},this.getDistance=()=>r.object.position.distanceTo(r.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",Z),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",Z),this._domElementKeyEvents=null},this.saveState=()=>{r.target0.copy(r.target),r.position0.copy(r.object.position),r.zoom0=r.object.zoom},this.reset=()=>{r.target.copy(r.target0),r.object.position.copy(r.position0),r.object.zoom=r.zoom0,r.object.updateProjectionMatrix(),r.dispatchEvent(n),r.update(),s=i.NONE},this.update=(()=>{let t=new c.Vector3,a=new c.Vector3(0,1,0),o=new c.Quaternion().setFromUnitVectors(e.up,a),p=o.clone().invert(),v=new c.Vector3,g=new c.Quaternion,m=2*Math.PI;return function(){let y=r.object.position;o.setFromUnitVectors(e.up,a),p.copy(o).invert(),t.copy(y).sub(r.target),t.applyQuaternion(o),u.setFromVector3(t),r.autoRotate&&s===i.NONE&&E(2*Math.PI/60/60*r.autoRotateSpeed),r.enableDamping?(u.theta+=f.theta*r.dampingFactor,u.phi+=f.phi*r.dampingFactor):(u.theta+=f.theta,u.phi+=f.phi);let x=r.minAzimuthAngle,b=r.maxAzimuthAngle;isFinite(x)&&isFinite(b)&&(x<-Math.PI?x+=m:x>Math.PI&&(x-=m),b<-Math.PI?b+=m:b>Math.PI&&(b-=m),x<=b?u.theta=Math.max(x,Math.min(b,u.theta)):u.theta=u.theta>(x+b)/2?Math.max(x,u.theta):Math.min(b,u.theta)),u.phi=Math.max(r.minPolarAngle,Math.min(r.maxPolarAngle,u.phi)),u.makeSafe(),!0===r.enableDamping?r.target.addScaledVector(h,r.dampingFactor):r.target.add(h),r.zoomToCursor&&T||r.object.isOrthographicCamera?u.radius=B(u.radius):u.radius=B(u.radius*d),t.setFromSpherical(u),t.applyQuaternion(p),y.copy(r.target).add(t),r.object.matrixAutoUpdate||r.object.updateMatrix(),r.object.lookAt(r.target),!0===r.enableDamping?(f.theta*=1-r.dampingFactor,f.phi*=1-r.dampingFactor,h.multiplyScalar(1-r.dampingFactor)):(f.set(0,0,0),h.set(0,0,0));let _=!1;if(r.zoomToCursor&&T){let n=null;if(r.object instanceof c.PerspectiveCamera&&r.object.isPerspectiveCamera){let e=t.length();n=B(e*d);let a=e-n;r.object.position.addScaledVector(S,a),r.object.updateMatrixWorld()}else if(r.object.isOrthographicCamera){let e=new c.Vector3(U.x,U.y,0);e.unproject(r.object),r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/d)),r.object.updateProjectionMatrix(),_=!0;let a=new c.Vector3(U.x,U.y,0);a.unproject(r.object),r.object.position.sub(a).add(e),r.object.updateMatrixWorld(),n=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),r.zoomToCursor=!1;null!==n&&(r.screenSpacePanning?r.target.set(0,0,-1).transformDirection(r.object.matrix).multiplyScalar(n).add(r.object.position):(eI.origin.copy(r.object.position),eI.direction.set(0,0,-1).transformDirection(r.object.matrix),Math.abs(r.object.up.dot(eI.direction))<ez?e.lookAt(r.target):(eB.setFromNormalAndCoplanarPoint(r.object.up,r.target),eI.intersectPlane(eB,r.target))))}else r.object instanceof c.OrthographicCamera&&r.object.isOrthographicCamera&&(_=1!==d)&&(r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/d)),r.object.updateProjectionMatrix());return d=1,T=!1,!!(_||v.distanceToSquared(r.object.position)>l||8*(1-g.dot(r.object.quaternion))>l)&&(r.dispatchEvent(n),v.copy(r.object.position),g.copy(r.object.quaternion),_=!1,!0)}})(),this.connect=e=>{e===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),r.domElement=e,r.domElement.style.touchAction="none",r.domElement.addEventListener("contextmenu",K),r.domElement.addEventListener("pointerdown",q),r.domElement.addEventListener("pointercancel",Y),r.domElement.addEventListener("wheel",$)},this.dispose=()=>{var e,t,n,a,o,i;r.domElement&&(r.domElement.style.touchAction="auto"),null==(e=r.domElement)||e.removeEventListener("contextmenu",K),null==(t=r.domElement)||t.removeEventListener("pointerdown",q),null==(n=r.domElement)||n.removeEventListener("pointercancel",Y),null==(a=r.domElement)||a.removeEventListener("wheel",$),null==(o=r.domElement)||o.ownerDocument.removeEventListener("pointermove",H),null==(i=r.domElement)||i.ownerDocument.removeEventListener("pointerup",Y),null!==r._domElementKeyEvents&&r._domElementKeyEvents.removeEventListener("keydown",Z)};let r=this,n={type:"change"},a={type:"start"},o={type:"end"},i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=i.NONE,l=1e-6,u=new c.Spherical,f=new c.Spherical,d=1,h=new c.Vector3,p=new c.Vector2,v=new c.Vector2,g=new c.Vector2,m=new c.Vector2,y=new c.Vector2,x=new c.Vector2,b=new c.Vector2,_=new c.Vector2,w=new c.Vector2,S=new c.Vector3,U=new c.Vector2,T=!1,P=[],k={};function C(){return Math.pow(.95,r.zoomSpeed)}function E(e){r.reverseOrbit||r.reverseHorizontalOrbit?f.theta+=e:f.theta-=e}function A(e){r.reverseOrbit||r.reverseVerticalOrbit?f.phi+=e:f.phi-=e}let D=(()=>{let e=new c.Vector3;return function(t,r){e.setFromMatrixColumn(r,0),e.multiplyScalar(-t),h.add(e)}})(),M=(()=>{let e=new c.Vector3;return function(t,n){!0===r.screenSpacePanning?e.setFromMatrixColumn(n,1):(e.setFromMatrixColumn(n,0),e.crossVectors(r.object.up,e)),e.multiplyScalar(t),h.add(e)}})(),F=(()=>{let e=new c.Vector3;return function(t,n){let a=r.domElement;if(a&&r.object instanceof c.PerspectiveCamera&&r.object.isPerspectiveCamera){let o=r.object.position;e.copy(o).sub(r.target);let i=e.length();D(2*t*(i*=Math.tan(r.object.fov/2*Math.PI/180))/a.clientHeight,r.object.matrix),M(2*n*i/a.clientHeight,r.object.matrix)}else a&&r.object instanceof c.OrthographicCamera&&r.object.isOrthographicCamera?(D(t*(r.object.right-r.object.left)/r.object.zoom/a.clientWidth,r.object.matrix),M(n*(r.object.top-r.object.bottom)/r.object.zoom/a.clientHeight,r.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),r.enablePan=!1)}})();function R(e){r.object instanceof c.PerspectiveCamera&&r.object.isPerspectiveCamera||r.object instanceof c.OrthographicCamera&&r.object.isOrthographicCamera?d/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function O(e){r.object instanceof c.PerspectiveCamera&&r.object.isPerspectiveCamera||r.object instanceof c.OrthographicCamera&&r.object.isOrthographicCamera?d*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function I(e){if(!r.zoomToCursor||!r.domElement)return;T=!0;let t=r.domElement.getBoundingClientRect(),n=e.clientX-t.left,a=e.clientY-t.top,o=t.width,i=t.height;U.x=n/o*2-1,U.y=-(a/i*2)+1,S.set(U.x,U.y,1).unproject(r.object).sub(r.object.position).normalize()}function B(e){return Math.max(r.minDistance,Math.min(r.maxDistance,e))}function z(e){p.set(e.clientX,e.clientY)}function j(e){m.set(e.clientX,e.clientY)}function L(){if(1==P.length)p.set(P[0].pageX,P[0].pageY);else{let e=.5*(P[0].pageX+P[1].pageX),t=.5*(P[0].pageY+P[1].pageY);p.set(e,t)}}function G(){if(1==P.length)m.set(P[0].pageX,P[0].pageY);else{let e=.5*(P[0].pageX+P[1].pageX),t=.5*(P[0].pageY+P[1].pageY);m.set(e,t)}}function N(){let e=P[0].pageX-P[1].pageX,t=P[0].pageY-P[1].pageY;b.set(0,Math.sqrt(e*e+t*t))}function V(e){if(1==P.length)v.set(e.pageX,e.pageY);else{let t=J(e),r=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);v.set(r,n)}g.subVectors(v,p).multiplyScalar(r.rotateSpeed);let t=r.domElement;t&&(E(2*Math.PI*g.x/t.clientHeight),A(2*Math.PI*g.y/t.clientHeight)),p.copy(v)}function W(e){if(1==P.length)y.set(e.pageX,e.pageY);else{let t=J(e),r=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);y.set(r,n)}x.subVectors(y,m).multiplyScalar(r.panSpeed),F(x.x,x.y),m.copy(y)}function X(e){let t=J(e),n=e.pageX-t.x,a=e.pageY-t.y;_.set(0,Math.sqrt(n*n+a*a)),w.set(0,Math.pow(_.y/b.y,r.zoomSpeed)),R(w.y),b.copy(_)}function q(e){var t,n;!1!==r.enabled&&(0===P.length&&(null==(t=r.domElement)||t.ownerDocument.addEventListener("pointermove",H),null==(n=r.domElement)||n.ownerDocument.addEventListener("pointerup",Y)),P.push(e),"touch"===e.pointerType?function(e){switch(Q(e),P.length){case 1:switch(r.touches.ONE){case c.TOUCH.ROTATE:if(!1===r.enableRotate)return;L(),s=i.TOUCH_ROTATE;break;case c.TOUCH.PAN:if(!1===r.enablePan)return;G(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(r.touches.TWO){case c.TOUCH.DOLLY_PAN:if(!1===r.enableZoom&&!1===r.enablePan)return;r.enableZoom&&N(),r.enablePan&&G(),s=i.TOUCH_DOLLY_PAN;break;case c.TOUCH.DOLLY_ROTATE:if(!1===r.enableZoom&&!1===r.enableRotate)return;r.enableZoom&&N(),r.enableRotate&&L(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&r.dispatchEvent(a)}(e):function(e){let t;switch(e.button){case 0:t=r.mouseButtons.LEFT;break;case 1:t=r.mouseButtons.MIDDLE;break;case 2:t=r.mouseButtons.RIGHT;break;default:t=-1}switch(t){case c.MOUSE.DOLLY:if(!1===r.enableZoom)return;I(e),b.set(e.clientX,e.clientY),s=i.DOLLY;break;case c.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===r.enablePan)return;j(e),s=i.PAN}else{if(!1===r.enableRotate)return;z(e),s=i.ROTATE}break;case c.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===r.enableRotate)return;z(e),s=i.ROTATE}else{if(!1===r.enablePan)return;j(e),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&r.dispatchEvent(a)}(e))}function H(e){!1!==r.enabled&&("touch"===e.pointerType?function(e){switch(Q(e),s){case i.TOUCH_ROTATE:if(!1===r.enableRotate)return;V(e),r.update();break;case i.TOUCH_PAN:if(!1===r.enablePan)return;W(e),r.update();break;case i.TOUCH_DOLLY_PAN:if(!1===r.enableZoom&&!1===r.enablePan)return;r.enableZoom&&X(e),r.enablePan&&W(e),r.update();break;case i.TOUCH_DOLLY_ROTATE:if(!1===r.enableZoom&&!1===r.enableRotate)return;r.enableZoom&&X(e),r.enableRotate&&V(e),r.update();break;default:s=i.NONE}}(e):function(e){if(!1!==r.enabled)switch(s){case i.ROTATE:if(!1===r.enableRotate)return;!function(e){v.set(e.clientX,e.clientY),g.subVectors(v,p).multiplyScalar(r.rotateSpeed);let t=r.domElement;t&&(E(2*Math.PI*g.x/t.clientHeight),A(2*Math.PI*g.y/t.clientHeight)),p.copy(v),r.update()}(e);break;case i.DOLLY:if(!1===r.enableZoom)return;_.set(e.clientX,e.clientY),w.subVectors(_,b),w.y>0?R(C()):w.y<0&&O(C()),b.copy(_),r.update();break;case i.PAN:if(!1===r.enablePan)return;y.set(e.clientX,e.clientY),x.subVectors(y,m).multiplyScalar(r.panSpeed),F(x.x,x.y),m.copy(y),r.update()}}(e))}function Y(e){var t,n,a;(function(e){delete k[e.pointerId];for(let t=0;t<P.length;t++)if(P[t].pointerId==e.pointerId){P.splice(t,1);return}})(e),0===P.length&&(null==(t=r.domElement)||t.releasePointerCapture(e.pointerId),null==(n=r.domElement)||n.ownerDocument.removeEventListener("pointermove",H),null==(a=r.domElement)||a.ownerDocument.removeEventListener("pointerup",Y)),r.dispatchEvent(o),s=i.NONE}function $(e){!1!==r.enabled&&!1!==r.enableZoom&&(s===i.NONE||s===i.ROTATE)&&(e.preventDefault(),r.dispatchEvent(a),I(e),e.deltaY<0?O(C()):e.deltaY>0&&R(C()),r.update(),r.dispatchEvent(o))}function Z(e){!1!==r.enabled&&!1!==r.enablePan&&function(e){let t=!1;switch(e.code){case r.keys.UP:F(0,r.keyPanSpeed),t=!0;break;case r.keys.BOTTOM:F(0,-r.keyPanSpeed),t=!0;break;case r.keys.LEFT:F(r.keyPanSpeed,0),t=!0;break;case r.keys.RIGHT:F(-r.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),r.update())}(e)}function K(e){!1!==r.enabled&&e.preventDefault()}function Q(e){let t=k[e.pointerId];void 0===t&&(t=new c.Vector2,k[e.pointerId]=t),t.set(e.pageX,e.pageY)}function J(e){return k[(e.pointerId===P[0].pointerId?P[1]:P[0]).pointerId]}void 0!==t&&this.connect(t),this.update()}}let eG=l.forwardRef(({makeDefault:e,camera:t,regress:r,domElement:n,enableDamping:a=!0,onChange:o,onStart:i,onEnd:c,...u},f)=>{let d=(0,s.w)(e=>e.invalidate),h=(0,s.w)(e=>e.camera),p=(0,s.w)(e=>e.gl),v=(0,s.w)(e=>e.events),g=(0,s.w)(e=>e.set),m=(0,s.w)(e=>e.get),y=(0,s.w)(e=>e.performance),x=t||h,b=n||v.connected||p.domElement,_=l.useMemo(()=>new eL(x),[x]);return(0,s.x)(()=>{_.enabled&&_.update()},-1),l.useEffect(()=>(_.connect(b),()=>void _.dispose()),[b,r,_,d]),l.useEffect(()=>{let e=e=>{d(),r&&y.regress(),o&&o(e)};return _.addEventListener("change",e),i&&_.addEventListener("start",i),c&&_.addEventListener("end",c),()=>{i&&_.removeEventListener("start",i),c&&_.removeEventListener("end",c),_.removeEventListener("change",e)}},[o,i,c,_,d]),l.useEffect(()=>{if(e){let e=m().controls;return g({controls:_}),()=>g({controls:e})}},[e,_]),l.createElement("primitive",(0,w.Z)({ref:f,object:_,enableDamping:a},u))});function eN(e){let t=(0,l.useRef)(null),[r,n]=(0,l.useState)(!1),[a,i]=(0,l.useState)(.2);(0,s.x)((n,o)=>{let s=t.current;if(!s)return;let{clock:l}=n;s.rotation.y+=.1*e.spinSpeed*o,i(c.MathUtils.lerp(a,r?.8:.2,.02))});let[u]=m(["Textures/Donjon/donjon.png"]);return(0,o.jsxs)("mesh",{ref:t,...e,onClick:t=>window.location.href=e.href,onPointerOver:()=>{n(!0),document.body.style.cursor="pointer",e.tooltip&&e.setTooltipName(e.tooltip)},onPointerOut:()=>{n(!1),document.body.style.cursor="auto",e.setTooltipName("")},children:[o.jsx("sphereBufferGeometry",{args:[1,288,288]}),o.jsx("meshMatcapMaterial",{map:u,displacementMap:u,displacementScale:a,flatShading:!0}),e.children]})}function eV(){let[e,t]=(0,l.useState)({x:0,y:0,z:0}),[r,n]=(0,l.useState)(""),a=o.jsx(b,{scale:new c.Vector3(1.5,1.5,1.5)}),i=o.jsx(d,{scale:new c.Vector3(.3,.3,.3),href:"/about",spinSpeed:.01,colorBase:new c.Color("#1B7F99"),colorBeach:new c.Color("#7CC65A"),colorMid:new c.Color("#566A41"),colorPeak:new c.Color("#434C2E"),setTooltipPos:t,setTooltipName:n,tooltip:"About"}),s=o.jsx(d,{scale:new c.Vector3(.1,.1,.1),href:"/",spinSpeed:.1,colorBase:new c.Color("#4C6085"),colorBeach:new c.Color("#39A0ED"),colorMid:new c.Color("#36F1CD"),colorPeak:new c.Color("#13C4A3"),setTooltipPos:t,setTooltipName:n}),u=o.jsx(d,{scale:new c.Vector3(.1,.1,.1),href:"/gallery",spinSpeed:.5,colorBase:new c.Color("#666370"),colorBeach:new c.Color("#9B7874"),colorMid:new c.Color("#D33E43"),colorPeak:new c.Color("#FF220C"),setTooltipPos:t,setTooltipName:n,tooltip:"Gallery"}),f=o.jsx(v,{scale:new c.Vector3(.5,.5,.5),href:"/",spinSpeed:.5,colorBase:new c.Color("#C5E6A6"),colorBeach:new c.Color("#BDD2A6"),colorMid:new c.Color("#B9BEA5"),colorPeak:new c.Color("#A7AAA4"),setTooltipPos:t,setTooltipName:n}),h=o.jsx(eN,{scale:new c.Vector3(.25,.25,.25),href:"/experiments",spinSpeed:-.35,setTooltipPos:t,setTooltipName:n,tooltip:"Experiments"}),p=o.jsx(d,{scale:new c.Vector3(.15,.15,.15),href:"https://mattercollapse.itch.io/",spinSpeed:-1.5,colorBase:new c.Color("#F6AE2D"),colorBeach:new c.Color("#55DDE0"),colorMid:new c.Color("#33658A"),colorPeak:new c.Color("#2F4858"),setTooltipPos:t,setTooltipName:n,tooltip:"Itch.io"});return(0,o.jsxs)(_,{position:new c.Vector3(0,0,0),spinSpeed:0,children:[o.jsx(_,{position:new c.Vector3(0,0,0),spinSpeed:.01,children:a}),(0,o.jsxs)(_,{position:new c.Vector3(0,0,0),spinSpeed:-.01,children:[(0,o.jsxs)(_,{position:new c.Vector3(6,0,0),spinSpeed:-.02,children:[i,o.jsx("mesh",{"rotation-x":.5*Math.PI,children:o.jsx("torusBufferGeometry",{args:[1,.002,4,128]})}),o.jsx("mesh",{"rotation-x":.5*Math.PI,children:o.jsx("torusBufferGeometry",{args:[1.5,.002,4,128]})})]}),o.jsx(_,{position:new c.Vector3(6,0,0),spinSpeed:-.007,children:o.jsx(_,{position:new c.Vector3(1,0,0),spinSpeed:.01,children:s})}),o.jsx(_,{position:new c.Vector3(6,0,0),spinSpeed:.009,children:o.jsx(_,{position:new c.Vector3(-1.5,0,0),spinSpeed:.015,children:u})})]}),o.jsx(_,{position:new c.Vector3(0,0,0),spinSpeed:.005,children:o.jsx(_,{position:new c.Vector3(9,0,0),spinSpeed:.05,children:f})}),o.jsx(_,{position:new c.Vector3(0,0,0),spinSpeed:-.002,children:o.jsx(_,{position:new c.Vector3(11,0,0),spinSpeed:-.001,children:h})}),o.jsx(_,{position:new c.Vector3(0,0,0),spinSpeed:-.001,children:o.jsx(_,{position:new c.Vector3(12,0,0),spinSpeed:.01,children:p})}),o.jsx("mesh",{"rotation-x":.5*Math.PI,children:o.jsx("torusBufferGeometry",{args:[6,.002,4,128]})}),o.jsx("mesh",{"rotation-x":.5*Math.PI,children:o.jsx("torusBufferGeometry",{args:[9,.002,4,128]})}),o.jsx("mesh",{"rotation-x":.5*Math.PI,children:o.jsx("torusBufferGeometry",{args:[11,.002,4,128]})}),o.jsx("mesh",{"rotation-x":.5*Math.PI,children:o.jsx("torusBufferGeometry",{args:[12,.002,4,128]})}),o.jsx(eb,{position:new c.Vector3(e.x,e.y,e.z),text:r})]})}function eW(){return o.jsx("main",{className:"flex h-full flex-col items-center",children:(0,o.jsxs)(i.Xz,{camera:{near:.1,far:1e3,zoom:1,position:[0,15,10],fov:60},dpr:1,children:[o.jsx(eM,{files:"Textures/Environment/My Space Skybox.hdr",background:!0}),o.jsx("ambientLight",{args:[16777215],intensity:.1}),o.jsx("pointLight",{position:[0,0,0],intensity:1,color:"orange"}),o.jsx(eV,{}),o.jsx(eG,{enablePan:!1})]})})}},1506:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s,metadata:()=>i});var n=r(9510),a=r(7366),o=r.n(a);r(7272);let i={title:"Ivan Marozau",description:"Ivan Marozau's Personal Website"};function s({children:e}){return n.jsx("html",{lang:"en",children:n.jsx("body",{className:o().className,style:{height:"100vh",width:"100vw"},children:e})})}},908:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>o,default:()=>s});var n=r(8570);let a=(0,n.createProxy)(String.raw`C:\Users\evanm\Documents\Coding Projects\Websites\Personal Website\app\page.tsx`),{__esModule:o,$$typeof:i}=a;a.default;let s=(0,n.createProxy)(String.raw`C:\Users\evanm\Documents\Coding Projects\Websites\Personal Website\app\page.tsx#default`)},7481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var n=r(6621);let a=e=>[{type:"image/x-icon",sizes:"32x32",url:(0,n.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},7272:()=>{},7055:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[948,82,621,515],()=>r(8550));module.exports=n})();