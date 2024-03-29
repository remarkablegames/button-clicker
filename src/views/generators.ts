import { SELECTOR_BUTTON } from '../constants';
import * as state from '../state';
import { elements, formatGeneratorOutput, getElementById } from '../utils';

/**
 * Appends generators to table.
 */
export function initializeGenerators(): void {
  Object.keys(state.generators).forEach((id) => {
    const generator = state.generators[id as state.GeneratorId];
    const generatorElement = elements.cursor.cloneNode(true) as HTMLElement;
    generatorElement.id = id;
    const button = generatorElement.querySelector(SELECTOR_BUTTON)!;
    button.title = generator.label;
    button.innerText = generator.label;
    elements.store.appendChild(generatorElement);
  });
}

/**
 * Renders generator.
 *
 * @param id - Generator id.
 */
export function renderGenerator(id: string): void {
  const generator = state.generators[id as state.GeneratorId];
  const generatorRow = getElementById(id);

  (generatorRow.querySelector('.owned') as HTMLElement).innerText =
    generator.owned.toLocaleString();

  (generatorRow.querySelector('.cost') as HTMLElement).innerText =
    generator.cost.next.toLocaleString();

  (generatorRow.querySelector('.output-current') as HTMLElement).innerText =
    formatGeneratorOutput(generator.output.current, generator.delay);

  (generatorRow.querySelector('.output-next') as HTMLElement).innerText =
    formatGeneratorOutput(generator.output.next, generator.delay);
}

/**
 * Renders generators.
 */
export function renderGenerators(): void {
  Object.keys(state.generators).forEach((id) => {
    renderGenerator(id);
  });
}
