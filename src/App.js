import { useMemo, useRef, useState } from 'react';

function App() {
  // state for items
  const [items, setItems] = useState([]);

  // state for value of filter input
  const [query, setQuery] = useState('');

  // reference to input element
  const inputRef = useRef();

  // filtered items using useMemo to only run when items or query change
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query]);

  function onSubmit(e) {
    // prevent page refresh
    e.preventDefault();

    // get the value of input on submit event
    const value = inputRef.current.value;

    // if value is empty string do nothing
    if (value === '') return;

    // if value is not empty string add it to all previous items
    setItems((prev) => {
      return [...prev, value];
    });

    // empty the input value after it has been added to items
    inputRef.current.value = '';
  }

  return (
    <>
      Search
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type='search'
      />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type='text' />
        <button type='submit'>Add</button>
      </form>
      <h3>Items:</h3>
      {filteredItems.map((item) => (
        <div key={Math.random()}>{item}</div>
      ))}
    </>
  );
}

export default App;
