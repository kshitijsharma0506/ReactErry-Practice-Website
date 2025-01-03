import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(localStorage.getItem('inputValue') || '');

  const handleChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem('inputValue', e.target.value);
  };

  return (
    <div>
      <input data-testid='input-id' type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default App;