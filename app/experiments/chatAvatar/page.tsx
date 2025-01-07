'use client'

import { MouseFollower } from "@/app/components/MouseFollower";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";


export default function ChatAvatar() {
    
    return(
        <div className="flex h-full flex-col items-center">
            <Canvas
                camera={{
                near: 0.01,
                far: 100,
                zoom: 5,
                position: [0, 0, 2.5],
                fov: 60,
                }}
            >
                <ambientLight args={[0xffffff]} intensity={0.1} />
                <pointLight position={[0, 0, 0]} intensity={1.0} color={"orange"} />
                <MouseFollower />
            </Canvas>
        </div>
    );
}

//<Environment files="Textures/Environment/My Space Skybox.hdr" background />
//