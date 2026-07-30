import React from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function DeskLamp() {
  const { lampOn, toggleLamp } = useSceneStore();

  const handleToggle = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playLampSwitch();
    toggleLamp();
  };

  return (
    // Far-left desk corner [-5.2, 0, -2.4] (Shifted further left away from Datasette!)
    <group position={[-5.2, 0, -2.4]}>
      {/* Weighted Brass Base */}
      <mesh castShadow receiveShadow position={[0, 0.06, 0]} onClick={handleToggle}>
        <cylinderGeometry args={[0.35, 0.4, 0.12, 32]} />
        <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Switch Button on Base */}
      <mesh position={[0, 0.13, 0.2]} onClick={handleToggle}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
        <meshStandardMaterial color={lampOn ? '#e63946' : '#333333'} roughness={0.4} />
      </mesh>

      {/* Curved Brass Gooseneck Arm */}
      <group position={[0, 0.12, -0.1]}>
        <mesh castShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.0, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0.2, 1.1, 0.3]} rotation={[0.4, 0, -0.4]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Vintage Green Lamp Shade */}
      <group position={[0.45, 1.35, 0.45]} rotation={[0.4, 0.3, -0.2]} onClick={handleToggle}>
        <mesh castShadow>
          <coneGeometry args={[0.38, 0.45, 32]} />
          <meshStandardMaterial color="#1b4332" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Inner Reflective Coating */}
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.36, 0.2, 32]} />
          <meshStandardMaterial color="#fffdd0" roughness={0.2} />
        </mesh>
        {/* Glowing Bulb */}
        <mesh position={[0, -0.12, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={lampOn ? '#ffffcc' : '#444433'} />
        </mesh>
      </group>

      {/* Functional Warm Spotlight Beam */}
      {lampOn && (
        <spotLight
          position={[0.45, 1.25, 0.45]}
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
