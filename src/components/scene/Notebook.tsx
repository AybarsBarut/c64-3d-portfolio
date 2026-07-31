import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';
import { downloadCVPdf, downloadCVDocx } from '@/utils/cvDownloader';

export function Notebook() {
  const { notebookOpen, toggleNotebook, notebookScrollY } = useSceneStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playPageTurn();
    toggleNotebook();
  };

  // Draw Notebook CV Texture onto 2D Canvas
  useEffect(() => {
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1312;
      canvasRef.current = canvas;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Vintage Off-White Lined Paper Background
    ctx.fillStyle = '#fbf7ee';
    ctx.fillRect(0, 0, W, H);

    // Red Margin Line (Left side)
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.lineTo(120, H);
    ctx.stroke();

    // Blue Horizontal Lined Rows
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for (let y = 100; y < H; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const startX = 140;
    let y = 90 - notebookScrollY;

    // Header Title: CV
    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold 44px "Georgia", serif';
    ctx.fillText('FAHRI AYBARS BARUT', startX, y);
    y += 50;

    ctx.fillStyle = '#4338ca';
    ctx.font = 'bold 28px "Georgia", serif';
    ctx.fillText('CURRICULUM VITAE', startX, y);
    y += 42;

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillText('Computer Engineer | Simulation & VR Developer', startX, y);
    y += 36;
    ctx.fillText('Ankara, Turkey | github.com/AybarsBarut', startX, y);
    y += 54;

    // Section 1: Summary
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px "Georgia", serif';
    ctx.fillText('=== SUMMARY ===', startX, y);
    y += 40;

    ctx.fillStyle = '#334155';
    ctx.font = '21px "Courier New", monospace';
    const summaryLines = [
      'Engine graduate specialized in graphics programming,',
      'real-time systems, UE5/Unity simulations, and RAG AI.',
    ];
    summaryLines.forEach((line) => {
      ctx.fillText(line, startX, y);
      y += 36;
    });

    y += 24;

    // Section 2: Technical Skills
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px "Georgia", serif';
    ctx.fillText('=== SKILLS MATRIX ===', startX, y);
    y += 40;

    ctx.fillStyle = '#334155';
    ctx.font = '20px "Courier New", monospace';
    const skills = [
      '• LANGUAGES  : C++, C#, Python, TypeScript',
      '• GRAPHICS   : OpenGL, SDL2, ECS, UE5, Unity',
      '• VR & SIM   : OpenXR, Zero-GC Diagnostics',
      '• AI & DATA  : LangChain RAG, FastAPI, SQL',
    ];
    skills.forEach((s) => {
      ctx.fillText(s, startX, y);
      y += 38;
    });

    y += 24;

    // Section 3: Projects
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px "Georgia", serif';
    ctx.fillText('=== KEY PROJECTS ===', startX, y);
    y += 40;

    const projects = [
      { name: '1. Archura Engine (C++ / OpenGL / ECS)', desc: 'Custom PBR rendering engine' },
      { name: '2. Anayasal RAG AI (Python / LangChain)', desc: 'Turkish Constitution legal AI' },
      { name: '3. Unity Zero-GC Diagnostics (C#)', desc: 'Zero allocation profiler & events' },
    ];
    projects.forEach((p) => {
      ctx.fillStyle = '#1e1b4b';
      ctx.font = 'bold 21px "Courier New", monospace';
      ctx.fillText(p.name, startX, y);
      y += 32;
      ctx.fillStyle = '#475569';
      ctx.font = '19px "Courier New", monospace';
      ctx.fillText(`   ${p.desc}`, startX, y);
      y += 38;
    });

    y += 20;

    // Section 4: Downloads
    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold 26px "Georgia", serif';
    ctx.fillText('=== DOWNLOAD OFFICIAL CV ===', startX, y);
    y += 44;

    // PDF Button Box
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(startX, y, 260, 48);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillText('📄 DOWNLOAD PDF', startX + 24, y + 32);

    // DOCX Button Box
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(startX + 290, y, 260, 48);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillText('📝 DOWNLOAD DOCX', startX + 310, y + 32);

    if (materialRef.current) {
      if (!textureRef.current) {
        const tex = new THREE.CanvasTexture(canvas);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        textureRef.current = tex;
        materialRef.current.map = tex;
      }
      textureRef.current.needsUpdate = true;
      materialRef.current.needsUpdate = true;
    }
  }, [notebookOpen, notebookScrollY]);

  // Opened: Center front of desk [0, 0.18, 2.7]
  // Closed: Front-left desk corner [-3.8, 0.18, 2.2]
  const pos: [number, number, number] = notebookOpen
    ? [0, 0.18, 2.7]
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

      {/* Pages with Printed CV Canvas Texture */}
      <mesh position={[0.03, 0, 0.025]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.12, 1.44, 0.03]} />
        <meshStandardMaterial ref={materialRef} roughness={0.6} color="#ffffff" />
      </mesh>

      {/* Spiral Wire Binding */}
      {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((y, i) => (
        <mesh key={i} position={[-0.56, y, 0.04]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.045, 0.012, 8, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Pencil */}
      <group position={[0.5, 0.04, 0.2]} rotation={[0, 0, Math.PI / 3]}>
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
