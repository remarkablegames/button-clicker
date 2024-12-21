import Message from '../components/Message';
import {
  useClickStore,
  useCursorStore,
  useGeneratorStore,
  useMessageStore,
} from '../state';
import type { GeneratorId } from '../types';
import { formatGeneratorOutput } from '../utils';

export default function App() {
  const clickStore = useClickStore();
  const cursorStore = useCursorStore();
  const generatorStore = useGeneratorStore();
  const messageStore = useMessageStore();

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

            {(Object.keys(generatorStore) as GeneratorId[]).map(
              (generatorId) => {
                if (!/^generator\d$/.test(generatorId)) {
                  return;
                }

                const generator = generatorStore[generatorId];

                return (
                  <tr id={generatorId} key={generatorId}>
                    <td>
                      <button
                        disabled={clickStore.current < generator.cost.next}
                        title={generator.label}
                        onClick={() => {
                          clickStore.decrease(generator.cost.next);
                          generatorStore.purchase(generatorId);
                          messageStore.update(generator.message);

                          if (generator.interval.set) {
                            generator.interval.callback = () => {
                              clickStore.increase(generator.output.current);
                              messageStore.update();
                            };
                          } else {
                            generator.interval.set = true;
                            generator.interval.callback = () => {
                              clickStore.increase(generator.output.current);
                              messageStore.update();
                            };

                            setInterval(
                              generator.interval.callback,
                              generator.delay * 1000,
                            );
                          }

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

                    <td className="cost">
                      {generator.cost.next.toLocaleString()}
                    </td>

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
                );
              },
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}
