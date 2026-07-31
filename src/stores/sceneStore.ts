import { create } from 'zustand';
import { downloadCVPdf, downloadCVDocx } from '@/utils/cvDownloader';

export type PowerState = 
  | 'off' 
  | 'turning_on' 
  | 'basic_boot' 
  | 'typing_load' 
  | 'on' 
  | 'turning_off';

export type Section = 'home' | 'about' | 'projects' | 'contact';

interface SceneState {
  // Power & Boot
  powerState: PowerState;
  activeSection: Section;
  typedLines: string[];
  
  // Interactive Props
  lampOn: boolean;
  floppyInserted: boolean;
  cassetteInserted: boolean;
  notebookOpen: boolean;
  mugLifted: boolean;
  joystickAngle: { x: number; z: number };
  secretFound: boolean;
  
  // Controls & Camera
  // Interactive Selection & Navigation State
  pressedKey: string | null;
  deskOffset: { x: number; z: number };
  hoveredObject: string | null;
  crtSelectedIndex: number;
  notebookScrollY: number;

  // Actions
  turnOn: () => void;
  turnOff: () => void;
  setPowerState: (state: PowerState) => void;
  setSection: (section: Section) => void;
  setPressedKey: (key: string | null) => void;
  toggleLamp: () => void;
  toggleFloppy: () => void;
  toggleCassette: () => void;
  toggleNotebook: () => void;
  toggleMug: () => void;
  setJoystickAngle: (angle: { x: number; z: number }) => void;
  setDeskOffset: (offset: { x: number; z: number }) => void;
  setHoveredObject: (name: string | null) => void;
  setTypedLines: (lines: string[]) => void;
  triggerSecret: () => void;
  setCrtSelectedIndex: (idx: number) => void;
  navigateUp: () => void;
  navigateDown: () => void;
  triggerCurrentSelection: () => void;
}

export const useSceneStore = create<SceneState>((set, get) => ({
  // Computer starts POWERED OFF by default on site entry
  powerState: 'off',
  activeSection: 'home',
  typedLines: [],
  
  lampOn: true,
  floppyInserted: false,
  cassetteInserted: false,
  notebookOpen: false,
  mugLifted: false,
  joystickAngle: { x: 0, z: 0 },
  secretFound: false,

  pressedKey: null,
  deskOffset: { x: 0, z: 0 },
  hoveredObject: null,
  crtSelectedIndex: 0,
  notebookScrollY: 0,

  turnOn: () => {
    if (get().powerState !== 'off') return;
    set({ powerState: 'turning_on', typedLines: [] });
  },

  turnOff: () => {
    if (get().powerState === 'off' || get().powerState === 'turning_off') return;
    set({ powerState: 'turning_off' });
    setTimeout(() => {
      set({ powerState: 'off', activeSection: 'home', typedLines: [] });
    }, 1000);
  },

  setPowerState: (state) => set({ powerState: state }),
  setSection: (section) => set({ activeSection: section, crtSelectedIndex: 0 }),
  setPressedKey: (key) => set({ pressedKey: key }),
  toggleLamp: () => set((s) => ({ lampOn: !s.lampOn })),
  toggleFloppy: () => set((s) => ({ floppyInserted: !s.floppyInserted })),
  toggleCassette: () => set((s) => ({ cassetteInserted: !s.cassetteInserted })),
  toggleNotebook: () => set((s) => ({ notebookOpen: !s.notebookOpen })),
  toggleMug: () => set((s) => ({ mugLifted: !s.mugLifted })),
  setJoystickAngle: (angle) => set({ joystickAngle: angle }),
  setDeskOffset: (offset) => set({ deskOffset: offset }),
  setHoveredObject: (name) => set({ hoveredObject: name }),
  setTypedLines: (lines) => set({ typedLines: lines }),
  triggerSecret: () => set({ secretFound: true }),
  setCrtSelectedIndex: (idx) => set({ crtSelectedIndex: idx }),

  navigateUp: () => {
    const { notebookOpen, crtSelectedIndex, activeSection } = get();
    if (notebookOpen) {
      set((s) => ({ notebookScrollY: Math.max(0, s.notebookScrollY - 40) }));
    } else {
      const counts: Record<string, number> = { home: 3, about: 3, projects: 4, contact: 4 };
      const max = counts[activeSection] || 4;
      set({ crtSelectedIndex: (crtSelectedIndex - 1 + max) % max });
    }
  },

  navigateDown: () => {
    const { notebookOpen, crtSelectedIndex, activeSection } = get();
    if (notebookOpen) {
      set((s) => ({ notebookScrollY: Math.min(300, s.notebookScrollY + 40) }));
    } else {
      const counts: Record<string, number> = { home: 3, about: 3, projects: 4, contact: 4 };
      const max = counts[activeSection] || 4;
      set({ crtSelectedIndex: (crtSelectedIndex + 1) % max });
    }
  },

  triggerCurrentSelection: () => {
    const { activeSection, crtSelectedIndex, toggleNotebook } = get();
    
    if (activeSection === 'home') {
      const actions = [
        () => window.open('https://github.com/AybarsBarut', '_blank'),
        () => window.open('https://linkedin.com/in/fahriaybarsbarut1853', '_blank'),
        () => toggleNotebook(),
      ];
      if (actions[crtSelectedIndex]) actions[crtSelectedIndex]();
    } else if (activeSection === 'about') {
      const actions = [
        () => window.open('https://github.com/AybarsBarut', '_blank'),
        () => window.open('https://linkedin.com/in/fahriaybarsbarut1853', '_blank'),
        () => toggleNotebook(),
      ];
      if (actions[crtSelectedIndex]) actions[crtSelectedIndex]();
    } else if (activeSection === 'projects') {
      const actions = [
        () => window.open('https://github.com/AybarsBarut', '_blank'),
        () => window.open('https://github.com/AybarsBarut', '_blank'),
        () => window.open('https://github.com/AybarsBarut', '_blank'),
        () => window.open('https://github.com/AybarsBarut', '_blank'),
      ];
      if (actions[crtSelectedIndex]) actions[crtSelectedIndex]();
    } else if (activeSection === 'contact') {
      const actions = [
        () => window.open('https://github.com/AybarsBarut', '_blank'),
        () => window.open('https://linkedin.com/in/fahriaybarsbarut1853', '_blank'),
        () => downloadCVPdf(),
        () => downloadCVDocx(),
      ];
      if (actions[crtSelectedIndex]) actions[crtSelectedIndex]();
    }
  },
}));

