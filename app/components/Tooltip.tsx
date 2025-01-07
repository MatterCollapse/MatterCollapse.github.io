import { Euler, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, type Mesh } from "three";
import { Text } from "@react-three/drei";

//uv, position, normal are attributes available only withing the vertex shader
//we use varying to make them available to the fragment shader
//a varying is declared and set in a vertex shader to be read in fragment

export function Tooltip(props: { position?: Vector3; rotation?: Euler; text?: string}) {
  const ref = useRef<Mesh>(null);
  const camera = useThree(state => state.camera);

  useFrame(() => {
    const Current = ref.current;
    if (!Current) return;

    Current.setRotationFromEuler(camera.rotation);
    
  });

  return (
    <mesh ref={ref}
      {...props}
      renderOrder={0}
    >
      <Text
        scale={[5, 5, 5]}
        position={[0.0, 2.0, 0.0]}
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        {props.text}
      </Text>
      <meshStandardMaterial 
      transparent/>
    </mesh>
  );
};
