'use client';

import dynamic from 'next/dynamic';
import { OverlayUI } from '@/components/ui/OverlayUI';
import { CRTContentRenderer } from '@/components/crt/CRTContentRenderer';

const DeskScene = dynamic(() => import('@/components/scene/DeskScene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0c0a09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffc896',
        fontFamily: 'monospace',
      }}
    >
      <div style={{ fontSize: '20px', marginBottom: '12px', fontWeight: 'bold' }}>
        LOADING COMMODORE 64 WORKSPACE 3D...
      </div>
      <div style={{ color: '#888', fontSize: '13px' }}>Preparing PBR Materials & Audio Synth</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CRTContentRenderer />
      <DeskScene />
      <OverlayUI />
    </main>
  );
}
