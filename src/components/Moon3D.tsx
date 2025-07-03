'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';
import { Stars } from '@react-three/drei'; 
import { useThree } from '@react-three/fiber';


export default function Moon3D() {
  return (
    <div className="fixed top-0 right-0 w-full sm:w-1/2 h-screen z-0 pointer-events-none">
    <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <ScrollZoomCamera />
        <RotatingMoon />
        </Canvas>
    </div>
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

function ScrollZoomCamera() {
  const { camera } = useThree();

  useFrame(() => {
    const scrollY = window.scrollY || 0;
    // Map scrollY to zoom range (between 2.5 and 4.5)
    const zoomZ = 3 + Math.sin(scrollY * 0.001) * 1.5;
    camera.position.z = zoomZ;
  });

  return null;
}
