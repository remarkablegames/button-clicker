const costBase = 100;
const outputBase = 2;

export const cursor = {
  message: 'Upgraded cursor click power.',
  owned: 1,
  cost: {
    base: costBase,
    rate: 2,
    next: costBase,
  },
  output: {
    base: outputBase,
    current: 1,
    next: outputBase,
  },
};
