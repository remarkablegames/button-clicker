import { SELECTOR_BUTTON } from './constants';

/**
 * Elements.
 */
export const elements = {
  button: document.getElementById('button'),
  counter: document.getElementById('counter'),
  cursor: document.getElementById('cursor'),
  message: document.getElementById('message'),
  store: document.getElementById('store'),
};
elements.cursorButton = elements.cursor.querySelector(SELECTOR_BUTTON);

/**
 * Calculates next cost of cursor or generator upgrade.
 *
 * @param {Number} base
 * @param {Number} rate
 * @param {Number} owned
 * @return {Number}
 */
export const calculateNextCost = (base, rate, owned) =>
  Math.floor(base * Math.pow(rate, owned));

/**
 * Gets element by id (from cache if applicable).
 *
 * @param {String} id
 * @return {HTMLElement}
 */
export const getElementById = (id) =>
  elements[id] || (elements[id] = document.getElementById(id));

/**
 * Formats generator output description.
 *
 * @example
 * // returns '1 click per 1 second'
 * formatGeneratorOutput(1, 1);
 *
 * @example
 * // returns '2 clicks per 2 seconds'
 * formatGeneratorOutput(2, 2);
 *
 * @param {Number} clicks
 * @param {Number} seconds
 * @return {String}
 */
export const formatGeneratorOutput = (clicks, seconds) =>
  `${clicks.toLocaleString()} ${
    clicks === 1 ? 'click' : 'clicks'
  } per ${seconds.toLocaleString()} ${seconds === 1 ? 'second' : 'seconds'}`;
