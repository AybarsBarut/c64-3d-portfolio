import React from 'react';
import { C64Keyboard } from './Keyboard';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function Commodore64() {
  const { powerState, turnOn, turnOff } = useSceneStore();
  const isOn = powerState !== 'off' && powerState !== 'turning_off';

  const handlePowerToggle = (e: { stopPropagation: () => void }) => {
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
    <group position={[0, 0.32, 0.5]}>
      {/* Main C64 Breadbin Housing */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[5.0, 0.35, 2.0]} />
        <meshStandardMaterial color="#c4b598" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Sloped Top Keyboard Recess Well */}
      <mesh castShadow position={[0, 0.08, 0.05]} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[4.6, 0.12, 1.7]} />
        <meshStandardMaterial color="#2d261e" roughness={0.7} />
      </mesh>

      {/* C64 Rainbow Logo Badge (Top Left) */}
      <group position={[-1.8, 0.2, -0.7]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.02, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {['#e63946', '#f4a261', '#e9c46a', '#2a9d8f', '#457b9d'].map((c, i) => (
          <mesh key={i} position={[-0.3 + i * 0.07, 0.012, 0]}>
            <boxGeometry args={[0.06, 0.01, 0.18]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}
      </group>

      {/* Power LED (Top Right) */}
      <group position={[1.9, 0.2, -0.7]}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
          <meshStandardMaterial
            color={isOn ? '#ff1a1a' : '#441111'}
            emissive={isOn ? '#ff0000' : '#110000'}
            emissiveIntensity={isOn ? 2.5 : 0.2}
          />
        </mesh>
        {isOn && <pointLight color="#ff0000" intensity={0.8} distance={0.5} />}
      </group>

      {/* Power Switch (Right Side Edge) */}
      <group position={[2.52, 0, 0.4]} onClick={handlePowerToggle}>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 0.14, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
        </mesh>
        <mesh position={[0.05, 0, isOn ? 0.04 : -0.04]}>
          <boxGeometry args={[0.08, 0.1, 0.08]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* C64 Keyboard Component */}
      <C64Keyboard />
    </group>
  );
}
