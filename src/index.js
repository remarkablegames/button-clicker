import './index.css';
// import * as serviceWorker from './serviceWorker';

/**
 * Constants.
 */
const CLICK = 'click';
const BUTTON = 'button';

/**
 * State.
 */
const state = {
  clicks: 0,
  cursor: {
    cost: {
      base: 50,
      next: 50,
      rate: 2,
    },
    output: {
      base: 1,
      current: 1,
      next: 2,
    },
    owned: 1,
  },
};

/**
 * Elements.
 */
const elements = {
  button: document.getElementById('button'),
  counter: document.getElementById('counter'),
  store: document.getElementById('store'),
  storeCursor: document.getElementById('cursor'),
};

/**
 * Views.
 */
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
};

/**
 * Actions.
 */
const actions = {
  increment: (number = 0) => {
    state.clicks += number;
    views.renderCounter();
    const button = elements.store.querySelector(BUTTON);
    button.disabled = state.clicks < state.cursor.cost.next;
  },
  updateStoreCursor: () => {
    const { cursor } = state;
    cursor.owned++;
    const { cost, output } = cursor;
    cost.next = Math.floor(cost.base * Math.pow(cost.rate, cursor.owned - 1));
    output.current = output.next;
    output.next = Math.round(output.base * cursor.owned);
    views.renderStoreCursor();
  },
};

/**
 * Events.
 */
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

/**
 * Bootstrap.
 */
views.renderCounter();
views.renderStoreCursor();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
