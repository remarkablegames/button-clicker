import Button from '../components/Button';
import Counter from '../components/Counter';
import Cursor from '../components/Cursor';
import Generators from '../components/Generators';
import Message from '../components/Message';

export default function App() {
  return (
    <main>
      <Message />

      <section>
        <h1>Button Clicker</h1>
        <Counter />
        <Button />

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
            <Cursor />
            <Generators />
          </tbody>
        </table>
      </section>
    </main>
  );
}
