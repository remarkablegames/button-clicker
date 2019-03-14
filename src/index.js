import './index.css';
// import * as serviceWorker from './serviceWorker';

// state
const state = {
  clicks: 0,
};

// elements
const elements = {
  button: document.getElementById('button'),
  counter: document.getElementById('counter'),
};

// views
const views = {
  renderCounter: () => {
    elements.counter.innerText = state.clicks.toLocaleString();
  },
};

// events
elements.button.addEventListener('click', () => {
  state.clicks++;
  views.renderCounter();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
