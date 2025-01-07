import { useFrame } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
import { type Mesh, MathUtils } from "three";

export const TEST_hover: FC = () => {
  const sphereRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false) //introduce hover state

  //UseFrame is like Update
  //apply euler rotations to the reference frame
  useFrame((_, delta) => {
    const sphere = sphereRef.current;
    if (!sphere) return;

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

  //create a mesh and pass the reference frame
  //args pass parameters that build this specific mesh
  //for sphere: radius, width segments, height segments
  //assign mesh hover events to the hover state
  return (
    <mesh ref={sphereRef} 
        onClick={(e) => window.location.href = "/about"}
        onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    > 
        <sphereBufferGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color={"blue"} />
    </mesh>
  );
};
