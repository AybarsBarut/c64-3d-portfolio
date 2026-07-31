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
    // Rear left side desk position [-3.2, 0.45, -1.6]
    <group position={[-3.2, 0.45, -1.6]} onClick={handleClick}>
      {/* Datasette Main Box Body (C2N Style) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.32, 2.2]} />
        <meshStandardMaterial color="#3a3733" roughness={0.55} metalness={0.1} />
      </mesh>

      {/* Top Silver Metallic Trim Frame */}
      <mesh position={[0, 0.161, -0.2]}>
        <boxGeometry args={[1.35, 0.005, 1.6]} />
        <meshStandardMaterial color="#888899" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Recessed Cassette Well (Sunken into body) */}
      <mesh position={[0, 0.10, 0.2]}>
        <boxGeometry args={[1.15, 0.12, 0.85]} />
        <meshStandardMaterial color="#141414" roughness={0.9} />
      </mesh>

      {/* Cassette Tape Model */}
      <group
        position={[0, cassetteInserted ? 0.22 : 0.11, cassetteInserted ? 0.10 : 0.2]}
        rotation={[cassetteInserted ? -0.35 : 0, 0, 0]}
      >
        {/* Cassette Shell */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.0, 0.05, 0.65]} />
          <meshStandardMaterial color="#222226" roughness={0.35} />
        </mesh>

        {/* Cassette Red/Orange Retro Label */}
        <mesh position={[0, 0.026, -0.05]}>
          <boxGeometry args={[0.88, 0.001, 0.35]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>

        {/* Inner Label White Stripe */}
        <mesh position={[0, 0.027, -0.05]}>
          <boxGeometry args={[0.80, 0.001, 0.12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>

        {/* Tape Reels (Flat Ring Spool Discs, facing UP) */}
        {[-0.22, 0.22].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.028, -0.05]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.002, 24]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} />
          </mesh>
        ))}

        {/* Reel Hub Center Holes */}
        {[-0.22, 0.22].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.029, -0.05]}>
            <cylinderGeometry args={[0.035, 0.035, 0.003, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        ))}

        {/* Magnetic Tape Ribbon Window at bottom edge */}
        <mesh position={[0, 0, 0.27]}>
          <boxGeometry args={[0.72, 0.045, 0.10]} />
          <meshStandardMaterial color="#2e1005" roughness={0.5} />
        </mesh>
      </group>

      {/* Transparent Smoked Glass Lid (Hinged at rear [0, 0.165, -0.22]) */}
      <group position={[0, 0.165, -0.22]} rotation={[cassetteInserted ? -0.75 : 0, 0, 0]}>
        <mesh position={[0, 0.01, 0.42]} castShadow>
          <boxGeometry args={[1.14, 0.015, 0.84]} />
          <meshStandardMaterial
            color="#64748b"
            transparent
            opacity={0.45}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        {/* Plastic Lid Handle Ridge */}
        <mesh position={[0, 0.02, 0.82]}>
          <boxGeometry args={[0.3, 0.015, 0.04]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>
      </group>

      {/* Datassette Control Buttons (RECORD [Red], PLAY, REW, FF, STOP, EJECT) */}
      {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((x, i) => {
        const isPressed = (i === 1 && !cassetteInserted) || (i === 5 && cassetteInserted);
        return (
          <mesh key={i} position={[x, isPressed ? 0.14 : 0.17, -0.78]} castShadow>
            <boxGeometry args={[0.16, 0.12, 0.24]} />
            <meshStandardMaterial
              color={i === 0 ? '#ef4444' : '#475569'}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      {/* Digital Counter Display */}
      <mesh position={[0.42, 0.17, -0.3]}>
        <boxGeometry args={[0.26, 0.03, 0.16]} />
        <meshStandardMaterial color="#020617" roughness={0.2} />
      </mesh>
      <mesh position={[0.42, 0.186, -0.3]}>
        <boxGeometry args={[0.20, 0.001, 0.10]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}
