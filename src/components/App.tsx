import { useEffect } from 'react';

import * as actions from '../actions';
import * as events from '../events';
import * as state from '../state';
import { formatGeneratorOutput } from '../utils';

export default function App() {
  useEffect(() => {
    events.addCursorListener();
    events.addGeneratorListeners();
  }, []);

  return (
    <>
      <header id="message">Welcome to Button Clicker.</header>

      <main>
        <h1>Button Clicker</h1>
        <p id="counter">{state.clicks.current.toLocaleString()}</p>
        <p>
          <button
            title="Click Button"
            onClick={() => {
              actions.increment(state.cursor.output.current);
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
                <button disabled title="Cursor">
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
                    <button disabled title={generator.label}>
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
