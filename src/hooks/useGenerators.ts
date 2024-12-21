import { useGeneratorStore } from '../state';
import type { GeneratorId } from '../types';

export function useGenerators() {
  const generatorStore = useGeneratorStore();

  return (Object.keys(generatorStore) as GeneratorId[])
    .filter((generatorId) => /^generator\d$/.test(generatorId))
    .map((generatorId) => ({
      id: generatorId,
      ...generatorStore[generatorId],
    }));
}
