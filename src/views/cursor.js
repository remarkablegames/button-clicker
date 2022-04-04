import { elements } from '../helpers';
import * as state from '../state';

/**
 * Renders cursor.
 */
export function renderCursor() {
  const cursorRow = elements.cursor;
  const { cursor } = state;
  cursorRow.querySelector('.owned').innerText = (
    cursor.owned - 1
  ).toLocaleString();
  cursorRow.querySelector('.cost').innerText =
    cursor.cost.next.toLocaleString();
  cursorRow.querySelector(
    '.output-current'
  ).innerText = `${cursor.output.current.toLocaleString()} per click`;
  cursorRow.querySelector(
    '.output-next'
  ).innerText = `${cursor.output.next.toLocaleString()} per click`;
}
