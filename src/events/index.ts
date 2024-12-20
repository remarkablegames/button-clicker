import * as actions from '../actions';
import { EVENT_CLICK, SELECTOR_BUTTON } from '../constants';
import * as state from '../state';
import { elements, getElementById } from '../utils';
import * as views from '../views';

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
    const generator = state.generators[id as state.GeneratorId];
    const generatorRow = getElementById(id);

    generatorRow
      .querySelector(SELECTOR_BUTTON)!
      .addEventListener(EVENT_CLICK, () => {
        if (state.clicks.current >= generator.cost.next) {
          actions.decrement(generator.cost.next);
          actions.updateGenerator(id as state.GeneratorId);

          if (generator.interval.set) {
            generator.interval.callback = () => {
              actions.increment(generator.output.current);
            };
          } else {
            generator.interval.set = true;
            generator.interval.callback = () => {
              actions.increment(generator.output.current);
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
