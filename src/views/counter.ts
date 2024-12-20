import * as state from '../state';
import { elements } from '../utils';

/**
 * Renders counter.
 */
export function renderCounter(): void {
  elements.counter.innerText = state.useClickStore().current.toLocaleString();
}
