import React, { useEffect, useState } from 'react';
import { useSceneStore, Section } from '@/stores/sceneStore';
import { sounds } from '@/utils/audio';

interface KeyConfig {
  code: string;
  label: string;
  x: number;
  z: number;
  w?: number;
  isFn?: boolean;
  section?: Section;
  action?: 'next' | 'prev' | 'back' | 'select';
}

export const C64_KEYS: KeyConfig[] = [
  // Top Row (Numbers)
  { code: 'Escape', label: 'ESC', x: -1.9, z: -0.45, w: 0.22, action: 'back' },
  { code: 'Digit1', label: '1', x: -1.6, z: -0.45 },
  { code: 'Digit2', label: '2', x: -1.34, z: -0.45 },
  { code: 'Digit3', label: '3', x: -1.08, z: -0.45 },
  { code: 'Digit4', label: '4', x: -0.82, z: -0.45 },
  { code: 'Digit5', label: '5', x: -0.56, z: -0.45 },
  { code: 'Digit6', label: '6', x: -0.3, z: -0.45 },
  { code: 'Digit7', label: '7', x: -0.04, z: -0.45 },
  { code: 'Digit8', label: '8', x: 0.22, z: -0.45 },
  { code: 'Digit9', label: '9', x: 0.48, z: -0.45 },
  { code: 'Digit0', label: '0', x: 0.74, z: -0.45 },
  { code: 'Backspace', label: 'DEL', x: 1.12, z: -0.45, w: 0.46, action: 'prev' },

  // QWERTY Row
  { code: 'Tab', label: 'CTRL', x: -1.88, z: -0.2, w: 0.26 },
  { code: 'KeyQ', label: 'Q', x: -1.56, z: -0.2 },
  { code: 'KeyW', label: 'W', x: -1.3, z: -0.2 },
  { code: 'KeyE', label: 'E', x: -1.04, z: -0.2 },
  { code: 'KeyR', label: 'R', x: -0.78, z: -0.2 },
  { code: 'KeyT', label: 'T', x: -0.52, z: -0.2 },
  { code: 'KeyY', label: 'Y', x: -0.26, z: -0.2 },
  { code: 'KeyU', label: 'U', x: 0.0, z: -0.2 },
  { code: 'KeyI', label: 'I', x: 0.26, z: -0.2 },
  { code: 'KeyO', label: 'O', x: 0.52, z: -0.2 },
  { code: 'KeyP', label: 'P', x: 0.78, z: -0.2 },
  { code: 'Enter', label: 'RETURN', x: 1.18, z: -0.2, w: 0.48, action: 'select' },

  // ASDF Row
  { code: 'CapsLock', label: 'STOP', x: -1.86, z: 0.05, w: 0.3 },
  { code: 'KeyA', label: 'A', x: -1.5, z: 0.05 },
  { code: 'KeyS', label: 'S', x: -1.24, z: 0.05 },
  { code: 'KeyD', label: 'D', x: -0.98, z: 0.05 },
  { code: 'KeyF', label: 'F', x: -0.72, z: 0.05 },
  { code: 'KeyG', label: 'G', x: -0.46, z: 0.05 },
  { code: 'KeyH', label: 'H', x: -0.2, z: 0.05 },
  { code: 'KeyJ', label: 'J', x: 0.06, z: 0.05 },
  { code: 'KeyK', label: 'K', x: 0.32, z: 0.05 },
  { code: 'KeyL', label: 'L', x: 0.58, z: 0.05 },

  // ZXCV Row
  { code: 'ShiftLeft', label: 'SHIFT', x: -1.82, z: 0.3, w: 0.38 },
  { code: 'KeyZ', label: 'Z', x: -1.44, z: 0.3 },
  { code: 'KeyX', label: 'X', x: -1.18, z: 0.3 },
  { code: 'KeyC', label: 'C', x: -0.92, z: 0.3 },
  { code: 'KeyV', label: 'V', x: -0.66, z: 0.3 },
  { code: 'KeyB', label: 'B', x: -0.4, z: 0.3 },
  { code: 'KeyN', label: 'N', x: -0.14, z: 0.3 },
  { code: 'KeyM', label: 'M', x: 0.12, z: 0.3 },
  { code: 'ShiftRight', label: 'SHIFT', x: 1.1, z: 0.3, w: 0.44 },

  // Space Bar
  { code: 'Space', label: 'SPACE (NEXT)', x: -0.3, z: 0.55, w: 2.0, action: 'next' },

  // Function Keys Side Block (Right Side)
  { code: 'F1', label: 'F1', x: 1.88, z: -0.45, w: 0.38, isFn: true, section: 'home' },
  { code: 'F3', label: 'F3', x: 1.88, z: -0.2, w: 0.38, isFn: true, section: 'about' },
  { code: 'F5', label: 'F5', x: 1.88, z: 0.05, w: 0.38, isFn: true, section: 'projects' },
  { code: 'F7', label: 'F7', x: 1.88, z: 0.3, w: 0.38, isFn: true, section: 'contact' },
];

export function C64Keyboard() {
  const { setPressedKey, setSection, activeSection } = useSceneStore();
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  const sections: Section[] = ['home', 'about', 'projects', 'contact'];

  const triggerKeyAction = (keyConfig: KeyConfig) => {
    sounds.playKeyPress();
    setPressedKey(keyConfig.code);

    if (keyConfig.section) {
      setSection(keyConfig.section);
    } else if (keyConfig.action === 'next') {
      const idx = sections.indexOf(activeSection);
      setSection(sections[(idx + 1) % sections.length]);
    } else if (keyConfig.action === 'prev') {
      const idx = sections.indexOf(activeSection);
      setSection(sections[(idx - 1 + sections.length) % sections.length]);
    } else if (keyConfig.action === 'back') {
      setSection('home');
    }

    setActiveKeys((prev) => ({ ...prev, [keyConfig.code]: true }));
    setTimeout(() => {
      setActiveKeys((prev) => ({ ...prev, [keyConfig.code]: false }));
      setPressedKey(null);
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['F1', 'F3', 'F5', 'F7', 'Space', 'Backspace', 'Tab'].includes(e.code)) {
        e.preventDefault();
      }

      const match = C64_KEYS.find(
        (k) => k.code.toLowerCase() === e.code.toLowerCase() || k.code === e.key
      );

      if (match) {
        triggerKeyAction(match);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  return (
    <group position={[0, 0.18, 0.15]}>
      {C64_KEYS.map((k) => {
        const isPressed = !!activeKeys[k.code];
        const width = k.w || 0.22;
        const keyColor = k.isFn ? '#b39d7b' : '#332c26';
        const topColor = k.isFn ? '#cbba9d' : '#473f38';

        return (
          <group
            key={k.code}
            position={[k.x, isPressed ? -0.04 : 0, k.z]}
            onClick={(e) => {
              e.stopPropagation();
              triggerKeyAction(k);
            }}
          >
            {/* Keycap Base */}
            <mesh castShadow position={[0, 0.07, 0]}>
              <boxGeometry args={[width, 0.14, 0.22]} />
              <meshStandardMaterial color={keyColor} roughness={0.35} />
            </mesh>

            {/* Keycap Top Surface */}
            <mesh position={[0, 0.145, 0]}>
              <boxGeometry args={[width * 0.88, 0.02, 0.19]} />
              <meshStandardMaterial color={topColor} roughness={0.25} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
