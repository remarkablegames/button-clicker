import './index.css';
// import * as serviceWorker from './serviceWorker';

/** Constants. */
const CLICK = 'click';
const BUTTON = 'button';

/** State. */
const state = {
  clicks: {
    current: 0,
    total: 0,
  },
  cursor: {
    owned: 1,
    cost: {
      next: 50,
      base: 50,
      rate: 2,
    },
    output: {
      current: 1,
      next: 2,
      base: 1,
    },
  },
  generators: {
    generator: {
      label: 'Generator',
      owned: 0,
      delay: 10, // in seconds
      cost: {
        next: 50,
        base: 50,
        rate: 1.1,
      },
      output: {
        current: 0,
        next: 1,
        base: 1,
      },
    },
  },
  intervals: {},
};

/** Elements. */
const elements = {
  button: document.getElementById('button'),
  counter: document.getElementById('counter'),
  store: document.getElementById('store'),
  storeCursor: document.getElementById('upgrade'),
};
Object.keys(state.generators).forEach(id => {
  const generatorNode = elements.storeCursor.cloneNode(true);
  generatorNode.id = id;
  generatorNode.querySelector(BUTTON).innerText = state.generators[id].label;
  elements.store.appendChild(generatorNode);
});

/** Helpers. */

/**
 * @param  {Number} clicks
 * @param  {Number} seconds
 * @return {String}
 */
const formatGeneratorOutput = (clicks, seconds) => {
  return [
    clicks.toLocaleString(),
    clicks > 1 ? 'clicks' : 'click',
    'per',
    seconds.toLocaleString(),
    seconds > 1 ? 'seconds' : 'second',
  ].join(' ');
};

/**
 * @param  {Number} base
 * @param  {Number} rate
 * @param  {Number} owned
 * @return {Number}
 */
const calculateNextCost = (base, rate, owned) => {
  return Math.floor(base * Math.pow(rate, owned));
};

/** Views. */
const views = {
  renderCounter: () => {
    elements.counter.innerText = state.clicks.current.toLocaleString();
  },

  renderStoreCursor: () => {
    const { storeCursor } = elements;
    const { cursor } = state;
    storeCursor.querySelector('.owned').innerText = (
      cursor.owned - 1
    ).toLocaleString();
    storeCursor.querySelector(
      '.cost'
    ).innerText = cursor.cost.next.toLocaleString();
    storeCursor.querySelector(
      '.output'
    ).innerText = `${cursor.output.next.toLocaleString()} per click`;
  },

  /**
   * @param {String} id
   */
  renderStoreGenerator: id => {
    const generator = state.generators[id];
    const generatorRow = document.getElementById(id);
    generatorRow.querySelector(
      '.owned'
    ).innerText = generator.owned.toLocaleString();
    generatorRow.querySelector(
      '.cost'
    ).innerText = generator.cost.next.toLocaleString();
    generatorRow.querySelector('.output').innerText = formatGeneratorOutput(
      generator.output.next,
      generator.delay
    );
  },

  renderStoreGenerators: () => {
    Object.keys(state.generators).forEach(id => {
      views.renderStoreGenerator(id);
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
    const cursorButton = elements.storeCursor.querySelector(BUTTON);
    cursorButton.disabled = clicks.current < state.cursor.cost.next;

    const { generators } = state;
    Object.keys(generators).forEach(id => {
      const generatorRow = document.getElementById(id);
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

  updateStoreCursor: () => {
    const { cursor } = state;
    const { cost, output } = cursor;
    const owned = ++cursor.owned;
    cost.next = calculateNextCost(cost.base, cost.rate, owned - 1);
    output.current = output.next;
    output.next = Math.round(output.base * owned);
    views.renderStoreCursor();
  },

  /**
   * @param {String} id
   */
  updateStoreGenerator: id => {
    const generator = state.generators[id];
    const { cost, output } = generator;
    const owned = ++generator.owned;
    cost.next = calculateNextCost(cost.base, cost.rate, owned);
    output.current = output.next;
    output.next = Math.round(output.base * (owned + 1));
    views.renderStoreGenerator(id);
  },
};

/** Events. */

// click button
elements.button.addEventListener(CLICK, () => {
  actions.increment(state.cursor.output.current);
});

// upgrade cursor
elements.storeCursor.querySelector(BUTTON).addEventListener(CLICK, () => {
  if (state.clicks.current >= state.cursor.cost.next) {
    actions.decrement(state.cursor.cost.next);
    actions.updateStoreCursor();
  }
});

// purchase generator
Object.keys(state.generators).forEach(id => {
  const generator = state.generators[id];
  const generatorRow = document.getElementById(id);

  generatorRow.querySelector(BUTTON).addEventListener(CLICK, () => {
    if (state.clicks.current >= generator.cost.next) {
      const { intervals } = state;
      actions.decrement(generator.cost.next);
      actions.updateStoreGenerator(id);

      if (intervals.generator) {
        intervals.generator.callback = () => {
          actions.increment(generator.output.current);
        };
      } else {
        intervals.generator = {
          output: generator.output.current,
          callback: () => {
            actions.increment(generator.output.current);
          },
        };
        setInterval(intervals.generator.callback, generator.delay * 1000);
      }
    }
  });
});

/** Bootstrap. */
views.renderCounter();
views.renderStoreCursor();
views.renderStoreGenerators();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
