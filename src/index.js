import './index.css';
// import * as serviceWorker from './serviceWorker';

// constants
const CLICK_EVENT = 'click';

// state
const state = {
  clicks: 0,
  cursor: {
    cost: 15,
    output: 1,
    multiplier: 1.15,
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
  renderAll: () => {
    for (let methodName in views) {
      if (methodName !== 'renderAll') {
        views[methodName]();
      }
    }
  },
  renderCounter: () => {
    elements.counter.innerText = state.clicks.toLocaleString();
  },
  renderStoreCursor: () => {
    const { storeCursor } = elements;
    const { cursor } = state;
    storeCursor.querySelector(
      '.owned'
    ).innerText = cursor.owned.toLocaleString();
    storeCursor.querySelector('.cost').innerText = cursor.cost.toLocaleString();
    const nextOutput = Math.ceil(cursor.output * cursor.multiplier);
    storeCursor.querySelector(
      '.output'
    ).innerText = `${nextOutput.toLocaleString()} per click`;
  },
};

// actions
const actions = {
  increment: (number = 0) => {
    state.clicks += number;
    views.renderCounter();
  },
};

// events
elements.button.addEventListener(CLICK_EVENT, () => {
  actions.increment(state.cursor.output);
});

// initialize
views.renderAll();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
