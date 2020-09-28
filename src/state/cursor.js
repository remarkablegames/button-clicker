export const cursor = {
  message: 'Upgraded cursor click power.',
  owned: 1,
  cost: {
    base: 100,
    rate: 2,
  },
  output: {
    base: 2,
    current: 1,
  },
};

cursor.cost.next = cursor.cost.base;
cursor.output.next = cursor.output.base;
