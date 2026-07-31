import React from 'react';

export function Decorations() {
  return (
    <group>
      {/* Polaroid Photo on Desk */}
      <group position={[-1.8, 0.16, -1.3]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <mesh receiveShadow>
          <planeGeometry args={[0.7, 0.85]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.08, 0.001]}>
          <planeGeometry args={[0.58, 0.58]} />
          <meshStandardMaterial color="#1a365d" roughness={0.2} />
        </mesh>
      </group>

      {/* Soda Can (Rear Right Desk) */}
      <group position={[4.6, 0.4, 0.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.65, 24]} />
          <meshStandardMaterial color="#cc1111" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.33, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.02, 24]} />
          <meshStandardMaterial color="#dddddd" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Pencil Cup (Far Left Desk Edge [-4.6, 0.35, 0.2], clear of Joystick!) */}
      <group position={[-4.6, 0.35, 0.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.18, 0.5, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Pencils inside cup */}
        <mesh position={[-0.05, 0.3, 0]} rotation={[0.1, 0, 0.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
          <meshStandardMaterial color="#e9c46a" roughness={0.4} />
        </mesh>
        <mesh position={[0.05, 0.3, 0.04]} rotation={[-0.1, 0, -0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
          <meshStandardMaterial color="#e63946" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.3, -0.05]} rotation={[0.05, 0, -0.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
          <meshStandardMaterial color="#457b9d" roughness={0.4} />
        </mesh>
      </group>

      {/* Floppy Storage Box (Rear Right Desk [4.6, 0.4, -1.6], clear of top-left!) */}
      <group position={[4.6, 0.4, -1.6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.45, 1.4]} />
          <meshStandardMaterial color="#2d3748" roughness={0.6} />
        </mesh>
        {/* Box Lid */}
        <mesh position={[0, 0.24, -0.6]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[1.24, 0.05, 1.44]} />
          <meshStandardMaterial color="#4a5568" transparent opacity={0.7} roughness={0.2} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
