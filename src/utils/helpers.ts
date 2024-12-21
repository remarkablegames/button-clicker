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
  owned: number,
): number => Math.floor(base * Math.pow(rate, owned));

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
  seconds: number,
): string =>
  `${clicks.toLocaleString()} ${
    clicks === 1 ? 'click' : 'clicks'
  } per ${seconds.toLocaleString()} ${seconds === 1 ? 'second' : 'seconds'}`;
