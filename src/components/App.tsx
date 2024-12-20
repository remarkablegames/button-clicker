import * as actions from '../actions';
import * as state from '../state';
import { formatGeneratorOutput } from '../utils';
import * as views from '../views';

export default function App() {
  const clicks = state.useClickStore();

  return (
    <>
      <header id="message">Welcome to Button Clicker.</header>

      <main>
        <h1>Button Clicker</h1>
        <p id="counter">{clicks.current.toLocaleString()}</p>
        <p>
          <button
            title="Click Button"
            onClick={() => {
              clicks.increase(state.cursor.output.current);
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
                  disabled={clicks.current < state.cursor.cost.next}
                  title="Cursor"
                  onClick={() => {
                    clicks.decrease(state.cursor.cost.next);
                    actions.updateCursor();
                    views.renderMessage(state.cursor.message);
                  }}
                >
                  Cursor
                </button>{' '}
                <span className="owned">
                  {(state.cursor.owned - 1).toLocaleString()}
                </span>
              </td>

              <td className="cost">
                {state.cursor.cost.next.toLocaleString()}
              </td>

              <td className="output-current">
                {`${state.cursor.output.current.toLocaleString()} per click`}
              </td>

              <td className="output-next">
                {`${state.cursor.output.next.toLocaleString()} per click`}
              </td>
            </tr>

            {Object.entries(state.generators).map(
              ([generatorId, generator]) => (
                <tr id={generatorId} key={generatorId}>
                  <td>
                    <button
                      disabled={clicks.current < generator.cost.next}
                      title={generator.label}
                      onClick={() => {
                        clicks.decrease(generator.cost.next);
                        actions.updateGenerator(
                          generatorId as state.GeneratorId,
                        );

                        if (generator.interval.set) {
                          generator.interval.callback = () => {
                            clicks.increase(generator.output.current);
                          };
                        } else {
                          generator.interval.set = true;
                          generator.interval.callback = () => {
                            clicks.increase(generator.output.current);
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
              ),
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}
