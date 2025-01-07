import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { FC, useEffect, useMemo, useRef } from "react";
import type { Mesh } from "three";
import { useFBX, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";

export const MouseFollower: FC = () => {
  const { pointer, size } = useThree();

  let mixer = null;
  const gltf = useLoader(GLTFLoader, "/Models/soldier.glb");
  // console.log(scene);
  mixer = new THREE.AnimationMixer(gltf.scene);
  void mixer.clipAction(gltf.animations[0]).play();

  const neck = gltf.scene.getObjectByName( 'mixamorigHead');
  const rightArm = gltf.scene.getObjectByName( 'mixamorigRightArm' );
  const leftArm = gltf.scene.getObjectByName( 'mixamorigLeftArm' );

  gltf.scene.traverse(function(obj) { obj.frustumCulled = false; });

  const armAngle = useRef(1);
  if(rightArm) rightArm.rotation.x = armAngle.current;
  if(leftArm) leftArm.rotation.x = armAngle.current;

  useFrame((state, delta) => {
    if(neck)
    {
      neck.rotation.y = lerp(neck.rotation.y, Math.min(Math.max(pointer.x * size.width / 700, -0.7), 0.7), 5*delta);
      neck.rotation.x = lerp(neck.rotation.x, -Math.min(Math.max(pointer.y * size.width / 700, -0.2), 0.5), 5*delta);
    }

    mixer.update(delta);
  });

  return <primitive object={gltf.scene} position={[0, -1.67, 0]} />;
};

