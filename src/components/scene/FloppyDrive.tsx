import React from 'react';
import { useSceneStore } from '@/stores/sceneStore';

export function FloppyDrive() {
  const { powerState, floppyInserted } = useSceneStore();
  const isReading = powerState === 'basic_boot' || powerState === 'typing_load';

  return (
    <group position={[3.5, 0.55, -0.8]}>
      {/* 1541 Disk Drive Main Box */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.8, 2.6]} />
        <meshStandardMaterial color="#c4b598" roughness={0.5} />
      </mesh>

      {/* Front Face Plate */}
      <mesh position={[0, 0, 1.31]}>
        <boxGeometry args={[1.55, 0.76, 0.04]} />
        <meshStandardMaterial color="#302d28" roughness={0.4} />
      </mesh>

      {/* 5.25" Disk Slot */}
      <mesh position={[0, 0.08, 1.33]}>
        <boxGeometry args={[1.2, 0.06, 0.02]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

      {/* Disk Latch Lever */}
      <mesh position={[0.45, 0.08, 1.35]} rotation={[0, 0, floppyInserted ? Math.PI / 2 : 0]}>
        <boxGeometry args={[0.06, 0.28, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Power LED (Green) */}
      <mesh position={[-0.5, -0.22, 1.33]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        <meshStandardMaterial color="#44ff44" emissive="#00ff00" emissiveIntensity={1.2} />
      </mesh>

      {/* BUSY Activity LED (Red) */}
      <mesh position={[-0.3, -0.22, 1.33]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        <meshStandardMaterial
          color={isReading ? '#ff2222' : '#441111'}
          emissive={isReading ? '#ff0000' : '#110000'}
          emissiveIntensity={isReading ? 2.5 : 0.1}
        />
      </mesh>
    </group>
  );
}
