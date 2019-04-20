import './index.css';
// import * as serviceWorker from './serviceWorker';

/** Constants. */
const CLICK = 'click';
const BUTTON = 'button';

/** State. */
const state = {};

state.clicks = {
  current: 0,
  total: 0,
};

state.cursor = {
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

/** @see {@link https://coderpatsy.bitbucket.io/cookies/cookies.html} */
state.generators = {
  generatorA: {
    label: 'Generator A',
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

  generatorB: {
    label: 'Generator B',
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

  generatorC: {
    label: 'Generator C',
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

  generatorD: {
    label: 'Generator D',
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

  generatorE: {
    label: 'Generator E',
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

  generatorF: {
    label: 'Generator F',
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

  generatorG: {
    label: 'Generator G',
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

  generatorH: {
    label: 'Generator H',
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

  generatorI: {
    label: 'Generator I',
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

  generatorJ: {
    label: 'Generator J',
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

  generatorK: {
    label: 'Generator K',
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

  generatorL: {
    label: 'Generator L',
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

  generatorM: {
    label: 'Generator M',
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

  generatorN: {
    label: 'Generator N',
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

  generatorO: {
    label: 'Generator O',
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

  generatorP: {
    label: 'Generator P',
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

// set `next` value for cursor `cost` and `output`
state.cursor.cost.next = state.cursor.cost.base;
state.cursor.output.next = state.cursor.output.base;

// set `next` value for generators `cost` and `output`
Object.keys(state.generators).forEach(id => {
  const generator = state.generators[id];
  generator.cost.next = generator.cost.base;
  generator.output.next = generator.output.base;
});

/** Elements. */
const elements = {
  button: document.getElementById('button'),
  counter: document.getElementById('counter'),
  cursor: document.getElementById('upgrade'),
  store: document.getElementById('store'),
};

// add generators to table
Object.keys(state.generators).forEach(id => {
  const generatorNode = elements.cursor.cloneNode(true);
  generatorNode.id = id;
  const button = generatorNode.querySelector(BUTTON);
  const { label } = state.generators[id];
  button.title = label;
  button.innerText = label;
  elements.store.appendChild(generatorNode);
});

/** Helpers. */

/**
 * @param  {Number} base
 * @param  {Number} rate
 * @param  {Number} owned
 * @return {Number}
 */
const calculateNextCost = (base, rate, owned) => {
  return Math.floor(base * Math.pow(rate, owned));
};

/**
 * @param  {String}      id
 * @return {HTMLElement}
 */
const getElementById = id => {
  return elements[id]
    ? elements[id]
    : (elements[id] = document.getElementById(id));
};

/**
 * @param  {Number} clicks
 * @param  {Number} seconds
 * @return {String}
 */
const formatGeneratorOutput = (clicks, seconds) => {
  return [
    clicks.toLocaleString(),
    clicks === 1 ? 'click' : 'clicks',
    'per',
    seconds.toLocaleString(),
    seconds === 1 ? 'second' : 'seconds',
  ].join(' ');
};

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
    }

    views.renderCounter();
    const cursorButton = elements.cursor.querySelector(BUTTON);
    cursorButton.disabled = clicks.current < state.cursor.cost.next;

    const { generators } = state;
    Object.keys(generators).forEach(id => {
      const generatorRow = getElementById(id);
      const generatorButton = generatorRow.querySelector(BUTTON);
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

// click button
elements.button.addEventListener(CLICK, () => {
  actions.increment(state.cursor.output.current);
});

// upgrade cursor
elements.cursor.querySelector(BUTTON).addEventListener(CLICK, () => {
  if (state.clicks.current >= state.cursor.cost.next) {
    actions.decrement(state.cursor.cost.next);
    actions.updateCursor();
  }
});

// purchase generator
Object.keys(state.generators).forEach(id => {
  const generator = state.generators[id];
  const generatorRow = getElementById(id);

  generatorRow.querySelector(BUTTON).addEventListener(CLICK, () => {
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
    }
  });
});

/** Bootstrap. */
views.renderCounter();
views.renderCursor();
views.renderGenerators();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
