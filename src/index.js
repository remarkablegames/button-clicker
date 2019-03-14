import './index.css';
// import * as serviceWorker from './serviceWorker';

let clicks = 0;

const counter = document.getElementById('counter');
const button = document.getElementById('button');

button.addEventListener('click', () => {
  clicks++;
  counter.innerText = clicks.toLocaleString();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
