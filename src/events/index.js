import { EVENT_CLICK, SELECTOR_BUTTON } from '../constants';
import { elements, getElementById } from '../helpers';
import * as actions from '../actions';
import * as state from '../state';
import * as views from '../views';

/**
 * Handle button click.
 */
export function addButtonListener() {
  elements.button.addEventListener(EVENT_CLICK, () => {
    actions.increment(state.cursor.output.current);
  });
}

/**
 * Handle cursor upgrade.
 */
export function addCursorListener() {
  elements.cursorButton.addEventListener(EVENT_CLICK, () => {
    if (state.clicks.current >= state.cursor.cost.next) {
      const { cursor } = state;
      actions.decrement(cursor.cost.next);
      actions.updateCursor();
      views.renderMessage(cursor.message);
    }
  });
}

/**
 * Handle generator purchase.
 */
export function addGeneratorListeners() {
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
}
