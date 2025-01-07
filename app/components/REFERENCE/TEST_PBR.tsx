import { useFrame } from "@react-three/fiber";
import { FC, useRef, useState } from "react";
import { type Mesh } from "three";
import { useTexture } from "@react-three/drei"

export const TEST_PBR: FC = () => {
  const sphereRef = useRef<Mesh>(null);

  //UseFrame is like Update
  //apply euler rotations to the reference frame
  useFrame(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    //Rotate slowly
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
  });

  //texture import setup for PBR materials
  const [colorMap, displacementMap, normalMap, roughnessMap, MetalnessMap, aoMap] = useTexture([
    'Textures/TEST_Foil/Foil002_1K-PNG_Color.png',
    'Textures/TEST_Foil/Foil002_1K-PNG_Displacement.png',
    'Textures/TEST_Foil/Foil002_1K-PNG_NormalDX.png',
    'Textures/TEST_Foil/Foil002_1K-PNG_Roughness.png',
    'Textures/TEST_Foil/Foil002_1K-PNG_Metalness.png',
    'Textures/TEST_Foil/Foil002_1K-PNG_AmbientOcclusion.png',
  ])

  //create a mesh and pass the reference frame
  //args pass parameters that build this specific mesh
  //for sphere: radius, width segments, height segments
  //assign mesh hover events to the hover state
  return (
    <mesh ref={sphereRef} > 
        <sphereBufferGeometry args={[1, 100, 100]} />
        <meshStandardMaterial 
            map={colorMap}
            displacementMap={displacementMap}
            displacementScale={0.02}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            metalnessMap={MetalnessMap}
            aoMap={aoMap} />
    </mesh>
  );
};
