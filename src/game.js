import { EVENT_CLICK, SELECTOR_BUTTON } from './constants';
import {
  calculateNextCost,
  elements,
  formatGeneratorOutput,
  getElementById,
} from './helpers';
import * as state from './state';
import { initializeGenerators } from './views';

initializeGenerators();

/** Views. */
const views = {
  renderCounter: () => {
    elements.counter.innerText = state.clicks.current.toLocaleString();
  },

  renderCursor: () => {
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
  },

  /**
   * @param {String} id
   */
  renderGenerator: (id) => {
    const generator = state.generators[id];
    const generatorRow = getElementById(id);
    generatorRow.querySelector('.owned').innerText =
      generator.owned.toLocaleString();
    generatorRow.querySelector('.cost').innerText =
      generator.cost.next.toLocaleString();
    generatorRow.querySelector('.output-current').innerText =
      formatGeneratorOutput(generator.output.current, generator.delay);
    generatorRow.querySelector('.output-next').innerText =
      formatGeneratorOutput(generator.output.next, generator.delay);
  },

  renderGenerators: () => {
    Object.keys(state.generators).forEach((id) => {
      views.renderGenerator(id);
    });
  },

  /**
   * @param {String} [text='']
   */
  renderMessage: (text = '') => {
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
  },
};

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
    views.renderCursor();
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
    views.renderGenerator(id);
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
    views.renderMessage(cursor.message);
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
          views.renderMessage(generator.message);
        }
      }
    });
});

/** Bootstrap. */
views.renderCounter();
views.renderCursor();
views.renderGenerators();
