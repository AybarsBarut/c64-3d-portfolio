import React from 'react';
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
      {/* Ceramic Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.26, 0.54, 32]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.3} />
      </mesh>

      {/* Coffee Surface */}
      <mesh position={[0, 0.23, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
        <meshStandardMaterial color="#3a1e05" roughness={0.2} />
      </mesh>

      {/* Handle (Pointing Right) */}
      <mesh position={[0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.18, 0.05, 16, 32, Math.PI]} />
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
