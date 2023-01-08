import { elements } from '../helpers';
import * as state from '../state';

/**
 * Renders counter.
 */
export function renderCounter() {
  elements.counter.innerText = state.clicks.current.toLocaleString();
}
