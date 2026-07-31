import React from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { downloadCVPdf, downloadCVDocx } from '@/utils/cvDownloader';

export function OverlayUI() {
  const {
    powerState,
    activeSection,
    setSection,
    secretFound,
    notebookOpen,
    toggleNotebook,
    floppyInserted,
    musicPlaying,
    toggleMusic,
    hireModalOpen,
    closeHireModal,
  } = useSceneStore();
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
      {/* 1853 Special Recruitment Easter Egg Modal */}
      {hireModalOpen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 5, 8, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: '#3528b8',
              border: '4px solid #7068eb',
              borderRadius: '16px',
              padding: '36px 28px',
              maxWidth: '540px',
              width: '90%',
              textAlign: 'center',
              color: '#a3a1ff',
              boxShadow: '0 0 50px rgba(112, 104, 235, 0.7)',
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: '#fff070',
                fontWeight: 'bold',
                letterSpacing: '2px',
                marginBottom: '16px',
              }}
            >
              *** COMMODORE 64 SECRET CODE 1853 UNLOCKED ***
            </div>

            <div
              style={{
                fontSize: '24px',
                color: '#ffffff',
                fontWeight: 'bold',
                marginBottom: '28px',
                lineHeight: '1.4',
              }}
            >
              Beni işe almak ister misin? 🚀💼
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <button
                onClick={() => {
                  window.open(
                    'mailto:barutaybarsfahri@gmail.com?subject=İş%20Teklifi%20-%20C64%20Portfolio&body=Merhaba%20Aybars,',
                    '_blank'
                  );
                }}
                style={{
                  background: '#16a34a',
                  color: '#ffffff',
                  border: '2px solid #4ade80',
                  padding: '14px 24px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(74, 222, 128, 0.4)',
                  transition: 'transform 0.1s',
                }}
              >
                ✅ EVET! (Mail At: barutaybarsfahri@gmail.com)
              </button>

              <button
                onClick={closeHireModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.1s',
                }}
              >
                🏠 ANA MENÜYE GERİ DÖN
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 16-Bit Retro Chiptune Music Play Button (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={toggleMusic}
          style={{
            background: musicPlaying ? '#16a34a' : 'rgba(20, 18, 16, 0.85)',
            color: '#ffffff',
            border: musicPlaying ? '2px solid #4ade80' : '1px solid rgba(255, 255, 255, 0.25)',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            boxShadow: musicPlaying ? '0 0 15px rgba(74, 222, 128, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          {musicPlaying ? '🎵 16-BIT MUSIC: PLAYING ▶' : '📻 16-BIT MUSIC: PAUSED ⏸'}
        </button>
      </div>
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
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'pulse 2s infinite',
          }}
        >
          📝 SECRET NOTE UNDER MUG: &quot;Sıradaki işverenim olmak ister misin?&quot; 💼✨
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
          { key: 'F7', label: 'CERTS', section: 'certs' as const },
          { key: 'F8', label: 'CONTACT', section: 'contact' as const },
          ...(floppyInserted ? [{ key: 'F10', label: 'GAME 🎮', section: 'game' as const }] : []),
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
          color: 'rgba(255,255,255,0.75)',
          fontSize: '11px',
          lineHeight: '1.6',
          background: 'rgba(0,0,0,0.75)',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {activeSection === 'game' ? (
          <>
            <div>🎮 <b>TETRIS MODE ACTIVE:</b></div>
            <div>⌨️ <b>ARROW KEYS / WASD:</b> Move & Rotate Piece</div>
            <div>🕹️ <b>JOYSTICK:</b> Drag stick Left/Right/Up/Down</div>
            <div>💾 <b>FLOPPY DISK:</b> Click disk to eject / insert</div>
          </>
        ) : (
          <>
            <div>⌨️ <b>ARROW KEYS (▲/▼):</b> Navigate links / scroll page</div>
            <div>⏎ <b>RETURN / ENTER:</b> Open highlighted link or action</div>
            <div>💾 <b>FLOPPY DISK:</b> Insert disk to launch Tetris 64</div>
            <div>🕹️ <b>JOYSTICK:</b> Drag stick or use keys to control game</div>
          </>
        )}
      </div>
    </div>
  );
}
