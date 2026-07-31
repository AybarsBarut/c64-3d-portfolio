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
    // Datassette unit on left side of desk [-3.2, 0.45, -1.6]
    <group position={[-3.2, 0.45, -1.6]} onClick={handleClick}>
      {/* C2N Main Lower Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.28, 2.2]} />
        <meshStandardMaterial color="#2d2a26" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* C2N Top Housing Face Plate */}
      <mesh castShadow receiveShadow position={[0, 0.145, 0]}>
        <boxGeometry args={[1.44, 0.015, 2.14]} />
        <meshStandardMaterial color="#3a3631" roughness={0.5} />
      </mesh>

      {/* Top Silver Metal Accent Line */}
      <mesh position={[0, 0.155, -0.58]}>
        <boxGeometry args={[1.36, 0.003, 0.03]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Recessed Control Buttons Slot (Rear top edge z = -0.82) */}
      <mesh position={[0, 0.14, -0.82]}>
        <boxGeometry args={[1.22, 0.03, 0.36]} />
        <meshStandardMaterial color="#141415" roughness={0.8} />
      </mesh>

      {/* 6 Control Buttons (RECORD, PLAY, REW, FF, STOP, EJECT) */}
      {[-0.45, -0.27, -0.09, 0.09, 0.27, 0.45].map((x, i) => {
        const isRecord = i === 0;
        const isPressed = (i === 1 && !cassetteInserted) || (i === 5 && cassetteInserted);
        return (
          <mesh key={i} position={[x, isPressed ? 0.14 : 0.17, -0.82]} castShadow>
            <boxGeometry args={[0.15, 0.10, 0.28]} />
            <meshStandardMaterial
              color={isRecord ? '#dc2626' : '#475569'}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      {/* Mechanical 3-Digit Counter Box (Top right z = -0.42) */}
      <mesh position={[0.45, 0.155, -0.42]}>
        <boxGeometry args={[0.24, 0.02, 0.14]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} />
      </mesh>

      {/* Red Activity LED (Top left z = -0.42) */}
      <mesh position={[-0.45, 0.16, -0.42]}>
        <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={cassetteInserted ? 0.2 : 0.8}
        />
      </mesh>

      {/* Recessed Cassette Well Cavity (Center z = 0.15) */}
      <mesh position={[0, 0.09, 0.15]}>
        <boxGeometry args={[1.16, 0.10, 0.82]} />
        <meshStandardMaterial color="#111113" roughness={0.9} />
      </mesh>

      {/* Cassette Tape Model */}
      <group
        position={[0, cassetteInserted ? 0.19 : 0.11, cassetteInserted ? 0.05 : 0.15]}
        rotation={[cassetteInserted ? -0.30 : 0, 0, 0]}
      >
        {/* Cassette Dark Shell */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.0, 0.04, 0.64]} />
          <meshStandardMaterial color="#1e1e24" roughness={0.35} />
        </mesh>

        {/* Cassette Retro Red Label */}
        <mesh position={[0, 0.021, -0.05]}>
          <boxGeometry args={[0.88, 0.001, 0.34]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.4} />
        </mesh>

        {/* Label White Center Stripe */}
        <mesh position={[0, 0.022, -0.05]}>
          <boxGeometry args={[0.80, 0.001, 0.12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>

        {/* Tape Reels (Flat White Discs, facing UP) */}
        {[-0.22, 0.22].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.023, -0.05]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.002, 24]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} />
          </mesh>
        ))}

        {/* Reel Hub Center Holes */}
        {[-0.22, 0.22].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.024, -0.05]}>
            <cylinderGeometry args={[0.035, 0.035, 0.003, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        ))}

        {/* Brown Magnetic Ribbon Strip */}
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.70, 0.035, 0.09]} />
          <meshStandardMaterial color="#2e1005" roughness={0.6} />
        </mesh>
      </group>

      {/* Clear Smoked Door Lid (Hinged at rear edge of well z = -0.26) */}
      <group position={[0, 0.155, -0.26]} rotation={[cassetteInserted ? -0.55 : 0, 0, 0]}>
        {/* Clear Transparent Smoked Window (Center cavity without overlapping bezel faces) */}
        <mesh position={[0, 0.006, 0.41]}>
          <boxGeometry args={[1.02, 0.006, 0.68]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.30}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Non-overlapping Outer Bezel Frame Strips */}
        {/* Top Rear Border */}
        <mesh position={[0, 0.006, 0.035]} castShadow>
          <boxGeometry args={[1.16, 0.012, 0.07]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} />
        </mesh>

        {/* Bottom Front Border */}
        <mesh position={[0, 0.006, 0.785]} castShadow>
          <boxGeometry args={[1.16, 0.012, 0.07]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} />
        </mesh>

        {/* Left Side Border */}
        <mesh position={[-0.545, 0.006, 0.41]} castShadow>
          <boxGeometry args={[0.07, 0.012, 0.68]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} />
        </mesh>

        {/* Right Side Border */}
        <mesh position={[0.545, 0.006, 0.41]} castShadow>
          <boxGeometry args={[0.07, 0.012, 0.68]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} />
        </mesh>

        {/* Plastic Lid Handle Ridge */}
        <mesh position={[0, 0.013, 0.80]}>
          <boxGeometry args={[0.26, 0.014, 0.03]} />
          <meshStandardMaterial color="#52525b" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
