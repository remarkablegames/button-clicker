import './index.css';
// import * as serviceWorker from './serviceWorker';

/** Constants. */
const CLICK = 'click';
const BUTTON = 'button';

/** State. */
const state = {
  clicks: 0,
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
  generator: {
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
  intervals: {},
};

/** Elements. */
const elements = {
  button: document.getElementById('button'),
  counter: document.getElementById('counter'),
  store: document.getElementById('store'),
  storeCursor: document.getElementById('cursor'),
  storeGenerator: document.getElementById('generator'),
};

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
    elements.counter.innerText = state.clicks.toLocaleString();
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
  renderStoreGenerator: () => {
    const { storeGenerator } = elements;
    const { generator } = state;
    storeGenerator.querySelector(
      '.owned'
    ).innerText = generator.owned.toLocaleString();
    storeGenerator.querySelector(
      '.cost'
    ).innerText = generator.cost.next.toLocaleString();
    storeGenerator.querySelector('.output').innerText = formatGeneratorOutput(
      generator.output.next,
      generator.delay
    );
  },
};

/** Actions. */
const actions = {
  increment: (number = 0) => {
    state.clicks += number;
    views.renderCounter();
    const cursorButton = elements.storeCursor.querySelector(BUTTON);
    cursorButton.disabled = state.clicks < state.cursor.cost.next;
    const generatorButton = elements.storeGenerator.querySelector(BUTTON);
    generatorButton.disabled = state.clicks < state.generator.cost.next;
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
  updateStoreGenerator: () => {
    const { generator } = state;
    const { cost, output } = generator;
    const owned = ++generator.owned;
    cost.next = calculateNextCost(cost.base, cost.rate, owned);
    output.current = output.next;
    output.next = Math.round(output.base * (owned + 1));
    views.renderStoreGenerator();
  },
};

/** Events. */

// click button
elements.button.addEventListener(CLICK, () => {
  actions.increment(state.cursor.output.current);
});

// upgrade cursor
elements.storeCursor.querySelector(BUTTON).addEventListener(CLICK, () => {
  if (state.clicks >= state.cursor.cost.next) {
    actions.increment(-state.cursor.cost.next);
    actions.updateStoreCursor();
  }
});

// purchase generator
elements.storeGenerator.querySelector(BUTTON).addEventListener(CLICK, () => {
  if (state.clicks >= state.generator.cost.next) {
    const { generator, intervals } = state;
    actions.increment(-generator.cost.next);
    actions.updateStoreGenerator();

    if (intervals.generator) {
      intervals.generator.callback = () =>
        actions.increment(generator.output.current);
    } else {
      intervals.generator = {
        output: generator.output.current,
        callback: () => actions.increment(generator.output.current),
      };
      setInterval(intervals.generator.callback, generator.delay * 1000);
    }
  }
});

/** Bootstrap. */
views.renderCounter();
views.renderStoreCursor();
views.renderStoreGenerator();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
