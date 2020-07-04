import { EVENT_CLICK, SELECTOR_BUTTON } from './constants';
import {
  calculateNextCost,
  elements,
  formatGeneratorOutput,
  getElementById,
} from './helpers';

/** State. */
const state = {};

state.clicks = {
  current: 0,
  total: 0,
};

state.cursor = {
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
state.cursor.cost.next = state.cursor.cost.base;
state.cursor.output.next = state.cursor.output.base;

/** @see {@link https://coderpatsy.bitbucket.io/cookies/cookies.html} */
state.generators = {
  generator1: {
    label: 'Generator 1',
    message: 'Purchased Generator 1.',
    owned: 0,
    delay: 10,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
    cost: {
      base: 1e12, // 1,000,000,000,000
      rate: 1.15,
    },
    output: {
      base: 1e5, // 10,000,000
      current: 0,
    },
  },

  generator12: {
    label: 'Generator 12',
    message: 'Purchased Generator 12.',
    owned: 0,
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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
    delay: 1,
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

state.messages = {
  1: 'The clicking has commenced...',
  10: 'The button has been clicked ten times.',
  100: 'The button has been clicked one hundred times.',
  1000: 'The button has been clicked one thousand times.',
  10000: 'The button has been clicked ten thousand times.',
  100000: 'The button has been clicked one hundred thousand times.',
  1000000: 'The button has been clicked one million times.',
  10000000: 'The button has been clicked ten million times.',
  100000000: 'The button has been clicked one hundred million times.',
  1000000000: 'The button has been clicked one billion times.',
  10000000000: 'The button has been clicked ten billion times.',
  100000000000: 'The button has been clicked one hundred billion times.',
  1000000000000: 'The button has been clicked one trillion times.',
  10000000000000: 'The button has been clicked ten trillion times.',
  100000000000000: 'The button has been clicked one hundred trillion times.',
  1000000000000000: 'The button has been clicked one quadrillion times.',
  10000000000000000: 'The button has been clicked ten quadrillion times.',
  100000000000000000: 'The button has been clicked one hundred quadrillion times.',
  1000000000000000000: 'The button has been clicked one quitillion times.',
  10000000000000000000: 'The button has been clicked ten quitillion times.',
  100000000000000000000: 'The button has been clicked one hundred quitillion times.',
  1000000000000000000000: 'The button has been clicked one sextillion times.',
};

Object.keys(state.generators).forEach(id => {
  // set `next` value for generator `cost` and `output`
  const generator = state.generators[id];
  generator.cost.next = generator.cost.base;
  generator.output.next = generator.output.base;

  // append generator to table
  const generatorElement = elements.cursor.cloneNode(true);
  generatorElement.id = id;
  const button = generatorElement.querySelector(SELECTOR_BUTTON);
  button.title = generator.label;
  button.innerText = generator.label;
  elements.store.appendChild(generatorElement);
});

/** Views. */
const views = {
  renderCounter: () => {
    elements.counter.innerText = state.clicks.current.toLocaleString();
  },

  renderCursor: () => {
    const cursorRow = elements.cursor;
    const { cursor } = state;
    cursorRow.querySelector('.owned').innerText = (
      cursor.owned - 1
    ).toLocaleString();
    cursorRow.querySelector(
      '.cost'
    ).innerText = cursor.cost.next.toLocaleString();
    cursorRow.querySelector(
      '.output-current'
    ).innerText = `${cursor.output.current.toLocaleString()} per click`;
    cursorRow.querySelector(
      '.output-next'
    ).innerText = `${cursor.output.next.toLocaleString()} per click`;
  },

  /**
   * @param {String} id
   */
  renderGenerator: id => {
    const generator = state.generators[id];
    const generatorRow = getElementById(id);
    generatorRow.querySelector(
      '.owned'
    ).innerText = generator.owned.toLocaleString();
    generatorRow.querySelector(
      '.cost'
    ).innerText = generator.cost.next.toLocaleString();
    generatorRow.querySelector(
      '.output-current'
    ).innerText = formatGeneratorOutput(
      generator.output.current,
      generator.delay
    );
    generatorRow.querySelector(
      '.output-next'
    ).innerText = formatGeneratorOutput(generator.output.next, generator.delay);
  },

  renderGenerators: () => {
    Object.keys(state.generators).forEach(id => {
      views.renderGenerator(id);
    });
  },

  /**
   * @param {String} [text]
   */
  renderMessage: text => {
    const { total } = state.clicks;
    let message;

    if (text) {
      message = text;
    } else {
      // check for exact match in messages table
      if (state.messages[total]) {
        message = state.messages[total];
        delete state.messages[total];
      } else {
        // otherwise compare number of first message
        for (const key in state.messages) {
          if (total >= key) {
            message = state.messages[key];
            delete state.messages[key];
          }
          break;
        }
      }
    }

    if (!message) {
      return;
    }

    message = message.toLocaleString();
    if (message !== elements.message.innerText) {
      elements.message.innerText = message;
    }
  },
};

/** Actions. */
const actions = {
  /**
   * @param {Number}  number
   * @param {Boolean} [skipTotal]
   */
  increment: (number, skipTotal) => {
    const { clicks } = state;
    clicks.current += number;
    if (!skipTotal) {
      clicks.total += number;
      views.renderMessage();
    }

    views.renderCounter();
    const { cursorButton } = elements;
    cursorButton.disabled = clicks.current < state.cursor.cost.next;

    const { generators } = state;
    Object.keys(generators).forEach(id => {
      const generatorRow = getElementById(id);
      const generatorButton = generatorRow.querySelector(SELECTOR_BUTTON);
      generatorButton.disabled = clicks.current < generators[id].cost.next;
    });
  },

  /**
   * @param {Number} clicks
   */
  decrement: clicks => {
    actions.increment(-clicks, true);
  },

  updateCursor: () => {
    const { cursor } = state;
    const { cost, output } = cursor;
    const owned = ++cursor.owned;
    cost.next = calculateNextCost(cost.base, cost.rate, owned - 1);
    output.current = output.next;
    output.next = Math.round(output.base * owned);
    views.renderCursor();
  },

  /**
   * @param {String} id
   */
  updateGenerator: id => {
    const generator = state.generators[id];
    const { cost, output } = generator;
    const owned = ++generator.owned;
    cost.next = calculateNextCost(cost.base, cost.rate, owned);
    output.current = output.next;
    output.next = Math.round(output.base * (owned + 1));
    views.renderGenerator(id);
  },
};

/** Events. */

// button click
elements.button.addEventListener(EVENT_CLICK, () => {
  actions.increment(state.cursor.output.current);
});

// cursor upgrade
elements.cursor
  .querySelector(SELECTOR_BUTTON)
  .addEventListener(EVENT_CLICK, () => {
    if (state.clicks.current >= state.cursor.cost.next) {
      const { cursor } = state;
      actions.decrement(cursor.cost.next);
      actions.updateCursor();
      views.renderMessage(cursor.message);
    }
  });

// generator purchase
Object.keys(state.generators).forEach(id => {
  const generator = state.generators[id];
  const generatorRow = getElementById(id);

  generatorRow
    .querySelector(SELECTOR_BUTTON)
    .addEventListener(EVENT_CLICK, () => {
      if (state.clicks.current >= generator.cost.next) {
        actions.decrement(generator.cost.next);
        actions.updateGenerator(id);

        if (generator.interval) {
          generator.interval.callback = () => {
            actions.increment(generator.output.current);
          };
        } else {
          generator.interval = {
            output: generator.output.current,
            callback: () => {
              actions.increment(generator.output.current);
            },
          };
          setInterval(generator.interval.callback, generator.delay * 1000);
        }

        if (generator.message) {
          views.renderMessage(generator.message);
        }
      }
    });
});

/** Bootstrap. */
views.renderCounter();
views.renderCursor();
views.renderGenerators();
