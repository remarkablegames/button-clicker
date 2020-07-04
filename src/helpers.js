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
