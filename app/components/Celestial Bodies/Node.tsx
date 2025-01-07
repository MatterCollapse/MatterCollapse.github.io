import { Euler, useFrame } from "@react-three/fiber";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Color, MathUtils, Vector3, type Mesh } from "three";

//uv, position, normal are attributes available only withing the vertex shader
//we use varying to make them available to the fragment shader
//a varying is declared and set in a vertex shader to be read in fragment

export function Node(props: { position?: Vector3; up?: Vector3; rotation?: Euler; children?: ReactNode; spinSpeed:number; }) {
  const sphereRef = useRef<Mesh>(null);

  useFrame(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    sphere.rotation.y += 0.1 * props.spinSpeed;
  });

  return (
    <mesh ref={sphereRef}
      {...props}
    >
      {props.children}
    </mesh>
  );
};
