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
    // Rear left side desk space [-3.2, 0.45, -1.6]
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

      {/* Cassette Tape Model (Visible inside well) */}
      <group position={[0, 0.19, 0.2]} rotation={[-0.1, 0, 0]}>
        {/* Cassette Shell */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.0, 0.06, 0.65]} />
          <meshStandardMaterial color="#222222" roughness={0.3} />
        </mesh>

        {/* Cassette Red/White Label */}
        <mesh position={[0, 0.032, -0.05]}>
          <boxGeometry args={[0.88, 0.002, 0.35]} />
          <meshStandardMaterial color="#e53e3e" roughness={0.4} />
        </mesh>

        {/* Tape Reels (Left & Right Spool Holes) */}
        {[-0.22, 0.22].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.033, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.005, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        ))}

        {/* Magnetic Tape Ribbon Window */}
        <mesh position={[0, 0, 0.25]}>
          <boxGeometry args={[0.7, 0.05, 0.12]} />
          <meshStandardMaterial color="#3d2314" roughness={0.6} />
        </mesh>
      </group>

      {/* Transparent Plastic Lid (Pivoted smoothly at rear edge hinge [0, 0.18, -0.21]) */}
      <group position={[0, 0.18, -0.21]} rotation={[cassetteInserted ? -0.65 : 0, 0, 0]}>
        <mesh position={[0, 0.02, 0.41]} castShadow>
          <boxGeometry args={[1.12, 0.02, 0.82]} />
          <meshStandardMaterial color="#77aaff" transparent opacity={0.35} roughness={0.1} />
        </mesh>
      </group>

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
