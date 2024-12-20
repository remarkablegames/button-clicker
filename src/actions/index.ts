import * as state from '../state';
import { calculateNextCost } from '../utils';
import * as views from '../views';

/**
 * Updates generator.
 *
 * @param id - Generator id.
 */
export function updateGenerator(id: state.GeneratorId) {
  const generator = state.generators[id];
  const { cost, output } = generator;
  const owned = ++generator.owned;
  cost.next = calculateNextCost(cost.base, cost.rate, owned);
  output.current = output.next;
  output.next = Math.round(output.base * (owned + 1));
  views.renderGenerator(id);
}
