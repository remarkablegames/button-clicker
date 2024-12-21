import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ClickState {
  current: number;
  total: number;
  increase: (by?: number) => void;
  decrease: (by?: number) => void;
}

export const useClickStore = create<ClickState>()(
  devtools(
    persist(
      (set) => ({
        current: 0,
        total: 0,

        increase: (by = 1) =>
          set((state) => ({
            current: state.current + by,
            total: state.total + by,
          })),

        decrease: (by = 1) => set((state) => ({ current: state.current - by })),
      }),

      {
        name: 'click-storage',
      },
    ),
  ),
);
