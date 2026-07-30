import { create } from 'zustand';

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
  pressedKey: string | null;
  deskOffset: { x: number; z: number };
  hoveredObject: string | null;

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
  setSection: (section) => set({ activeSection: section }),
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
}));
