import React, { useMemo } from 'react';
import * as THREE from 'three';

function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#4a2e1b';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 400; i++) {
    const y = Math.random() * 512;
    ctx.strokeStyle = `rgba(30, 15, 8, ${Math.random() * 0.25})`;
    ctx.lineWidth = 1 + Math.random() * 3;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(170, y + Math.sin(y * 0.05) * 15, 340, y - Math.cos(y * 0.05) * 15, 512, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

export function Desk() {
  const woodTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createWoodTexture();
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Main Desk Top Surface */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[13, 0.3, 7.5]} />
        <meshStandardMaterial
          map={woodTexture}
          color="#5c3a21"
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Front Bevel Lip Trim */}
      <mesh position={[0, 0.13, 3.76]}>
        <boxGeometry args={[13.02, 0.04, 0.04]} />
        <meshStandardMaterial color="#3a2211" roughness={0.3} />
      </mesh>

      {/* Back Wooden Panel Lip */}
      <mesh position={[0, 0.3, -3.7]}>
        <boxGeometry args={[13, 0.4, 0.1]} />
        <meshStandardMaterial color="#422714" roughness={0.5} />
      </mesh>

      {/* Leather Desk Mat under C64 & Monitor */}
      <mesh receiveShadow position={[0, 0.151, 0.1]}>
        <boxGeometry args={[6.5, 0.01, 4.2]} />
        <meshStandardMaterial color="#1a201c" roughness={0.8} />
      </mesh>

      {/* Coffee Stain Ring on desk surface */}
      <mesh position={[3.2, 0.152, 1.0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.4, 32]} />
        <meshBasicMaterial color="#301c0c" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
