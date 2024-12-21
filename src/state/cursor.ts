import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { Cost, Output } from '../types';
import { calculateNextCost } from '../utils';

interface CursorState {
  message: string;
  owned: number;
  cost: Cost;
  output: Output;
  purchase: () => void;
}

export const useCursorStore = create<CursorState>()(
  devtools(
    persist(
      (set) => ({
        message: 'Upgraded cursor click power.',
        owned: 1,
        cost: {
          base: 100,
          next: 100,
          rate: 2,
        },
        output: {
          base: 2,
          next: 2,
          current: 1,
        },
        purchase: () =>
          set((state) => {
            const { cost, output } = state;
            state.owned += 1;
            cost.next = calculateNextCost(
              cost.base,
              cost.rate,
              state.owned - 1,
            );
            output.current = output.next;
            output.next = Math.round(output.base * state.owned);
            return state;
          }),
      }),

      {
        name: 'cursor-storage',
      },
    ),
  ),
);
