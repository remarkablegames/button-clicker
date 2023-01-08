import { SELECTOR_BUTTON } from './constants';

/**
 * Elements.
 */
const cursor = document.getElementById('cursor')!;

export const elements = {
  button: document.getElementById('button')!,
  counter: document.getElementById('counter')!,
  cursor,
  cursorButton: cursor.querySelector(SELECTOR_BUTTON)!,
  message: document.getElementById('message')!,
  store: document.getElementById('store')!,
};

type ElementId = keyof typeof elements;

/**
 * Calculates next cost of cursor or generator upgrade.
 *
 * @param base - Current base.
 * @param rate - Current rate.
 * @param owned - Amount owned.
 * @returns - Next cost.
 */
export const calculateNextCost = (
  base: number,
  rate: number,
  owned: number
): number => Math.floor(base * Math.pow(rate, owned));

/**
 * Gets element by id (from cache if applicable).
 *
 * @param id - Element id.
 * @returns - Element.
 */
export function getElementById(id: string): HTMLElement {
  const element = elements[id as ElementId];
  if (element) {
    return element;
  }
  return ((elements[id as ElementId] as HTMLElement) =
    document.getElementById(id)!);
}

/**
 * Formats generator output description.
 *
 * @example
 * // returns '1 click per 1 second'
 * formatGeneratorOutput(1, 1);
 *
 * @example
 * // returns '2 clicks per 2 seconds'
 * formatGeneratorOutput(2, 2);
 *
 * @param clicks - Clicks.
 * @param seconds - Seconds.
 * @returns - Description.
 */
export const formatGeneratorOutput = (
  clicks: number,
  seconds: number
): string =>
  `${clicks.toLocaleString()} ${
    clicks === 1 ? 'click' : 'clicks'
  } per ${seconds.toLocaleString()} ${seconds === 1 ? 'second' : 'seconds'}`;
