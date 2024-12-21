import { useMessageStore } from '../state';

export default function Message() {
  const { message } = useMessageStore();

  return (
    <header className="py-7 px-9 font-mono bg-neutral-900 text-gray-100">
      {message}
    </header>
  );
}
