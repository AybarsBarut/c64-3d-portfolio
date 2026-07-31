import React, { useEffect, useRef } from 'react';
import { useSceneStore } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';
import { useTetris, TETROMINOES, COLS, ROWS } from '@/hooks/useTetris';

export function CRTContentRenderer({ onTextureNeedsUpdate }: { onTextureNeedsUpdate?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { powerState, setPowerState, activeSection, crtSelectedIndex, floppyInserted } = useSceneStore();
  const cursorRef = useRef(true);
  const tetris = useTetris();

  // Auto-type boot sequence runner
  useEffect(() => {
    if (powerState === 'turning_on') {
      sounds.playPowerOn();
      const timer = setTimeout(() => {
        setPowerState('basic_boot');
        sounds.playC64Beep();
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (powerState === 'basic_boot') {
      const fullText = 'LOAD "AYBARS_BARUT",8,1';
      let currentText = '';
      let charIdx = 0;

      const typeInterval = setInterval(() => {
        if (charIdx < fullText.length) {
          currentText += fullText[charIdx];
          charIdx++;
          sounds.playKeyPress();
          useSceneStore.setState({ typedLines: [currentText] });
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            sounds.playFloppyMotor();
            useSceneStore.setState({
              typedLines: [
                'LOAD "AYBARS_BARUT",8,1',
                'SEARCHING FOR AYBARS_BARUT',
                'LOADING',
                'READY.',
                'RUN',
              ],
            });
            setTimeout(() => {
              setPowerState('on');
            }, 1800);
          }, 600);
        }
      }, 120);

      return () => clearInterval(typeInterval);
    }
  }, [powerState, setPowerState]);

  // Cursor blink timer (700ms)
  useEffect(() => {
    const blink = setInterval(() => {
      cursorRef.current = !cursorRef.current;
      if (onTextureNeedsUpdate) onTextureNeedsUpdate();
    }, 700);
    return () => clearInterval(blink);
  }, [onTextureNeedsUpdate]);

  // Main Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1280;
    const H = 960;

    // Clear background
    ctx.clearRect(0, 0, W, H);

    // Power OFF State
    if (powerState === 'off') {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, W, H);
      
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 46px "Courier New", Courier, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PRESS POWER TO START', W / 2, H / 2 + 15);
      if (onTextureNeedsUpdate) onTextureNeedsUpdate();
      return;
    }

    if (powerState === 'turning_on') {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(163, 161, 255, 0.4)';
      ctx.fillRect(0, 0, W, H);
      if (onTextureNeedsUpdate) onTextureNeedsUpdate();
      return;
    }

    if (powerState === 'turning_off') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 16, 0, Math.PI * 2);
      ctx.fill();
      if (onTextureNeedsUpdate) onTextureNeedsUpdate();
      return;
    }

    // Authentic C64 Vibrant Blue CRT Radial Phosphor Glow Background
    const borderX = 72;
    const borderY = 56;
    const innerW = W - borderX * 2;
    const innerH = H - borderY * 2;

    // Outer C64 Light Blue Border
    ctx.fillStyle = '#5c52e6';
    ctx.fillRect(0, 0, W, H);

    // Inner C64 Deep Blue Screen with Radial Phosphor Glow
    const screenGrad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, W / 1.1);
    screenGrad.addColorStop(0, '#4e41ea');
    screenGrad.addColorStop(0.5, '#3528b8');
    screenGrad.addColorStop(1, '#1b1277');
    ctx.fillStyle = screenGrad;
    ctx.fillRect(borderX, borderY, innerW, innerH);

    ctx.font = 'bold 30px "Courier New", Courier, monospace';
    ctx.textBaseline = 'top';

    const C64_CYAN = '#99e6ff';
    const C64_WHITE = '#ffffff';
    const C64_YELLOW = '#ffeb3b';
    const C64_GREEN = '#66ff66';

    // BASIC Boot Screen
    if (powerState === 'basic_boot') {
      ctx.fillStyle = C64_CYAN;
      ctx.textAlign = 'center';

      let y = borderY + 40;
      ctx.fillText('**** COMMODORE 64 BASIC V2 ****', W / 2, y);
      y += 48;
      ctx.fillText('64K RAM SYSTEM  38911 BASIC BYTES FREE', W / 2, y);
      y += 64;

      ctx.textAlign = 'left';
      const startX = borderX + 48;
      ctx.fillText('READY.', startX, y);
      y += 48;

      const lines = useSceneStore.getState().typedLines;
      lines.forEach((line) => {
        ctx.fillText('> ' + line, startX, y);
        y += 48;
      });

      if (cursorRef.current) {
        ctx.fillStyle = C64_CYAN;
        if (lines.length === 0) {
          ctx.fillRect(startX, y, 24, 32);
        } else {
          const lastLine = lines[lines.length - 1];
          const cursorX = startX + ctx.measureText('> ' + lastLine).width + 6;
          ctx.fillRect(cursorX, y - 48, 24, 32);
        }
      }

      // Draw retro CRT scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      for (let sy = borderY; sy < borderY + innerH; sy += 4) {
        ctx.fillRect(borderX, sy, innerW, 2);
      }

      if (onTextureNeedsUpdate) onTextureNeedsUpdate();
      return;
    }

    // FAHRI AYBARS BARUT PORTFOLIO INSIDE CRT
    ctx.textAlign = 'left';
    const startX = borderX + 40;
    let y = borderY + 32;

    // Title Banner
    ctx.fillStyle = C64_YELLOW;
    ctx.font = 'bold 34px "Courier New", monospace';
    ctx.fillText('=== FAHRI AYBARS BARUT | PORTFOLIO ===', startX, y);
    y += 52;

    // Navigation Bar
    ctx.font = 'bold 24px "Courier New", monospace';
    const keys = [
      { key: 'F1', label: 'HOME', active: activeSection === 'home' },
      { key: 'F3', label: 'ABOUT', active: activeSection === 'about' },
      { key: 'F5', label: 'PROJECTS', active: activeSection === 'projects' },
      { key: 'F7', label: 'CERTS', active: activeSection === 'certs' },
      { key: 'F8', label: 'CONTACT', active: activeSection === 'contact' },
      ...(floppyInserted ? [{ key: 'F10', label: 'GAME', active: activeSection === 'game' }] : []),
    ];

    let kx = startX;
    keys.forEach((k) => {
      const text = `[${k.key}:${k.label}]`;
      const w = ctx.measureText(text).width;
      if (k.active) {
        ctx.fillStyle = C64_WHITE;
        ctx.fillRect(kx - 4, y - 4, w + 8, 34);
        ctx.fillStyle = '#2b2075';
      } else {
        ctx.fillStyle = C64_CYAN;
      }
      ctx.fillText(text, kx, y);
      kx += w + 20;
    });

    y += 52;
    ctx.strokeStyle = '#6c63ff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(W - borderX - 40, y);
    ctx.stroke();
    y += 36;

    // Active Section Renderer
    if (activeSection === 'home') {
      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 36px "Courier New", monospace';
      ctx.fillText('FAHRI AYBARS BARUT', startX, y);
      y += 42;

      ctx.fillStyle = C64_CYAN;
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillText('Computer Engineer | Simulation & VR/XR Developer', startX, y);
      y += 36;
      ctx.fillText('Location: Ankara, Turkey', startX, y);
      y += 50;

      const links = [
        { label: '🔗 GITHUB   : github.com/AybarsBarut', idx: 0 },
        { label: '🔗 LINKEDIN : linkedin.com/in/fahriaybarsbarut1853', idx: 1 },
        { label: '📖 OPEN NOTEBOOK CV (VIEW & DOWNLOAD)', idx: 2 },
      ];

      links.forEach((link) => {
        const isSel = crtSelectedIndex === link.idx;
        if (isSel) {
          ctx.fillStyle = C64_YELLOW;
          ctx.fillRect(startX - 8, y - 4, 880, 36);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 24px "Courier New", monospace';
          ctx.fillText(`► ${link.label} [PRESS RETURN]`, startX, y);
        } else {
          ctx.fillStyle = C64_YELLOW;
          ctx.font = 'bold 24px "Courier New", monospace';
          ctx.fillText(`  ${link.label}`, startX, y);
        }
        y += 44;
      });

      y += 30;
      ctx.fillStyle = C64_GREEN;
      ctx.font = 'bold 22px "Courier New", monospace';
      ctx.fillText('>>> USE ARROW KEYS [▲/▼] TO NAVIGATE LINKS & RETURN TO SELECT >>>', startX, y);
    } else if (activeSection === 'about') {
      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 34px "Courier New", monospace';
      ctx.fillText('SYS_INFO: /ABOUT/BACKGROUND', startX, y);
      y += 44;

      ctx.fillStyle = C64_CYAN;
      ctx.font = 'bold 22px "Courier New", monospace';
      const aboutLines = [
        'COMPUTER ENGINEERING GRADUATE FROM SIVAS CUMHURIYET UNIVERSITY.',
        'SPECIALIZED IN GRAPHICS PROGRAMMING, SIMULATION SYSTEMS, AND VR/XR.',
        'EXPERIENCED WITH C++, C#, PYTHON, OPENGL, UNREAL ENGINE 5 & UNITY.',
        'DESIGNING ZERO-ALLOCATION ARCHITECTURES & RAG AI LEGAL SYSTEMS.',
      ];

      aboutLines.forEach((line) => {
        ctx.fillText(line, startX, y);
        y += 34;
      });

      y += 30;
      ctx.fillStyle = C64_YELLOW;
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillText('PRESS [F5] FOR PROJECTS OR [F7] FOR CERTIFICATIONS', startX, y);
    } else if (activeSection === 'projects') {
      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 34px "Courier New", monospace';
      ctx.fillText('DIRECTORY: /PORTFOLIO/PROJECTS', startX, y);
      y += 40;

      const projs = [
        {
          name: '1. ARCHURA ENGINE (SDL2/C++)',
          repo: 'github.com/AybarsBarut/Archura-Game-Engine-SDL',
          stack: 'C++ | OpenGL | SDL2 | ECS Architecture',
          desc: 'Custom C++ game engine with rendering pipelines & ECS',
        },
        {
          name: '2. ANAYASAL RAG AI',
          repo: 'github.com/AybarsBarut/AnayasalRAGai',
          stack: 'Python | LangChain | LLM | Vector Search',
          desc: 'Context-aware RAG AI for the Turkish Constitution',
        },
        {
          name: '3. ARCHURA SYNCGUARD',
          repo: 'github.com/AybarsBarut/Archura-SyncGuard',
          stack: 'PowerShell | GitHub API | Automation',
          desc: 'GitHub version controller and Windows auto-updater',
        },
        {
          name: '4. AIRPRINT RECEIVER',
          repo: 'github.com/AybarsBarut/Archura-Airprint-Reciever-For-Android',
          stack: 'Kotlin | Jetpack Compose | mDNS / IPP',
          desc: 'AirPrint receiver app for Android devices',
        },
      ];

      projs.forEach((p, idx) => {
        const isSel = crtSelectedIndex % projs.length === idx;
        if (isSel) {
          ctx.fillStyle = C64_YELLOW;
          ctx.fillRect(startX - 8, y - 4, 880, 32);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 23px "Courier New", monospace';
          ctx.fillText(`► ${p.name} [OPEN: ${p.repo}]`, startX, y);
        } else {
          ctx.fillStyle = C64_YELLOW;
          ctx.font = 'bold 24px "Courier New", monospace';
          ctx.fillText(`  ${p.name}`, startX, y);
        }
        y += 30;

        ctx.fillStyle = C64_CYAN;
        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.fillText(`   TECH : ${p.stack}`, startX, y);
        y += 28;

        ctx.fillStyle = C64_WHITE;
        ctx.font = '20px "Courier New", monospace';
        ctx.fillText(`   INFO : ${p.desc}`, startX, y);
        y += 40;
      });
    } else if (activeSection === 'certs') {
      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 34px "Courier New", monospace';
      ctx.fillText('DIRECTORY: /PORTFOLIO/CERTIFICATIONS', startX, y);
      y += 40;

      const certs = [
        {
          name: '1. ARTIFICIAL INTELLIGENCE FUNDAMENTALS',
          url: 'credly.com/badges/0387ce1f',
          issuer: 'IBM (Jul 2026)',
          tech: 'AI Applications | LLMs | Machine Learning',
        },
        {
          name: '2. NETWORKING BASICS',
          url: 'credly.com/badges/ed18adc3',
          issuer: 'Cisco (May 2026)',
          tech: 'Computer Networks | Routing | TCP/IP | Switching',
        },
        {
          name: '3. LFS101: INTRODUCTION TO LINUX',
          url: 'linuxfoundation.org/lfs101',
          issuer: 'The Linux Foundation (May 2026)',
          tech: 'Linux Kernel | Shell Scripting | System Admin',
        },
        {
          name: '4. IBM DATA FUNDAMENTALS',
          url: 'credly.com/badges/77a3e590',
          issuer: 'IBM (May 2026)',
          tech: 'Relational DBs | Data Architecture | SQL',
        },
        {
          name: '5. CISCO C++ ADVANCED',
          url: 'credly.com/badges/e3fd7bf4',
          issuer: 'Cisco (May 2026)',
          tech: 'C++17 | OOP | Memory Systems | Templates',
        },
        {
          name: '6. ENDPOINT SECURITY',
          url: 'credly.com/badges/cfc7b96f',
          issuer: 'Cisco (May 2026)',
          tech: 'Cybersecurity | Endpoint Protection | Firewalls',
        },
        {
          name: '7. INTRODUCTION TO CYBERSECURITY',
          url: 'credly.com/badges/29885bb6',
          issuer: 'Cisco (Apr 2026)',
          tech: 'Network Security | Threat Analysis | Encryption',
        },
        {
          name: '8. MODEL CONTEXT PROTOCOL: ADVANCED',
          url: 'verify.skilljar.com/ambpyq92zawf',
          issuer: 'Anthropic (Apr 2026)',
          tech: 'MCP Architecture | Agent Integration | Tools API',
        },
      ];

      certs.forEach((c, idx) => {
        const isSel = crtSelectedIndex % certs.length === idx;
        if (isSel) {
          ctx.fillStyle = C64_YELLOW;
          ctx.fillRect(startX - 8, y - 4, 880, 26);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 20px "Courier New", monospace';
          ctx.fillText(`► ${c.name} (${c.issuer}) [VERIFY]`, startX, y);
        } else {
          ctx.fillStyle = C64_YELLOW;
          ctx.font = 'bold 20px "Courier New", monospace';
          ctx.fillText(`  ${c.name} (${c.issuer})`, startX, y);
        }
        y += 24;

        ctx.fillStyle = C64_CYAN;
        ctx.font = '18px "Courier New", monospace';
        ctx.fillText(`   SKILLS : ${c.tech}`, startX, y);
        y += 28;
      });
    } else if (activeSection === 'contact') {
      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 34px "Courier New", monospace';
      ctx.fillText('COMMODORE DATALINK (CONTACT)', startX, y);
      y += 44;

      const contactItems = [
        { label: '🔗 GITHUB   : github.com/AybarsBarut', idx: 0 },
        { label: '🔗 LINKEDIN : linkedin.com/in/fahriaybarsbarut1853', idx: 1 },
        { label: '📄 DOWNLOAD OFFICIAL CV (PDF FORMAT)', idx: 2 },
        { label: '📝 DOWNLOAD OFFICIAL CV (DOCX FORMAT)', idx: 3 },
      ];

      contactItems.forEach((item) => {
        const isSel = crtSelectedIndex === item.idx;
        if (isSel) {
          ctx.fillStyle = C64_YELLOW;
          ctx.fillRect(startX - 8, y - 4, 880, 36);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 24px "Courier New", monospace';
          ctx.fillText(`► ${item.label} [PRESS RETURN]`, startX, y);
        } else {
          ctx.fillStyle = C64_CYAN;
          ctx.font = 'bold 24px "Courier New", monospace';
          ctx.fillText(`  ${item.label}`, startX, y);
        }
        y += 42;
      });

      y += 20;
      ctx.fillStyle = C64_GREEN;
      ctx.font = 'bold 22px "Courier New", monospace';
      ctx.fillText('STATUS: OPEN FOR SIMULATION & VR/XR LAB PROJECTS!', startX, y);
    } else if (activeSection === 'game') {
      const { grid, activePiece, nextPieceType, score, lines, level, gameOver } = tetris;

      // Header Title
      ctx.fillStyle = C64_YELLOW;
      ctx.font = 'bold 30px "Courier New", monospace';
      ctx.fillText('**** TETRIS 64 - FLOPPY EDITION ****', startX, y);
      y += 36;

      // Board coordinates
      const boardX = startX + 30;
      const boardY = y;
      const cellSize = 32; // 10 * 32 = 320px width, 20 * 32 = 640px height
      const boardW = COLS * cellSize;
      const boardH = ROWS * cellSize;

      // Board Outer Frame
      ctx.fillStyle = '#080816';
      ctx.fillRect(boardX, boardY, boardW, boardH);
      ctx.strokeStyle = '#6c63ff';
      ctx.lineWidth = 4;
      ctx.strokeRect(boardX - 3, boardY - 3, boardW + 6, boardH + 6);

      // Render Grid Cells
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const color = grid[r][c];
          const cx = boardX + c * cellSize;
          const cy = boardY + r * cellSize;

          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(cx + 1, cy + 1, cellSize - 2, cellSize - 2);
            // Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(cx + 1, cy + 1, cellSize - 2, 4);
            ctx.fillRect(cx + 1, cy + 1, 4, cellSize - 2);
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fillRect(cx + 1, cy + cellSize - 5, cellSize - 2, 4);
            ctx.fillRect(cx + cellSize - 5, cy + 1, 4, cellSize - 2);
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fillRect(cx + cellSize / 2 - 1, cy + cellSize / 2 - 1, 2, 2);
          }
        }
      }

      // Render Active Falling Piece
      if (activePiece && !gameOver) {
        const { shape, color, x: px, y: py } = activePiece;
        for (let r = 0; r < shape.length; r++) {
          for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
              const cx = boardX + (px + c) * cellSize;
              const cy = boardY + (py + r) * cellSize;
              if (cy >= boardY) {
                ctx.fillStyle = color;
                ctx.fillRect(cx + 1, cy + 1, cellSize - 2, cellSize - 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fillRect(cx + 1, cy + 1, cellSize - 2, 4);
                ctx.fillRect(cx + 1, cy + 1, 4, cellSize - 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(cx + 1, cy + cellSize - 5, cellSize - 2, 4);
                ctx.fillRect(cx + cellSize - 5, cy + 1, 4, cellSize - 2);
              }
            }
          }
        }
      }

      // Side Stats & Info Panel
      const sideX = boardX + boardW + 45;
      let sideY = boardY + 10;

      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillText('SCORE', sideX, sideY);
      sideY += 30;
      ctx.fillStyle = C64_YELLOW;
      ctx.font = 'bold 32px "Courier New", monospace';
      ctx.fillText(String(score).padStart(6, '0'), sideX, sideY);
      sideY += 46;

      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillText('LINES', sideX, sideY);
      sideY += 30;
      ctx.fillStyle = C64_CYAN;
      ctx.font = 'bold 32px "Courier New", monospace';
      ctx.fillText(String(lines).padStart(4, '0'), sideX, sideY);
      sideY += 46;

      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillText('LEVEL', sideX, sideY);
      sideY += 30;
      ctx.fillStyle = C64_GREEN;
      ctx.font = 'bold 32px "Courier New", monospace';
      ctx.fillText(String(level).padStart(2, '0'), sideX, sideY);
      sideY += 50;

      // Next Piece Box
      ctx.fillStyle = C64_WHITE;
      ctx.font = 'bold 22px "Courier New", monospace';
      ctx.fillText('NEXT PIECE:', sideX, sideY);
      sideY += 28;

      const previewBoxW = 160;
      const previewBoxH = 110;
      ctx.fillStyle = '#080816';
      ctx.fillRect(sideX, sideY, previewBoxW, previewBoxH);
      ctx.strokeStyle = '#6c63ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(sideX, sideY, previewBoxW, previewBoxH);

      if (nextPieceType) {
        const nextDef = TETROMINOES[nextPieceType];
        const nShape = nextDef.shape;
        const pCell = 22;
        const offX = sideX + (previewBoxW - nShape[0].length * pCell) / 2;
        const offY = sideY + (previewBoxH - nShape.length * pCell) / 2;

        for (let r = 0; r < nShape.length; r++) {
          for (let c = 0; c < nShape[r].length; c++) {
            if (nShape[r][c]) {
              ctx.fillStyle = nextDef.color;
              ctx.fillRect(offX + c * pCell + 1, offY + r * pCell + 1, pCell - 2, pCell - 2);
            }
          }
        }
      }
      sideY += previewBoxH + 40;

      // Controls Legend
      ctx.fillStyle = C64_YELLOW;
      ctx.font = 'bold 20px "Courier New", monospace';
      ctx.fillText('CONTROLS:', sideX, sideY);
      sideY += 26;
      ctx.fillStyle = C64_CYAN;
      ctx.font = '18px "Courier New", monospace';
      ctx.fillText('⌨️ [◄/►] MOVE  [▲/W] ROTATE', sideX, sideY);
      sideY += 24;
      ctx.fillText('⌨️ [▼/S] DROP  [SPACE] HARD DROP', sideX, sideY);
      sideY += 24;
      ctx.fillText('🕹️ JOYSTICK: DRAG STICK', sideX, sideY);

      // Game Over Banner
      if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(boardX, boardY + boardH / 2 - 70, boardW, 140);
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 4;
        ctx.strokeRect(boardX, boardY + boardH / 2 - 70, boardW, 140);

        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 38px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', boardX + boardW / 2, boardY + boardH / 2 - 35);

        if (cursorRef.current) {
          ctx.fillStyle = C64_YELLOW;
          ctx.font = 'bold 20px "Courier New", monospace';
          ctx.fillText('PRESS ENTER / SPACE', boardX + boardW / 2, boardY + boardH / 2 + 15);
          ctx.fillText('TO RESTART GAME', boardX + boardW / 2, boardY + boardH / 2 + 40);
        }
        ctx.textAlign = 'left';
      }
    }

    // Cursor
    if (cursorRef.current) {
      ctx.fillStyle = C64_CYAN;
      ctx.fillRect(W - borderX - 60, H - borderY - 45, 24, 30);
    }

    // Draw Subtle Retro CRT Scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let sy = borderY; sy < borderY + innerH; sy += 4) {
      ctx.fillRect(borderX, sy, innerW, 2);
    }

    if (onTextureNeedsUpdate) onTextureNeedsUpdate();
  }, [powerState, activeSection, crtSelectedIndex, floppyInserted, tetris, onTextureNeedsUpdate]);

  return (
    <canvas
      id="crt-canvas"
      ref={canvasRef}
      width={1280}
      height={960}
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '1px',
        height: '1px',
        opacity: 0.01,
        pointerEvents: 'none',
        zIndex: -9999,
      }}
    />
  );
}
