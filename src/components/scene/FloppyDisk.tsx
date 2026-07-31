import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function FloppyDisk() {
  const { floppyInserted, toggleFloppy } = useSceneStore();
  const labelRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const ringRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useFrame((state) => {
    if (!floppyInserted) {
      const pulse = Math.sin(state.clock.elapsedTime * 3.5) * 0.5 + 0.5; // 0.0 to 1.0 smooth cycle
      if (labelRef.current) {
        labelRef.current.emissiveIntensity = 0.3 + pulse * 1.7;
      }
      if (ringRef.current) {
        ringRef.current.emissiveIntensity = 0.4 + pulse * 1.8;
      }
      if (lightRef.current) {
        lightRef.current.intensity = 0.4 + pulse * 1.8;
      }
    } else {
      if (labelRef.current) labelRef.current.emissiveIntensity = 0;
      if (ringRef.current) ringRef.current.emissiveIntensity = 0;
      if (lightRef.current) lightRef.current.intensity = 0;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playFloppyInsert();
    if (!floppyInserted) {
      setTimeout(() => sounds.playFloppyMotor(), 300);
    }
    toggleFloppy();
  };

  // Ejected: Lying FLAT horizontally beside 1541 drive [3.4, 0.16, 1.6]
  // Inserted: Inside 1541 floppy drive slot [3.5, 0.76, -0.2]
  const position: [number, number, number] = floppyInserted
    ? [3.5, 0.76, -0.2]
    : [3.4, 0.16, 1.6];

  const rotation: [number, number, number] = floppyInserted
    ? [0, 0, 0]
    : [0, 0.25, 0];

  return (
    <group position={position} rotation={rotation} onClick={handleClick}>
      {/* 5.25" Black Flexible Jacket */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 0.015, 1.05]} />
        <meshStandardMaterial color="#1a1a1e" roughness={0.6} />
      </mesh>

      {/* Pulsing Hint Border Outline Frame (Visible when ejected on desk) */}
      {!floppyInserted && (
        <mesh position={[0, 0.008, 0]}>
          <boxGeometry args={[1.06, 0.005, 1.11]} />
          <meshStandardMaterial
            ref={ringRef}
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={1.0}
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Center Hole Oval */}
      <mesh position={[0, 0.01, 0.1]}>
        <boxGeometry args={[0.2, 0.005, 0.4]} />
        <meshBasicMaterial color="#050505" />
      </mesh>

      {/* Paper Label Sticker */}
      <mesh position={[0, 0.01, -0.32]}>
        <boxGeometry args={[0.88, 0.002, 0.3]} />
        <meshStandardMaterial color="#f0efe9" roughness={0.3} />
      </mesh>

      {/* Pulsing Glowing Label Stripe (TETRIS 64 HINT) */}
      <mesh position={[0, 0.012, -0.38]}>
        <boxGeometry args={[0.8, 0.001, 0.06]} />
        <meshStandardMaterial
          ref={labelRef}
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Pulsing Hint Point Light above floppy disk when on desk */}
      {!floppyInserted && (
        <pointLight
          ref={lightRef}
          position={[0, 0.25, 0]}
          color="#818cf8"
          intensity={1.5}
          distance={1.8}
        />
      )}
    </group>
  );
}
