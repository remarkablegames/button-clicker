import { useClickStore } from '../state';

export default function Counter() {
  const { current } = useClickStore();

  return <p>{current.toLocaleString()}</p>;
}
