import './index.css';
// import * as serviceWorker from './serviceWorker';

// state
let clicks = 0;

// elements
const counter = document.getElementById('counter');
const button = document.getElementById('button');

// view
const renderCounter = () => {
  counter.innerText = clicks.toLocaleString();
};

// events
button.addEventListener('click', () => {
  clicks++;
  renderCounter();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
