'use client'

import 'react-tooltip/dist/react-tooltip.css'

import { Canvas } from "@react-three/fiber";
import { Planet } from "./components/Celestial Bodies/Planet";
import { VortexPlanet } from "./components/Celestial Bodies/VortexPlanet";
import { BlackHole } from './components/Celestial Bodies/BlackHole';
import { Node } from "./components/Celestial Bodies/Node";
import { Tooltip } from "./components/Tooltip";
import { OrbitControls, Environment } from "@react-three/drei";
//import { Tooltip } from 'react-tooltip'
import { Color, Vector3 } from 'three';
import React, { useState } from 'react';
import { DonjonPlanet } from './components/Celestial Bodies/DonjonPlanet';

function SolarSystem() {
  const [selectedPos, setSelectedPos] = useState({ x: 0, y: 0, z: 0 });
  const [selectedName, setSelectedName] = useState('');

  const ion_12 = <
    BlackHole scale={new Vector3(1.5, 1.5, 1.5)} 
  />;

  const altari = <
    Planet scale={new Vector3(0.3, 0.3, 0.3)} 
    href="/about" 
    spinSpeed={0.01}
    colorBase={new Color("#1B7F99")} colorBeach={new Color("#7CC65A")} colorMid={new Color("#566A41")} colorPeak={new Color("#434C2E")}
    setTooltipPos={setSelectedPos} setTooltipName={setSelectedName}
    tooltip='About' 
  />;

  const deepscape = <Planet 
    scale={new Vector3(0.1, 0.1, 0.1)} 
    href="/" 
    spinSpeed={0.1}
    colorBase={new Color("#4C6085")} colorBeach={new Color("#39A0ED")} colorMid={new Color("#36F1CD")} colorPeak={new Color("#13C4A3")}
    setTooltipPos={setSelectedPos} setTooltipName={setSelectedName} 
  />;

  const geigre = <Planet 
    scale={new Vector3(0.1, 0.1, 0.1)} 
    href="/gallery" 
    spinSpeed={0.5}
    colorBase={new Color("#666370")} colorBeach={new Color("#9B7874")} colorMid={new Color("#D33E43")} colorPeak={new Color("#FF220C")}
    setTooltipPos={setSelectedPos} setTooltipName={setSelectedName} 
    tooltip='Gallery' 
  />;

  const voxel = <VortexPlanet 
    scale={new Vector3(0.5, 0.5, 0.5)} 
    href="/" 
    spinSpeed={0.5}
    colorBase={new Color("#C5E6A6")} colorBeach={new Color("#BDD2A6")} colorMid={new Color("#B9BEA5")} colorPeak={new Color("#A7AAA4")}
    setTooltipPos={setSelectedPos} setTooltipName={setSelectedName} 
  />;

  const eventh = <DonjonPlanet 
    scale={new Vector3(0.25, 0.25, 0.25)} 
    href="/experiments" 
    spinSpeed={-0.35}
    setTooltipPos={setSelectedPos} setTooltipName={setSelectedName} 
    tooltip='Experiments' 
  />;

  const iridia = <Planet 
    scale={new Vector3(0.15, 0.15, 0.15)} 
    href="https://mattercollapse.itch.io/" 
    spinSpeed={-1.5}
    colorBase={new Color("#F6AE2D")} colorBeach={new Color("#55DDE0")} colorMid={new Color("#33658A")} colorPeak={new Color("#2F4858")}
    setTooltipPos={setSelectedPos} setTooltipName={setSelectedName}
    tooltip='Itch.io' 
  />;


  return (
    <Node position={new Vector3(0.0, 0.0, 0.0)} spinSpeed={0.0} >
      <Node position={new Vector3(0.0, 0.0, 0.0)} spinSpeed={0.01} >
          {ion_12}
        </Node>
        <Node position={new Vector3(0.0, 0.0, 0.0)} spinSpeed={-0.01} >
          <Node position={new Vector3(6.0, 0.0, 0.0)} spinSpeed={-0.02} >
            {altari}
            <mesh  rotation-x={Math.PI * 0.5}>
              <torusBufferGeometry args={[1, 0.002, 4, 128]} />
            </mesh>
            <mesh  rotation-x={Math.PI * 0.5}>
              <torusBufferGeometry args={[1.5, 0.002, 4, 128]} />
            </mesh>
          </Node>
          <Node position={new Vector3(6.0, 0.0, 0.0)} spinSpeed={-0.007} >
            <Node position={new Vector3(1.0, 0.0, 0.0)} spinSpeed={0.01}>
              {deepscape}
            </Node>
          </Node>
          <Node position={new Vector3(6.0, 0.0, 0.0)} spinSpeed={0.009} >
            <Node position={new Vector3(-1.5, 0.0, 0.0)} spinSpeed={0.015}>
              {geigre}
            </Node>
          </Node>
        </Node>
        <Node position={new Vector3(0.0, 0.0, 0.0)} spinSpeed={0.005} >
          <Node position={new Vector3(9.0, 0.0, 0.0)} spinSpeed={0.05}>
            {voxel}
          </Node>
        </Node>
        <Node position={new Vector3(0.0, 0.0, 0.0)} spinSpeed={-0.002} >
          <Node position={new Vector3(11.0, 0.0, 0.0)} spinSpeed={-0.001}>
            {eventh}
          </Node>
        </Node>
        <Node position={new Vector3(0.0, 0.0, 0.0)} spinSpeed={-0.001} >
          <Node position={new Vector3(12.0, 0.0, 0.0)} spinSpeed={0.01}>
            {iridia}
          </Node>
        </Node>

        <mesh  rotation-x={Math.PI * 0.5}>
          <torusBufferGeometry args={[6, 0.002, 4, 128]} />
        </mesh>
        <mesh  rotation-x={Math.PI * 0.5}>
          <torusBufferGeometry args={[9, 0.002, 4, 128]} />
        </mesh>
        <mesh  rotation-x={Math.PI * 0.5}>
          <torusBufferGeometry args={[11, 0.002, 4, 128]} />
        </mesh>
        <mesh  rotation-x={Math.PI * 0.5}>
          <torusBufferGeometry args={[12, 0.002, 4, 128]} />
        </mesh>

        <Tooltip position={new Vector3(selectedPos.x, selectedPos.y, selectedPos.z)} text={selectedName} />
    </Node>
  );
}

//to run as dev, type 'npm run dev' in terminal
//dpr is what percent of pixels are calculated and rendered, 0.75 for efficiency, 1.0 for appearance
export default function Home() {
  //flex h-full flex-col items-center justify-between p-24
  return (
    <main className="flex h-full flex-col items-center">
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [0, 15, 10],
          fov: 60,
        }}
        dpr={1.0}
      >
        <Environment files="Textures/Environment/My Space Skybox.hdr" background />
        <ambientLight args={[0xffffff]} intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={1.0} color={"orange"} />
        <SolarSystem />
        <OrbitControls enablePan={false} />
      </Canvas>
    </main>
  );
}