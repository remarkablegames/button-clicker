import { EVENT_CLICK, SELECTOR_BUTTON } from './constants';
import { elements, getElementById } from './helpers';
import * as actions from './actions';
import * as state from './state';
import * as views from './views';

views.initializeGenerators();

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
