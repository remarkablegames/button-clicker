import { SELECTOR_BUTTON } from '../constants';
import { calculateNextCost, elements, getElementById } from '../helpers';
import * as state from '../state';
import * as views from '../views';

/**
 * Increments clicks.
 *
 * @param {number} number
 * @param {boolean} skipTotal
 */
export function increment(number, skipTotal = false) {
  const { clicks } = state;
  clicks.current += number;
  if (!skipTotal) {
    clicks.total += number;
    views.renderMessage();
  }

  views.renderCounter();
  elements.cursorButton.disabled = clicks.current < state.cursor.cost.next;

  const { generators } = state;
  Object.keys(generators).forEach((id) => {
    const generatorRow = getElementById(id);
    const generatorButton = generatorRow.querySelector(SELECTOR_BUTTON);
    generatorButton.disabled = clicks.current < generators[id].cost.next;
  });
}

/**
 * Decrements clicks.
 *
 * @param {number} clicks
 */
export function decrement(clicks) {
  increment(-clicks, true);
}

/**
 * Updates cursor.
 */
export function updateCursor() {
  const { cursor } = state;
  const { cost, output } = cursor;
  const owned = ++cursor.owned;
  cost.next = calculateNextCost(cost.base, cost.rate, owned - 1);
  output.current = output.next;
  output.next = Math.round(output.base * owned);
  views.renderCursor();
}

/**
 * Updates generator.
 *
 * @param {string} id
 */
export function updateGenerator(id) {
  const generator = state.generators[id];
  const { cost, output } = generator;
  const owned = ++generator.owned;
  cost.next = calculateNextCost(cost.base, cost.rate, owned);
  output.current = output.next;
  output.next = Math.round(output.base * (owned + 1));
  views.renderGenerator(id);
}
