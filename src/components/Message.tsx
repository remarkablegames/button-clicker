import { useMessageStore } from '../state';

export default function Message() {
  const { message } = useMessageStore();

  return <header>{message}</header>;
}
