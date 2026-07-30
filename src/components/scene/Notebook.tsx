import React from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

export function Notebook() {
  const { notebookOpen, toggleNotebook } = useSceneStore();

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playPageTurn();
    toggleNotebook();
  };

  // Opened: Center front of desk [0, 0.18, 2.9] (0.65 units clear gap in front of C64!)
  // Closed: Front-left desk corner [-3.8, 0.18, 2.2]
  const pos: [number, number, number] = notebookOpen
    ? [0, 0.18, 2.9]
    : [-3.8, 0.18, 2.2];

  const rot: [number, number, number] = notebookOpen
    ? [-Math.PI / 2, 0, 0]
    : [-Math.PI / 2, 0, -0.25];

  return (
    <group position={pos} rotation={rot} onClick={handleClick}>
      {/* Notebook Blue Cover */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.04]} />
        <meshStandardMaterial color="#335577" roughness={0.5} />
      </mesh>

      {/* Pages */}
      <mesh position={[0.03, 0, 0.025]}>
        <boxGeometry args={[1.12, 1.44, 0.03]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.6} />
      </mesh>

      {/* Spiral Wire Binding */}
      {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((y, i) => (
        <mesh key={i} position={[-0.56, y, 0.04]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.045, 0.012, 8, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Unified Seamless Pencil (Lying Flat Horizontally on Notebook) */}
      <group position={[0.1, 0.04, 0.2]} rotation={[0, 0, Math.PI / 3]}>
        {/* Yellow Shaft */}
        <mesh castShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
          <meshStandardMaterial color="#f3a712" roughness={0.4} />
        </mesh>

        {/* Pink Eraser Tip */}
        <mesh position={[-0.37, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
          <meshStandardMaterial color="#ff77aa" roughness={0.5} />
        </mesh>

        {/* Wood Sharpened Cone Tip */}
        <mesh position={[0.39, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.02, 0.08, 8]} />
          <meshStandardMaterial color="#d4a373" roughness={0.5} />
        </mesh>

        {/* Lead Tip Point */}
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.008, 0.025, 8]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
