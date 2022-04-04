import { elements } from '../helpers';
import * as state from '../state';

/**
 * Renders message.
 *
 * @param {string} text
 */
export function renderMessage(text = '') {
  const { total } = state.clicks;
  let message;

  if (text) {
    message = text;
  } else {
    // check for exact match in messages table
    if (state.messages[total]) {
      message = state.messages[total];
      delete state.messages[total];
    } else {
      // otherwise compare number of first message
      for (const key in state.messages) {
        if (total >= key) {
          message = state.messages[key];
          delete state.messages[key];
        }
        break;
      }
    }
  }

  if (!message) {
    return;
  }

  message = message.toLocaleString();
  if (message !== elements.message.innerText) {
    elements.message.innerText = message;
  }
}
