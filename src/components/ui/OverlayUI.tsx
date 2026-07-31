import React from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { downloadCVPdf, downloadCVDocx } from '@/utils/cvDownloader';

export function OverlayUI() {
  const { powerState, activeSection, setSection, secretFound, notebookOpen, toggleNotebook } = useSceneStore();
  const isOff = powerState === 'off';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        fontFamily: '"Courier New", Courier, monospace',
        userSelect: 'none',
      }}
    >
      {/* Power Off Instruction Banner */}
      {isOff && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 12, 10, 0.85)',
            border: '2px solid #e53e3e',
            color: '#ff6b6b',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            boxShadow: '0 0 20px rgba(229, 62, 62, 0.4)',
            animation: 'pulse 2s infinite',
          }}
        >
          ⚡ CLICK POWER SWITCH ON COMMODORE OR CRT MONITOR TO BOOT UP
        </div>
      )}

      {/* Notebook Close-up CV Action Header Bar */}
      {notebookOpen && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(15, 23, 42, 0.92)',
            border: '2px solid #6366f1',
            padding: '12px 24px',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 'bold' }}>
            📖 <b>NOTEBOOK CV VIEW</b> (Use ▲/▼ Arrow Keys to Scroll)
          </div>

          <button
            onClick={downloadCVPdf}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)',
              transition: 'transform 0.1s',
            }}
          >
            📄 DOWNLOAD PDF
          </button>

          <button
            onClick={downloadCVDocx}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)',
              transition: 'transform 0.1s',
            }}
          >
            📝 DOWNLOAD DOCX
          </button>

          <button
            onClick={toggleNotebook}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '8px 14px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            ✖ ZOOM OUT
          </button>
        </div>
      )}

      {/* Secret Easter Egg Found Popup */}
      {secretFound && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 230, 100, 0.95)',
            border: '2px solid #b7791f',
            color: '#744210',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          }}
        >
          🔍 SECRET FOUND UNDER MUG: BASIC CODE [POKE 53280,0]
        </div>
      )}

      {/* Retro Keyboard Nav Legend (Bottom Center) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          background: 'rgba(20, 18, 16, 0.85)',
          padding: '10px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          pointerEvents: 'auto',
        }}
      >
        {[
          { key: 'F1', label: 'HOME', section: 'home' as const },
          { key: 'F3', label: 'ABOUT', section: 'about' as const },
          { key: 'F5', label: 'PROJECTS', section: 'projects' as const },
          { key: 'F7', label: 'CONTACT', section: 'contact' as const },
        ].map((item) => {
          const isActive = activeSection === item.section;
          return (
            <button
              key={item.key}
              onClick={() => setSection(item.section)}
              style={{
                background: isActive ? '#3528b8' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#ffffff' : '#a3a1ff',
                border: isActive ? '1px solid #7068eb' : '1px solid transparent',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ color: '#fff070', marginRight: '6px' }}>[{item.key}]</span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Mouse Drag & Keyboard Controls Guide (Bottom Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '11px',
          lineHeight: '1.6',
          background: 'rgba(0,0,0,0.65)',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div>⌨️ <b>ARROW KEYS (▲/▼):</b> Navigate links / scroll page</div>
        <div>⏎ <b>RETURN / ENTER:</b> Open highlighted link or action</div>
        <div>📖 <b>NOTEBOOK:</b> Click notebook to view & download CV</div>
        <div>🖱️ <b>DRAG / WHEEL:</b> Shift desk camera perspective</div>
      </div>
    </div>
  );
}
