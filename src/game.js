import { EVENT_CLICK, SELECTOR_BUTTON } from './constants';
import { calculateNextCost, elements, getElementById } from './helpers';
import * as state from './state';
import {
  initializeGenerators,
  renderCounter,
  renderCursor,
  renderGenerator,
  renderGenerators,
  renderMessage,
} from './views';

initializeGenerators();

/** Actions. */
const actions = {
  /**
   * @param {Number}  number
   * @param {Boolean} [skipTotal=false]
   */
  increment: (number, skipTotal = false) => {
    const { clicks } = state;
    clicks.current += number;
    if (!skipTotal) {
      clicks.total += number;
      renderMessage();
    }

    renderCounter();
    elements.cursorButton.disabled = clicks.current < state.cursor.cost.next;

    const { generators } = state;
    Object.keys(generators).forEach((id) => {
      const generatorRow = getElementById(id);
      const generatorButton = generatorRow.querySelector(SELECTOR_BUTTON);
      generatorButton.disabled = clicks.current < generators[id].cost.next;
    });
  },

  /**
   * @param {Number} clicks
   */
  decrement: (clicks) => {
    actions.increment(-clicks, true);
  },

  updateCursor: () => {
    const { cursor } = state;
    const { cost, output } = cursor;
    const owned = ++cursor.owned;
    cost.next = calculateNextCost(cost.base, cost.rate, owned - 1);
    output.current = output.next;
    output.next = Math.round(output.base * owned);
    renderCursor();
  },

  /**
   * @param {String} id
   */
  updateGenerator: (id) => {
    const generator = state.generators[id];
    const { cost, output } = generator;
    const owned = ++generator.owned;
    cost.next = calculateNextCost(cost.base, cost.rate, owned);
    output.current = output.next;
    output.next = Math.round(output.base * (owned + 1));
    renderGenerator(id);
  },
};

/** Events. */

// button click
elements.button.addEventListener(EVENT_CLICK, () => {
  actions.increment(state.cursor.output.current);
});

// cursor upgrade
elements.cursorButton.addEventListener(EVENT_CLICK, () => {
  if (state.clicks.current >= state.cursor.cost.next) {
    const { cursor } = state;
    actions.decrement(cursor.cost.next);
    actions.updateCursor();
    renderMessage(cursor.message);
  }
});

// generator purchase
Object.keys(state.generators).forEach((id) => {
  const generator = state.generators[id];
  const generatorRow = getElementById(id);

  generatorRow
    .querySelector(SELECTOR_BUTTON)
    .addEventListener(EVENT_CLICK, () => {
      if (state.clicks.current >= generator.cost.next) {
        actions.decrement(generator.cost.next);
        actions.updateGenerator(id);

        if (generator.interval) {
          generator.interval.callback = () => {
            actions.increment(generator.output.current);
          };
        } else {
          generator.interval = {
            callback: () => {
              actions.increment(generator.output.current);
            },
          };
          setInterval(generator.interval.callback, generator.delay * 1000);
        }

        if (generator.message) {
          renderMessage(generator.message);
        }
      }
    });
});

/** Bootstrap. */
renderCounter();
renderCursor();
renderGenerators();
