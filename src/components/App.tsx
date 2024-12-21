import { useEffect } from 'react';

import Message from '../components/Message';
import { useGenerators } from '../hooks';
import {
  useClickStore,
  useCursorStore,
  useGeneratorStore,
  useMessageStore,
} from '../state';
import { formatGeneratorOutput } from '../utils';

export default function App() {
  const clickStore = useClickStore();
  const cursorStore = useCursorStore();
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
      <Message />

      <main>
        <h1>Button Clicker</h1>
        <p id="counter">{clickStore.current.toLocaleString()}</p>
        <p>
          <button
            title="Click Button"
            onClick={() => {
              clickStore.increase(cursorStore.output.current);
              messageStore.update();
            }}
          >
            Click Button
          </button>
        </p>

        <table>
          <thead>
            <tr>
              <th />
              <th>Cost</th>
              <th>Current Output</th>
              <th>Next Output</th>
            </tr>
          </thead>

          <tbody id="store">
            <tr id="cursor">
              <td>
                <button
                  disabled={clickStore.current < cursorStore.cost.next}
                  title="Cursor"
                  onClick={() => {
                    clickStore.decrease(cursorStore.cost.next);
                    cursorStore.purchase();
                    messageStore.update(cursorStore.message);
                  }}
                >
                  Cursor
                </button>{' '}
                <span className="owned">
                  {(cursorStore.owned - 1).toLocaleString()}
                </span>
              </td>

              <td className="cost">{cursorStore.cost.next.toLocaleString()}</td>

              <td className="output-current">
                {`${cursorStore.output.current.toLocaleString()} per click`}
              </td>

              <td className="output-next">
                {`${cursorStore.output.next.toLocaleString()} per click`}
              </td>
            </tr>

            {generators.map((generator) => (
              <tr id={generator.id} key={generator.id}>
                <td>
                  <button
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
                  </button>{' '}
                  <span className="owned">
                    {generator.owned.toLocaleString()}
                  </span>
                </td>

                <td className="cost">{generator.cost.next.toLocaleString()}</td>

                <td className="output-current">
                  {formatGeneratorOutput(
                    generator.output.current,
                    generator.delay,
                  )}
                </td>

                <td className="output-next">
                  {formatGeneratorOutput(
                    generator.output.next,
                    generator.delay,
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
