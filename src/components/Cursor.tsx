import { useCallback } from 'react';

import { useClickStore, useCursorStore, useMessageStore } from '../state';

export default function Cursor() {
  const clickStore = useClickStore();
  const cursorStore = useCursorStore();
  const messageStore = useMessageStore();

  const handleClick = useCallback(() => {
    clickStore.decrease(cursorStore.cost.next);
    cursorStore.purchase();
    messageStore.update(cursorStore.message);
  }, []);

  return (
    <tr>
      <td>
        <button
          disabled={clickStore.current < cursorStore.cost.next}
          title="Cursor"
          onClick={handleClick}
        >
          Cursor
        </button>{' '}
      </td>

      <td>{(cursorStore.owned - 1).toLocaleString()}</td>

      <td>{cursorStore.cost.next.toLocaleString()}</td>

      {[cursorStore.output.current, cursorStore.output.next].map(
        (output, index) => (
          <td key={index}>{`${output.toLocaleString()} per click`}</td>
        ),
      )}
    </tr>
  );
}
