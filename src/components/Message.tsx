import { useMessageStore } from '../state';

export default function Message() {
  const { message } = useMessageStore();

  return (
    <header className="bg-neutral-900 px-9 py-7 font-mono text-gray-100">
      {message}
    </header>
  );
}
