import './index.css';
// import * as serviceWorker from './serviceWorker';

// constants
const CLICK_EVENT = 'click';

// state
const state = {
  clicks: 0,
  cursor: {
    cost: {
      base: 25,
      next: 25,
      rate: 2,
    },
    output: {
      base: 1,
      current: 1,
      next: 2,
    },
    owned: 0,
  },
};

// elements
const elements = {
  button: document.getElementById('button'),
  counter: document.getElementById('counter'),
  store: document.getElementById('store'),
  storeCursor: document.getElementById('cursor'),
};

// views
const views = {
  renderCounter: () => {
    elements.counter.innerText = state.clicks.toLocaleString();
  },
  renderStoreCursor: () => {
    const { storeCursor } = elements;
    const { cursor } = state;
    storeCursor.querySelector(
      '.owned'
    ).innerText = cursor.owned.toLocaleString();
    storeCursor.querySelector(
      '.cost'
    ).innerText = cursor.cost.next.toLocaleString();
    storeCursor.querySelector(
      '.output'
    ).innerText = `${cursor.output.next.toLocaleString()} per click`;
  },
};

// actions
const actions = {
  increment: (number = 0) => {
    state.clicks += number;
    views.renderCounter();
    const button = elements.store.querySelector('button');
    button.disabled = state.clicks < state.cursor.cost.next;
  },
  updateStoreCursor: () => {
    const { cursor } = state;
    cursor.owned++;
    const { cost, output } = cursor;
    cost.next = Math.floor(cost.base * Math.pow(cost.rate, cursor.owned));
    output.current = output.next;
    output.next = Math.round(output.base * (cursor.owned + 2));
    views.renderStoreCursor();
  },
};

// events
elements.button.addEventListener(CLICK_EVENT, () => {
  actions.increment(state.cursor.output.current);
});

elements.storeCursor
  .querySelector('button')
  .addEventListener(CLICK_EVENT, () => {
    if (state.clicks >= state.cursor.cost.next) {
      actions.increment(-state.cursor.cost.next);
      actions.updateStoreCursor();
    }
  });

// initialize
views.renderCounter();
views.renderStoreCursor();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
