import React from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function FloppyDisk() {
  const { floppyInserted, toggleFloppy } = useSceneStore();

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

      {/* Handwritten Label Stripe */}
      <mesh position={[0, 0.012, -0.38]}>
        <boxGeometry args={[0.8, 0.001, 0.05]} />
        <meshBasicMaterial color="#1f4287" />
      </mesh>
    </group>
  );
}
