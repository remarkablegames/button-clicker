import { useEffect } from 'react';

import { useGenerators } from '../hooks';
import { useClickStore, useGeneratorStore, useMessageStore } from '../state';
import { formatGeneratorOutput } from '../utils';

export default function Generators() {
  const clickStore = useClickStore();
  const generatorStore = useGeneratorStore();
  const generators = useGenerators();
  const messageStore = useMessageStore();

  useEffect(() => {
    generators.forEach((generator) => {
      if (generator.output.current) {
        generatorStore.setInterval(generator.id);
      }
    });
  }, []);

  return (
    <>
      {generators.map((generator) => (
        <tr id={generator.id} key={generator.id}>
          <td className="flex items-center">
            <button
              data-twe-ripple-color="light"
              data-twe-ripple-init
              disabled={clickStore.current < generator.cost.next}
              title={generator.label}
              onClick={() => {
                clickStore.decrease(generator.cost.next);
                generatorStore.purchase(generator.id);
                messageStore.update(generator.message);

                if (generator.message) {
                  messageStore.update(generator.message);
                }
              }}
            >
              {generator.label}
            </button>
          </td>

          <td>{generator.owned.toLocaleString()}</td>

          <td>{generator.cost.next.toLocaleString()}</td>

          <td>
            {formatGeneratorOutput(generator.output.current, generator.delay)}
          </td>

          <td>
            {formatGeneratorOutput(generator.output.next, generator.delay)}
          </td>
        </tr>
      ))}
    </>
  );
}
