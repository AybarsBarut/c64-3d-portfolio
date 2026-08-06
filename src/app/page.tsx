'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { OverlayUI } from '@/components/ui/OverlayUI';
import { CRTContentRenderer } from '@/components/crt/CRTContentRenderer';
import styles from './page.module.css';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
        (typeof window !== 'undefined' && window.innerWidth < 768);

      if (isMobileDevice) {
        setIsMobile(true);
        window.location.href = 'https://aybarsbarut.com/';
      }
    };

    checkMobile();
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#0c0a09',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#38bdf8',
          fontFamily: 'monospace',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
          📱 MOBILE DEVICE DETECTED
        </div>
        <div style={{ color: '#94a3b8', fontSize: '14px' }}>
          Redirecting to mobile version... <br />
          <a
            href="https://aybarsbarut.com/"
            style={{ color: '#38bdf8', textDecoration: 'underline', marginTop: '10px', display: 'inline-block' }}
          >
            Click here if not redirected automatically
          </a>
        </div>
      </div>
    );
  }

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <article className={styles.accessibleProfile}>
        <h1>Fahri Aybars Barut — C64 3D Portfolio</h1>
        <p>
          Computer Engineer and Simulation &amp; VR/XR Developer in Ankara, Türkiye,
          building real-time systems with Unity, Unreal Engine, C++, C#, Python and AI/RAG.
        </p>
        <p>
          This immersive Commodore 64-inspired portfolio presents software projects,
          certifications and professional contact information in an interactive 3D workspace.
        </p>
        <a href="https://aybarsbarut.com/">Main portfolio</a>
        <a href="https://github.com/AybarsBarut">GitHub profile</a>
        <a href="https://www.linkedin.com/in/fahriaybarsbarut1853/">LinkedIn profile</a>
      </article>
      <CRTContentRenderer />
      <DeskScene />
      <OverlayUI />
    </main>
  );
}
