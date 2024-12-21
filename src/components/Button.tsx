import { useCallback } from 'react';

import { useClickStore, useCursorStore, useMessageStore } from '../state';

export default function Button() {
  const clickStore = useClickStore();
  const cursorStore = useCursorStore();
  const messageStore = useMessageStore();

  const handleClick = useCallback(() => {
    clickStore.increase(cursorStore.output.current);
    messageStore.update();
  }, []);

  return (
    <p>
      <button
        data-twe-ripple-color="light"
        data-twe-ripple-init
        onClick={handleClick}
        title="Click Button"
        type="button"
      >
        Click Button
      </button>
    </p>
  );
}
