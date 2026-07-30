'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

import { Desk } from './Desk';
import { Commodore64 } from './Commodore64';
import { CRTMonitor } from './CRTMonitor';
import { FloppyDrive } from './FloppyDrive';
import { FloppyDisk } from './FloppyDisk';
import { CassetteTape } from './CassetteTape';
import { Joystick } from './Joystick';
import { CoffeeMug } from './CoffeeMug';
import { Notebook } from './Notebook';
import { DeskLamp } from './DeskLamp';
import { Decorations } from './Decorations';
import { SceneCamera } from './SceneCamera';
import { useSceneStore } from '@/stores/sceneStore';

function MainGroup() {
  const { deskOffset } = useSceneStore();

  return (
    <group position={[deskOffset.x, 0, deskOffset.z]}>
      <Desk />
      <Commodore64 />
      <CRTMonitor />
      <FloppyDrive />
      <FloppyDisk />
      <CassetteTape />
      <Joystick />
      <CoffeeMug />
      <Notebook />
      <DeskLamp />
      <Decorations />
    </group>
  );
}

export default function DeskScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#0c0a09' }}>
      <Canvas
        shadows
        camera={{ position: [0, 4.4, 5.2], fov: 42 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <Suspense fallback={null}>
          {/* Main Warm Sunset Sun Light */}
          <directionalLight
            position={[7, 11, 5]}
            intensity={2.8}
            color="#ffc896"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />

          {/* Hemisphere Light (Soft Sky Blue & Warm Earth Ambient) */}
          <hemisphereLight args={['#dbeaff', '#3f2e21', 0.9]} />

          {/* Ambient Warm Fill Light */}
          <ambientLight intensity={0.5} color="#ffd4b2" />

          {/* Soft Cool Rim Light from Rear Left */}
          <directionalLight position={[-7, 5, -5]} intensity={0.8} color="#8fb3de" />

          {/* Soft Front Fill Light */}
          <directionalLight position={[0, 4, 8]} intensity={0.4} color="#ffffff" />

          {/* Camera Controller */}
          <SceneCamera />

          {/* Main 3D Workspace Scene */}
          <MainGroup />

          {/* Postprocessing Pipeline */}
          <EffectComposer>
            <Bloom intensity={0.15} luminanceThreshold={0.9} luminanceSmoothing={0.9} />
            <Vignette eskil={false} offset={0.15} darkness={0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
