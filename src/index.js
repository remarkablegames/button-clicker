import './index.css';
// import * as serviceWorker from './serviceWorker';

let clicks = 0;

const game = document.getElementById('game');

const heading = document.createElement('h1');
heading.innerText = 'Button Clicker'.toLocaleString();

const counter = document.createElement('p');
counter.innerText = clicks.toLocaleString();

const button = document.createElement('button');
button.innerText = 'Click Button'.toLocaleString();
button.addEventListener('click', () => {
  clicks++;
  counter.innerText = clicks.toLocaleString();
});

[heading, counter, button].forEach(element => game.appendChild(element));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
