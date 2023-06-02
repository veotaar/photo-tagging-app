import { FC, useState } from 'react';

const App: FC = () => {
  const [count, setCount] = useState(1);

  return (
    <div>
      <h1 className="m-3 bg-blue-300 text-3xl font-bold underline">Hello World</h1>
      <p>{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        add
      </button>
    </div>
  );
};

export default App;
