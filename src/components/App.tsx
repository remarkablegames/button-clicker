import Generators from '../components/Generators';
import Message from '../components/Message';
import { useClickStore, useCursorStore, useMessageStore } from '../state';

export default function App() {
  const clickStore = useClickStore();
  const cursorStore = useCursorStore();
  const messageStore = useMessageStore();

  return (
    <>
      <Message />

      <main>
        <h1>Button Clicker</h1>
        <p>{clickStore.current.toLocaleString()}</p>
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

          <tbody>
            <tr>
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
                <span>{(cursorStore.owned - 1).toLocaleString()}</span>
              </td>

              <td>{cursorStore.cost.next.toLocaleString()}</td>

              <td>
                {`${cursorStore.output.current.toLocaleString()} per click`}
              </td>

              <td>{`${cursorStore.output.next.toLocaleString()} per click`}</td>
            </tr>

            <Generators />
          </tbody>
        </table>
      </main>
    </>
  );
}
