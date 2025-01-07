import { Euler, useFrame } from "@react-three/fiber";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Color, MathUtils, Vector3, type Mesh } from "three";

const fragmentShader = `
varying vec3 Normal;
varying vec3 Position;
varying vec2 vUv;
varying float vDisplacement;

uniform float u_time;
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
`

const vertexShader = `
varying vec3 Normal;
varying vec3 Position;
varying vec2 vUv;
varying float vDisplacement;

uniform float u_time;
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
  Normal = normalize(normalMatrix * normal);
  Position = position;
  vUv = uv;

  //Perlin Displacement
  vDisplacement = layeredPerlin(position);
  //vec3 newPosition = position + normal * (u_intensity * vDisplacement + u_raise);
  vec3 newPosition = position + normal * (u_raise);

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  //modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`

//uv, position, normal are attributes available only withing the vertex shader
//we use varying to make them available to the fragment shader
//a varying is declared and set in a vertex shader to be read in fragment

export function TEST_Shader(props: { position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; children?: ReactNode; href:string; } & EventHandlers) {
  const sphereRef = useRef<Mesh>(null);
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_intensity: {
        value: 0.3,
      },
      u_raise: {
        value: 0,
      },
      u_colorBase: { value: new Color("#F74AA9") },
      u_colorBeach: { value: new Color("#A64482") },
      u_colorMid: { value: new Color("#693668") },
      u_colorPeak: { value: new Color("#1B1B3A") },
    }),
    []
  );
  const [hovered, setHovered] = useState(false) //introduce hover state

  useFrame((state) => {
    const sphere = sphereRef.current;
    if (!sphere) return;
    //sphere.rotation.x += 0.01;
    //sphere.rotation.y += 0.01;
    
    const { clock } = state;
    uniforms.u_time.value = 0.2 * clock.getElapsedTime();

    uniforms.u_intensity.value = MathUtils.lerp(
      uniforms.u_intensity.value,
      hovered ? 1.0 : 0.3,
      0.02
    );

    uniforms.u_raise.value = MathUtils.lerp(
      uniforms.u_raise.value,
      hovered ? 1.0 : 0.0,
      0.02
    );
  });

  useEffect(
    () => {document.body.style.cursor = hovered ? 'pointer' : 'auto'}, [hovered]
  )

  return (
    <mesh ref={sphereRef}
      {...props}
      onClick={(e) => window.location.href = props.href}
      onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[2, 30]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
      {props.children}
    </mesh>
  );
};
