import React from 'react';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function CoffeeMug() {
  const { mugLifted, toggleMug, triggerSecret } = useSceneStore();

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playJoystickClick();
    toggleMug();
    triggerSecret();
  };

  // Rear-right desk space [4.6, 0.42, 0.8] (Completely clear of floppy disk!)
  const pos: [number, number, number] = mugLifted
    ? [4.6, 0.75, 0.8]
    : [4.6, 0.42, 0.8];

  return (
    <group position={pos} onClick={handleClick}>
      {/* Outer Ceramic Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.24, 0.54, 32]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.3} />
      </mesh>

      {/* Top Ceramic Wall Rim Ring (Elevated at Y = 0.2701, NO coplanar overlap) */}
      <mesh position={[0, 0.2701, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.23, 0.28, 32]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Dark Ceramic Interior Wall */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.40, 32]} />
        <meshStandardMaterial color="#2a221b" roughness={0.6} />
      </mesh>

      {/* Liquid Coffee Surface (Recessed at Y = 0.18, ZERO Z-fighting) */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.228, 0.228, 0.02, 32]} />
        <meshStandardMaterial color="#3a1e05" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* Smooth C-Shaped Ceramic Handle (Pointing Right +X) */}
      <mesh position={[0.28, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.15, 0.04, 16, 32]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.3} />
      </mesh>

      {/* Secret Note under Mug */}
      {mugLifted && (
        <group position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.5, 0.35]} />
            <meshBasicMaterial color="#ffffcc" />
          </mesh>
        </group>
      )}
    </group>
  );
}
