import * as state from '../state';
import { formatGeneratorOutput } from '../utils';
import * as views from '../views';

export default function App() {
  const clickStore = state.useClickStore();
  const cursorStore = state.useCursorStore();
  const generatorStore = state.useGeneratorStore();

  return (
    <>
      <header id="message">Welcome to Button Clicker.</header>

      <main>
        <h1>Button Clicker</h1>
        <p id="counter">{clickStore.current.toLocaleString()}</p>
        <p>
          <button
            title="Click Button"
            onClick={() => {
              clickStore.increase(cursorStore.output.current);
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
                    views.renderMessage(cursorStore.message);
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

            {(Object.keys(generatorStore) as state.GeneratorId[]).map(
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
                          views.renderMessage(generator.message);

                          if (generator.interval.set) {
                            generator.interval.callback = () => {
                              clickStore.increase(generator.output.current);
                            };
                          } else {
                            generator.interval.set = true;
                            generator.interval.callback = () => {
                              clickStore.increase(generator.output.current);
                            };

                            setInterval(
                              generator.interval.callback,
                              generator.delay * 1000,
                            );
                          }

                          if (generator.message) {
                            views.renderMessage(generator.message);
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
