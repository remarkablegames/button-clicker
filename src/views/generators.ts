import * as state from '../state';
import { formatGeneratorOutput, getElementById } from '../utils';

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
