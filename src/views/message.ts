import * as state from '../state';
import { elements } from '../utils';

/**
 * Renders message.
 *
 * @param text - Message.
 */
export function renderMessage(text = '') {
  const { total } = state.useClickStore();
  let message;

  if (text) {
    message = text;
  } else {
    // check for exact match in messages table
    if (state.messages[total as state.MessageId]) {
      message = state.messages[total as state.MessageId];
      delete state.messages[total as state.MessageId];
    } else {
      // otherwise compare number of first message
      for (const key in state.messages) {
        const id = Number(key) as state.MessageId;

        if (total >= id) {
          message = state.messages[id];
          delete state.messages[id];
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
