import { useFrame } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
import { type Mesh, MathUtils } from "three";
import { useTexture } from "@react-three/drei"

export const TEST_multiple: FC = () => {
  const sphereRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false) //introduce hover state

  //UseFrame is like Update
  //apply euler rotations to the reference frame
  useFrame((_, delta) => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    //Rotate slowly
    //sphere.rotation.x += 0.01;
    //sphere.rotation.y += 0.01;

    //Lerp sphere scale when hover toggles
    //Spin speed depends on hover state
    if(hovered)
    {
        sphere.scale.y = sphere.scale.x = sphere.scale.z = MathUtils.lerp(sphere.scale.y, 1.5, 0.25);

        sphere.rotateY(delta * 5);
    }
    else
    {
        sphere.scale.y = sphere.scale.x = sphere.scale.z = MathUtils.lerp(sphere.scale.y, 1, 0.25);

        sphere.rotateY(delta * 1);
    }
  });


  //UseEffect is like Late Update
  //here we use hovered state to set the cursor (and show that the object is clickable)
  useEffect(
    () => {document.body.style.cursor = hovered ? 'pointer' : 'auto'}, [hovered]
  )

  //texture import setup for PBR materials
  const [colorMap, displacementMap, normalMap, roughnessMap, MetalnessMap, aoMap] = useTexture([
    'Textures/Foil/Foil002_1K-PNG_Color.png',
    'Textures/Foil/Foil002_1K-PNG_Displacement.png',
    'Textures/Foil/Foil002_1K-PNG_NormalDX.png',
    'Textures/Foil/Foil002_1K-PNG_Roughness.png',
    'Textures/Foil/Foil002_1K-PNG_Metalness.png',
    'Textures/Foil/Foil002_1K-PNG_AmbientOcclusion.png',
  ])

  //create a mesh and pass the reference frame
  //args pass parameters that build this specific mesh
  //for sphere: radius, width segments, height segments
  //assign mesh hover events to the hover state
  return (
    <mesh ref={sphereRef} 
        onClick={(e) => window.location.href = "/about"}
        onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    > 
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
