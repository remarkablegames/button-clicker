import { SELECTOR_BUTTON } from '../constants';
import { elements, formatGeneratorOutput, getElementById } from '../helpers';
import * as state from '../state';

/**
 * Appends generators to table.
 */
export function initializeGenerators() {
  Object.keys(state.generators).forEach((id) => {
    const generator = state.generators[id];
    const generatorElement = elements.cursor.cloneNode(true);
    generatorElement.id = id;
    const button = generatorElement.querySelector(SELECTOR_BUTTON);
    button.title = generator.label;
    button.innerText = generator.label;
    elements.store.appendChild(generatorElement);
  });
}

/**
 * Renders generator.
 *
 * @param {string} id
 */
export function renderGenerator(id) {
  const generator = state.generators[id];
  const generatorRow = getElementById(id);
  generatorRow.querySelector('.owned').innerText =
    generator.owned.toLocaleString();
  generatorRow.querySelector('.cost').innerText =
    generator.cost.next.toLocaleString();
  generatorRow.querySelector('.output-current').innerText =
    formatGeneratorOutput(generator.output.current, generator.delay);
  generatorRow.querySelector('.output-next').innerText = formatGeneratorOutput(
    generator.output.next,
    generator.delay
  );
}

/**
 * Renders generators
 */
export function renderGenerators() {
  Object.keys(state.generators).forEach((id) => {
    renderGenerator(id);
  });
}
