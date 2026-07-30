import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function CRTMonitor() {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const { powerState, turnOn, turnOff } = useSceneStore();
  const isOn = powerState !== 'off' && powerState !== 'turning_off';

  // Smooth Parabolic CRT Glass Tube Curvature ("CRT Ekran Bombesi")
  // Eliminates all corner clipping and Z-fighting staircase artifacts!
  const screenGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.7, 2.0, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const normX = x / 1.35;
      const normY = y / 1.0;
      // Smooth continuous parabolic dome curve (never drops below bezel surface)
      const bulgeZ = 0.12 * (1.0 - 0.4 * normX * normX - 0.4 * normY * normY);
      pos.setZ(i, bulgeZ);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Frame Loop: Directly updates WebGL material texture map every frame
  useFrame(() => {
    const canvas = document.getElementById('crt-canvas') as HTMLCanvasElement | null;
    if (canvas && materialRef.current) {
      if (!textureRef.current) {
        const tex = new THREE.CanvasTexture(canvas);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        textureRef.current = tex;
        materialRef.current.map = tex;
        materialRef.current.needsUpdate = true;
      } else {
        textureRef.current.needsUpdate = true;
      }
    }
  });

  const handlePowerClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isOn) {
      sounds.playPowerOff();
      turnOff();
    } else {
      sounds.playPowerOn();
      turnOn();
    }
  };

  return (
    <group position={[0, 1.45, -2.0]}>
      {/* Main CRT Cabinet Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[3.6, 2.6, 2.4]} />
        <meshStandardMaterial color="#9e937d" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Top Cooling Vents */}
      <mesh position={[0, 1.31, -0.2]}>
        <boxGeometry args={[2.8, 0.03, 1.6]} />
        <meshStandardMaterial color="#554d3e" roughness={0.8} />
      </mesh>

      {/* Front Bezel Frame */}
      <mesh position={[0, 0.05, 1.21]}>
        <boxGeometry args={[3.4, 2.3, 0.05]} />
        <meshStandardMaterial color="#7a705c" roughness={0.5} />
      </mesh>

      {/* 3D Curved CRT Glass Display Screen (Zero Corner Clipping!) */}
      <mesh geometry={screenGeometry} position={[0, 0.15, 1.22]} receiveShadow={false}>
        <meshBasicMaterial
          ref={materialRef}
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      {/* Screen Inner Frame Bevel Border (Recessed behind screen curve to prevent Z-fighting) */}
      <mesh position={[0, 0.15, 1.20]}>
        <boxGeometry args={[2.78, 2.08, 0.02]} />
        <meshStandardMaterial color="#2d2820" roughness={0.6} />
      </mesh>

      {/* Phosphor Blue Glow Light when ON */}
      {isOn && (
        <pointLight
          position={[0, 0.15, 1.4]}
          color="#6366f1"
          intensity={2.2}
          distance={3.5}
        />
      )}

      {/* Front Panel Power Button */}
      <group position={[1.2, -0.98, 1.23]} onClick={handlePowerClick}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.25, 0.16, 0.08]} />
          <meshStandardMaterial color="#222222" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshStandardMaterial
            color={isOn ? '#44ff44' : '#ff4444'}
            emissive={isOn ? '#00ff00' : '#880000'}
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>

      {/* Commodore Model 1702 Badge Text Plate */}
      <mesh position={[-0.6, -0.98, 1.23]}>
        <boxGeometry args={[1.4, 0.12, 0.02]} />
        <meshStandardMaterial color="#222222" roughness={0.3} />
      </mesh>
    </group>
  );
}
