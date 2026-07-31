import { create } from 'zustand';
import { downloadCVPdf, downloadCVDocx } from '@/utils/cvDownloader';

export type PowerState = 
  | 'off' 
  | 'turning_on' 
  | 'basic_boot' 
  | 'typing_load' 
  | 'on' 
  | 'turning_off';

export type Section = 'home' | 'about' | 'projects' | 'certs' | 'contact';

interface SceneState {
  powerState: PowerState;
  activeSection: Section;
  typedLines: string[];
  
  lampOn: boolean;
  floppyInserted: boolean;
  cassetteInserted: boolean;
  notebookOpen: boolean;
  mugLifted: boolean;
  joystickAngle: { x: number; z: number };
  secretFound: boolean;
  
  pressedKey: string | null;
  deskOffset: { x: number; z: number };
  hoveredObject: string | null;
  crtSelectedIndex: number;
  notebookScrollY: number;

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
  toggleNotebook: () => set((s) => ({ notebookOpen: !s.notebookOpen, notebookScrollY: 0 })),
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
      const counts: Record<string, number> = { home: 3, about: 3, projects: 4, certs: 8, contact: 4 };
      const max = counts[activeSection] || 4;
      set({ crtSelectedIndex: (crtSelectedIndex - 1 + max) % max });
    }
  },

  navigateDown: () => {
    const { notebookOpen, crtSelectedIndex, activeSection } = get();
    if (notebookOpen) {
      set((s) => ({ notebookScrollY: Math.min(300, s.notebookScrollY + 40) }));
    } else {
      const counts: Record<string, number> = { home: 3, about: 3, projects: 4, certs: 8, contact: 4 };
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
        () => window.open('https://github.com/AybarsBarut/Archura-Game-Engine-SDL', '_blank'),
        () => window.open('https://github.com/AybarsBarut/AnayasalRAGai', '_blank'),
        () => window.open('https://github.com/AybarsBarut/Archura-SyncGuard', '_blank'),
        () => window.open('https://github.com/AybarsBarut/Archura-Airprint-Reciever-For-Android', '_blank'),
      ];
      if (actions[crtSelectedIndex]) actions[crtSelectedIndex]();
    } else if (activeSection === 'certs') {
      const actions = [
        () => window.open('https://www.credly.com/badges/0387ce1f-7b17-456f-8447-1ee63e9a4e0d/linked_in_profile', '_blank'),
        () => window.open('https://www.credly.com/badges/ed18adc3-b434-46b4-a316-7799e4024489/linked_in_profile', '_blank'),
        () => window.open('https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/2421a6bd-14d8-4a49-bf23-6761173d3824-aybars-barut-c6a11912-7e73-4976-8e27-50d72f2ebb3c-certificate.pdf', '_blank'),
        () => window.open('https://www.credly.com/badges/77a3e590-eec3-4ced-8496-ab86c62281af/linked_in_profile', '_blank'),
        () => window.open('https://www.credly.com/badges/e3fd7bf4-1a87-4a69-a980-6851f18b52ce/linked_in_profile', '_blank'),
        () => window.open('https://www.credly.com/badges/cfc7b96f-0c5a-4373-a715-194571f5d083/linked_in_profile', '_blank'),
        () => window.open('https://www.credly.com/badges/29885bb6-4b12-45c2-ae0d-4d4c18ab7180/linked_in_profile', '_blank'),
        () => window.open('https://verify.skilljar.com/c/ambpyq92zawf', '_blank'),
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
