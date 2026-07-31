import React from 'react';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function DeskLamp() {
  const { lampOn, toggleLamp } = useSceneStore();

  const handleToggle = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playLampSwitch();
    toggleLamp();
  };

  // Far-left desk corner [-5.2, 0.15, -2.4] (Resting right on desk top surface at Y=0.15)
  return (
    <group position={[-5.2, 0.15, -2.4]}>
      {/* Weighted Heavy Brass Base Stand */}
      <mesh castShadow receiveShadow position={[0, 0.04, 0]} onClick={handleToggle}>
        <cylinderGeometry args={[0.38, 0.42, 0.08, 32]} />
        <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Stepped Base Bevel Accent Ring */}
      <mesh castShadow position={[0, 0.09, 0]} onClick={handleToggle}>
        <cylinderGeometry args={[0.30, 0.36, 0.04, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Vintage Brass Toggle Switch Base & Lever */}
      <group position={[0, 0.10, 0.18]} onClick={handleToggle}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.025, 0]} rotation={[lampOn ? 0.35 : -0.35, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.015, 0.05, 12]} />
          <meshStandardMaterial color="#fef08a" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Curved Brass Gooseneck Arm */}
      <group position={[0, 0.10, -0.05]}>
        <mesh castShadow position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0.2, 0.95, 0.25]} rotation={[0.4, 0, -0.35]}>
          <cylinderGeometry args={[0.03, 0.03, 0.65, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Classic Banker's Lamp Emerald Green Elongated Shade Hood */}
      <group position={[0.35, 1.25, 0.35]} rotation={[0.4, 0.4, -0.1]} onClick={handleToggle}>
        {/* Horizontal Solid Emerald Green Half-Cylinder Shade Hood */}
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.54, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial
            color="#1b4332"
            roughness={0.25}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Brass Swivel Side Mounting Rod */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.60, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Brass Swivel Side Knobs */}
        <mesh position={[-0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Inner Warm White Reflective Coating */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.175, 0.175, 0.52, 32, 1, true, 0, Math.PI]} />
          <meshStandardMaterial color="#fffdd0" roughness={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Inner Tubular Glowing Bulb */}
        <mesh position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.36, 16]} />
          <meshBasicMaterial color={lampOn ? '#ffffcc' : '#333322'} />
        </mesh>
      </group>

      {/* Functional Warm Spotlight Beam */}
      {lampOn && (
        <spotLight
          position={[0.35, 1.15, 0.35]}
          target-position={[1.5, 0, 1.5]}
          color="#ffdfa9"
          intensity={4.5}
          distance={6.0}
          angle={0.65}
          penumbra={0.5}
          castShadow
          shadow-bias={-0.0001}
        />
      )}
    </group>
  );
}
