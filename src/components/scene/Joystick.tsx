import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function Joystick() {
  const stickRef = useRef<THREE.Group | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { joystickAngle, setJoystickAngle } = useSceneStore();

  const handlePointerDown = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsDragging(true);
    sounds.playJoystickClick();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setJoystickAngle({ x: 0, z: 0 });
  };

  const handlePointerMove = (e: { pointer: { x: number; y: number } }) => {
    if (isDragging) {
      const rx = Math.max(-0.4, Math.min(0.4, e.pointer.y * 0.8));
      const rz = Math.max(-0.4, Math.min(0.4, -e.pointer.x * 0.8));
      setJoystickAngle({ x: rx, z: rz });
    }
  };

  useFrame(() => {
    if (stickRef.current) {
      stickRef.current.rotation.x = THREE.MathUtils.lerp(
        stickRef.current.rotation.x,
        joystickAngle.x,
        0.2
      );
      stickRef.current.rotation.z = THREE.MathUtils.lerp(
        stickRef.current.rotation.z,
        joystickAngle.z,
        0.2
      );
    }
  });

  return (
    <group
      position={[-3.6, 0.3, 0.8]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {/* Black Square Joystick Base Housing */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.3, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* 2 Big Red Fire Buttons */}
      <mesh position={[-0.26, 0.16, 0.26]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        <meshStandardMaterial color="#ee2222" roughness={0.2} />
      </mesh>
      <mesh position={[0.26, 0.16, 0.26]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        <meshStandardMaterial color="#ee2222" roughness={0.2} />
      </mesh>

      {/* Movable Joystick Shaft & Red Ball */}
      <group ref={stickRef} position={[0, 0.15, 0]}>
        <mesh position={[0, 0.04, 0]}>
          <coneGeometry args={[0.15, 0.12, 16]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.45, 16]} />
          <meshStandardMaterial color="#dddddd" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh castShadow position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial color="#e60000" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
