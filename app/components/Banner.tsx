'use client'

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Skyline } from "./Skyline";

/* eslint-disable react/no-unescaped-entities */
export default function Banner(props: {}) {

    return (
        <div style={{ 
            height: "10vw", 
            width: "100%",
        }}>
            <Canvas
                camera={{
                near: 0.1,
                far: 1000,
                zoom: 1,
                position: [0, 0, 5],
                fov: 60,
                }}
                dpr={1.0}
            >
                <Environment files="Textures/Environment/My Space Skybox.hdr" background />
                <ambientLight args={[0xffffff]} intensity={0.1} />
                <Skyline />
            </Canvas>
        </div>
    );
  }