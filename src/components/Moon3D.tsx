'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Moon3D() {
  return (
    <div className="fixed top-0 left-0 w-1/2 h-screen z-0">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <RotatingMoon />
      </Canvas>
    </div>
  );
}

function RotatingMoon() {
  const meshRef = useRef<THREE.Mesh>(null);

  const [colorMap, normalMap] = useLoader(TextureLoader, [
    '/moon_texture.jpg',
    '/moon_normal_8k.png',
  ]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        metalness={0.2}
        roughness={1}
      />
    </mesh>
  );
}