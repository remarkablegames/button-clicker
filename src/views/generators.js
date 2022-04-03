import { SELECTOR_BUTTON } from '../constants';
import { elements } from '../helpers';
import * as state from '../state';

export function initializeGenerators() {
  Object.keys(state.generators).forEach((id) => {
    // append generator to table
    const generator = state.generators[id];
    const generatorElement = elements.cursor.cloneNode(true);
    generatorElement.id = id;
    const button = generatorElement.querySelector(SELECTOR_BUTTON);
    button.title = generator.label;
    button.innerText = generator.label;
    elements.store.appendChild(generatorElement);
  });
}
