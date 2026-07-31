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

      {/* Red/Dark Switch Button on Base Plate */}
      <mesh position={[0, 0.12, 0.18]} onClick={handleToggle}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
        <meshStandardMaterial color={lampOn ? '#e63946' : '#222222'} roughness={0.4} />
      </mesh>

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

      {/* Vintage Emerald Green Lamp Shade Dome */}
      <group position={[0.42, 1.25, 0.42]} rotation={[0.5, 0.3, -0.2]} onClick={handleToggle}>
        {/* Outer Emerald Green Curved Shade Hood */}
        <mesh castShadow>
          <sphereGeometry args={[0.34, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
          <meshStandardMaterial
            color="#1b4332"
            roughness={0.25}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Brass Shade Rim Ring Trim */}
        <mesh position={[0, -0.16, 0]}>
          <torusGeometry args={[0.34, 0.015, 12, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Inner Glowing Bulb */}
        <mesh position={[0, -0.08, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={lampOn ? '#ffffcc' : '#333322'} />
        </mesh>
      </group>

      {/* Functional Warm Spotlight Beam */}
      {lampOn && (
        <spotLight
          position={[0.42, 1.15, 0.42]}
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
