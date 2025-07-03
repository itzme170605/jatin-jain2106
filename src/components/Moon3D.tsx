'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Moon3D() {
  return (
    <div className="fixed top-0 left-0 w-1/2 h-screen z-0">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <RotatingMoon />
      </Canvas>
    </div>
  );
}

function RotatingMoon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, '/moon_texture.jpg'); // We'll add this file next

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.11,128, 128]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
