import * as state from '../state';
import { elements } from '../utils';

/**
 * Renders cursor.
 */
export function renderCursor(): void {
  const cursorRow = elements.cursor;
  const { cursor } = state;

  (cursorRow.querySelector('.owned') as HTMLElement).innerText = (
    cursor.owned - 1
  ).toLocaleString();

  (cursorRow.querySelector('.cost') as HTMLElement).innerText =
    cursor.cost.next.toLocaleString();

  (
    cursorRow.querySelector('.output-current') as HTMLElement
  ).innerText = `${cursor.output.current.toLocaleString()} per click`;

  (
    cursorRow.querySelector('.output-next') as HTMLElement
  ).innerText = `${cursor.output.next.toLocaleString()} per click`;
}
