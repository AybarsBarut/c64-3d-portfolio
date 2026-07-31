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

      {/* Retro Aluminum Soda Can (Kutu Kola) [4.6, 0.4, 0.2] */}
      <group position={[4.6, 0.4, 0.2]}>
        {/* Main Red Can Body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.21, 0.21, 0.52, 32]} />
          <meshStandardMaterial color="#dc2626" metalness={0.65} roughness={0.25} />
        </mesh>

        {/* Iconic White Retro Wave Brand Stripe */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.212, 0.212, 0.16, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Top Tapered Aluminum Neck */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.18, 0.21, 0.06, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Bottom Tapered Aluminum Base */}
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.21, 0.18, 0.05, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Metallic Top Rim Lip */}
        <mesh position={[0, 0.31, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.012, 12, 32]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Indented Top Lid */}
        <mesh position={[0, 0.305, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.01, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Aluminum Pop-Tab Ring (Açma Halkası) */}
        <mesh position={[0, 0.315, 0.04]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.04, 0.006, 0.09]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Pencil Cup (Far Left Desk Edge [-4.6, 0.35, 0.2], clear of Joystick!) */}
      <group position={[-4.6, 0.35, 0.2]}>
        {/* Outer Ceramic Cup Body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.18, 0.5, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>

        {/* Inner Cup Cavity Top Recessed Rim */}
        <mesh position={[0, 0.23, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.05, 24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>

        {/* Pencils inside cup extending from interior cavity */}
        <mesh position={[-0.05, 0.28, 0.02]} rotation={[0.12, 0, 0.18]}>
          <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
          <meshStandardMaterial color="#e9c46a" roughness={0.4} />
        </mesh>
        <mesh position={[0.05, 0.28, 0.04]} rotation={[-0.14, 0, -0.12]}>
          <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
          <meshStandardMaterial color="#e63946" roughness={0.4} />
        </mesh>
        <mesh position={[-0.02, 0.28, -0.05]} rotation={[0.08, 0, -0.16]}>
          <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
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
