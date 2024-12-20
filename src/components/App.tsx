import * as actions from '../actions';
import * as state from '../state';
import { formatGeneratorOutput } from '../utils';
import * as views from '../views';

export default function App() {
  const click = state.useClickStore();
  const cursor = state.useCursorStore();

  return (
    <>
      <header id="message">Welcome to Button Clicker.</header>

      <main>
        <h1>Button Clicker</h1>
        <p id="counter">{click.current.toLocaleString()}</p>
        <p>
          <button
            title="Click Button"
            onClick={() => {
              click.increase(cursor.output.current);
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
                  disabled={click.current < cursor.cost.next}
                  title="Cursor"
                  onClick={() => {
                    click.decrease(cursor.cost.next);
                    cursor.purchase();
                    views.renderMessage(cursor.message);
                  }}
                >
                  Cursor
                </button>{' '}
                <span className="owned">
                  {(cursor.owned - 1).toLocaleString()}
                </span>
              </td>

              <td className="cost">{cursor.cost.next.toLocaleString()}</td>

              <td className="output-current">
                {`${cursor.output.current.toLocaleString()} per click`}
              </td>

              <td className="output-next">
                {`${cursor.output.next.toLocaleString()} per click`}
              </td>
            </tr>

            {Object.entries(state.generators).map(
              ([generatorId, generator]) => (
                <tr id={generatorId} key={generatorId}>
                  <td>
                    <button
                      disabled={click.current < generator.cost.next}
                      title={generator.label}
                      onClick={() => {
                        click.decrease(generator.cost.next);
                        actions.updateGenerator(
                          generatorId as state.GeneratorId,
                        );

                        if (generator.interval.set) {
                          generator.interval.callback = () => {
                            click.increase(generator.output.current);
                          };
                        } else {
                          generator.interval.set = true;
                          generator.interval.callback = () => {
                            click.increase(generator.output.current);
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
