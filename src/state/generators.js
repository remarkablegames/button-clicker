/**
 * @see {@link https://coderpatsy.bitbucket.io/cookies/cookies.html}
 */
export const generators = {
  generator1: {
    label: 'Generator 1',
    message: 'Purchased Generator 1.',
    owned: 0,
    delay: 10, // seconds
    cost: {
      base: 15,
      rate: 1.15,
    },
    output: {
      base: 1,
      current: 0,
    },
  },

  generator2: {
    label: 'Generator 2',
    message: 'Purchased Generator 2.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 100,
      rate: 1.15,
    },
    output: {
      base: 1,
      current: 0,
    },
  },

  generator3: {
    label: 'Generator 3',
    message: 'Purchased Generator 3.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 11e2, // 1,100
      rate: 1.15,
    },
    output: {
      base: 8,
      current: 0,
    },
  },

  generator4: {
    label: 'Generator 4',
    message: 'Purchased Generator 4.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 12e3, // 12,000
      rate: 1.15,
    },
    output: {
      base: 47,
      current: 0,
    },
  },

  generator5: {
    label: 'Generator 5',
    message: 'Purchased Generator 5.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 13e4, // 130,000
      rate: 1.15,
    },
    output: {
      base: 260,
      current: 0,
    },
  },

  generator6: {
    label: 'Generator 6',
    message: 'Purchased Generator 6.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 14e5, // 1,400,000
      rate: 1.15,
    },
    output: {
      base: 14e2, // 1,400
      current: 0,
    },
  },

  generator7: {
    label: 'Generator 7',
    message: 'Purchased Generator 7.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 2e7, // 20,000,000
      rate: 1.15,
    },
    output: {
      base: 78e2, // 7,800
      current: 0,
    },
  },

  generator8: {
    label: 'Generator 8',
    message: 'Purchased Generator 8.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 33e7, // 330,000,000
      rate: 1.15,
    },
    output: {
      base: 44e3, // 44,000
      current: 0,
    },
  },

  generator9: {
    label: 'Generator 9',
    message: 'Purchased Generator 9.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 51e8, // 5,100,000,000
      rate: 1.15,
    },
    output: {
      base: 26e4, // 260,000
      current: 0,
    },
  },

  generator10: {
    label: 'Generator 10',
    message: 'Purchased Generator 10.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 75e9, // 75,000,000,000
      rate: 1.15,
    },
    output: {
      base: 16e5, // 1,600,000
      current: 0,
    },
  },

  generator11: {
    label: 'Generator 11',
    message: 'Purchased Generator 11.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 1e12, // 1,000,000,000,000
      rate: 1.15,
    },
    output: {
      base: 1e7, // 10,000,000
      current: 0,
    },
  },

  generator12: {
    label: 'Generator 12',
    message: 'Purchased Generator 12.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 14e12, // 14,000,000,000,000
      rate: 1.15,
    },
    output: {
      base: 65e6, // 65,000,000
      current: 0,
    },
  },

  generator13: {
    label: 'Generator 13',
    message: 'Purchased Generator 13.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 17e13, // 170,000,000,000,000
      rate: 1.15,
    },
    output: {
      base: 43e7, // 430,000,000
      current: 0,
    },
  },

  generator14: {
    label: 'Generator 14',
    message: 'Purchased Generator 14.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 21e14, // 2,100,000,000,000,000
      rate: 1.15,
    },
    output: {
      base: 29e8, // 2,900,000,000
      current: 0,
    },
  },

  generator15: {
    label: 'Generator 15',
    message: 'Purchased Generator 15.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 26e15, // 26,000,000,000,000,000
      rate: 1.15,
    },
    output: {
      base: 21e9, // 21,000,000,000
      current: 0,
    },
  },

  generator16: {
    label: 'Generator 16',
    message: 'Purchased Generator 16.',
    owned: 0,
    delay: 1, // seconds
    cost: {
      base: 31e16, // 310,000,000,000,000,000
      rate: 1.15,
    },
    output: {
      base: 15e10, // 150,000,000,000
      current: 0,
    },
  },
};

Object.keys(generators).forEach((id) => {
  // set `next` value for generator `cost` and `output`
  const generator = generators[id];
  generator.cost.next = generator.cost.base;
  generator.output.next = generator.output.base;
});
