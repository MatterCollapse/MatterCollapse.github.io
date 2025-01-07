import { useFrame } from "@react-three/fiber";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Euler, MathUtils, Vector3, type Mesh } from "three";
import { useTexture } from "@react-three/drei"
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";

export function DonjonPlanet(props: { up?: Vector3; scale?: Vector3; rotation?: Euler; children?: ReactNode; href:string; spinSpeed:number; 
    setTooltipPos: (arg0: { x: number; y: number; z: number; }) => void; setTooltipName: (arg0: string) => void; tooltip?: string; } & EventHandlers) {
    const sphereRef = useRef<Mesh>(null);
    
    const [hovered, setHovered] = useState(false) //introduce hover state
    const [displacement, setDisplacement] = useState(0.2)

  //UseFrame is like Update
  //apply euler rotations to the reference frame
  useFrame((state, delta) => {
    const sphere = sphereRef.current;
    if (!sphere) return;
    
    const { clock } = state;
    //uniforms.u_time.value = 0.2 * clock.getElapsedTime();

    sphere.rotation.y += 0.1 * props.spinSpeed * delta;

    setDisplacement(MathUtils.lerp(
      displacement,
      hovered ? 0.8 : 0.2,
      0.02
    ));
  });

  useEffect(
    () => {
      if(hovered)
      {
        let vector = new Vector3();
        sphereRef.current?.getWorldPosition(vector);

        props.setTooltipPos({ x: vector.x, y: vector.y, z: vector.z });
      }
      
    }, [hovered, props]
  )

  //texture import setup for PBR materials
  const [map] = useTexture([
    'Textures/Donjon/donjon.png',
  ])

  //create a mesh and pass the reference frame
  //args pass parameters that build this specific mesh
  //for sphere: radius, width segments, height segments
  //assign mesh hover events to the hover state
  return (
    <mesh ref={sphereRef}
      {...props}
      onClick={(e) => window.location.href = props.href}
      onPointerOver={() => {
        setHovered(true); 
        document.body.style.cursor = 'pointer';
        
        if(props.tooltip)
          props.setTooltipName(props.tooltip);
      }} 
      onPointerOut={() => {
        setHovered(false); document.body.style.cursor = 'auto';
        props.setTooltipName('');
      }}
    > 
        <sphereBufferGeometry args={[1, 288, 288]} />
        <meshMatcapMaterial 
            map={map}
            displacementMap={map}
            displacementScale={displacement}
            flatShading={true}
        />
        {props.children}
    </mesh>
  );
};