import { useTexture } from "@react-three/drei";
import { Euler, useFrame, useThree } from "@react-three/fiber";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import { ReactNode, useMemo, useRef } from "react";
import { DoubleSide, Matrix4, Vector2, Vector3, type Mesh } from "three";

const fragmentShader = `
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
`

const vertexShader = `
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
`

//uv, position, normal are attributes available only withing the vertex shader
//we use varying to make them available to the fragment shader
//a varying is declared and set in a vertex shader to be read in fragment

const DPR = 1.0;

export function BlackHole(props: { up?: Vector3; scale?: Vector3; rotation?: Euler; children?: ReactNode; } & EventHandlers) {
  const sphereRef = useRef<Mesh>(null);
  const camera = useThree(state => state.camera)

  //texture import
  const [noiseTexture] = useTexture([
    'Textures/noiseTexture.png',
  ])

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_resolution: {
        value: new Vector2(0.0, 0.0),
      },
      u_camPos: {
        value: new Vector3(0.0, 5.0, 5.0),
      },
      u_camRot: {
        value: new Matrix4(),
      },
      u_noiseTex: {
        type: "t",
        value: noiseTexture,
      },
    }),
    [noiseTexture]
  );
  //const [hovered, setHovered] = useState(false) //introduce hover state

  useFrame((state) => {
    const sphere = sphereRef.current;
    if (!sphere) return;
    
    const { clock } = state;
    uniforms.u_time.value = clock.getElapsedTime();
    uniforms.u_resolution.value = new Vector2(
        window.innerWidth * DPR,
        window.innerHeight * DPR
    );
    uniforms.u_camPos.value = camera.position;
    uniforms.u_camRot.value = camera.matrixWorldInverse;
  });

  //useEffect(
  //  () => {document.body.style.cursor = hovered ? 'pointer' : 'auto'}, [hovered]
  //)

  return (
    <mesh ref={sphereRef}
      {...props}
      //onClick={(e) => window.location.href = props.href}
      //onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[3, 30]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
        side={DoubleSide}
      />
      {props.children}
    </mesh>
  );
};
