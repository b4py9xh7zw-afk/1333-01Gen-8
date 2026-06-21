import { create } from 'zustand';
import type { Parent, Child, EyeProtection } from '@/types';
import { mockEyeProtection } from '@/mock';

interface AppState {
  isLoggedIn: boolean;
  parent: Parent | null;
  currentChildId: string | null;
  eyeProtection: EyeProtection;
  settingsVerified: boolean;

  login: (parent: Parent) => void;
  logout: () => void;
  setCurrentChild: (childId: string) => void;
  getCurrentChild: () => Child | null;
  toggleEyeProtection: () => void;
  setSettingsVerified: (verified: boolean) => void;
}

const useAppStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  parent: null,
  currentChildId: null,
  eyeProtection: mockEyeProtection,
  settingsVerified: false,

  login: (parent) => {
    set({
      isLoggedIn: true,
      parent,
      currentChildId: parent.children[0]?.id || null,
    });
  },

  logout: () => {
    set({
      isLoggedIn: false,
      parent: null,
      currentChildId: null,
      settingsVerified: false,
    });
  },

  setCurrentChild: (childId) => {
    set({ currentChildId: childId });
  },

  getCurrentChild: () => {
    const { parent, currentChildId } = get();
    return parent?.children.find((c) => c.id === currentChildId) || null;
  },

  toggleEyeProtection: () => {
    set((state) => ({
      eyeProtection: {
        ...state.eyeProtection,
        enabled: !state.eyeProtection.enabled,
      },
    }));
  },

  setSettingsVerified: (verified) => {
    set({ settingsVerified: verified });
  },
}));

export default useAppStore;
