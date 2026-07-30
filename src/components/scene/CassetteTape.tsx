import React from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function CassetteTape() {
  const { cassetteInserted, toggleCassette } = useSceneStore();

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playJoystickClick();
    toggleCassette();
  };

  return (
    // Rear left side desk space [-3.2, 0.45, -1.6] (Completely clear of Joystick!)
    <group position={[-3.2, 0.45, -1.6]} onClick={handleClick}>
      {/* Datasette Main Box */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.35, 2.2]} />
        <meshStandardMaterial color="#333333" roughness={0.5} />
      </mesh>

      {/* Cassette Well Recess */}
      <mesh position={[0, 0.16, 0.2]}>
        <boxGeometry args={[1.1, 0.08, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Transparent Plastic Lid */}
      <mesh position={[0, 0.21, 0.2]} rotation={[cassetteInserted ? -0.2 : 0, 0, 0]}>
        <boxGeometry args={[1.12, 0.02, 0.82]} />
        <meshStandardMaterial color="#88aaff" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      {/* Control Buttons (Stop, Play, Record, Rewind, FF, Eject) */}
      {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.18, -0.8]}>
          <boxGeometry args={[0.15, 0.12, 0.22]} />
          <meshStandardMaterial color={i === 2 ? '#cc2222' : '#555555'} roughness={0.4} />
        </mesh>
      ))}

      {/* Counter Display */}
      <mesh position={[0.4, 0.18, -0.3]}>
        <boxGeometry args={[0.25, 0.04, 0.15]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  );
}
