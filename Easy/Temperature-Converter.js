import React, { useState } from 'react';

const App = () => {
  const [temperature, setTemperature] = useState(0);

  const celsiusToFahrenheit = (temp) => {
    return Math.round((temp * 9/5 + 32) * 100) / 100;
  };

  const celsiusToKelvin = (temp) => {
    return Math.round((temp + 273.15) * 100) / 100;
  };

  return (
    <div>
      <form>
        <input
          data-testid='input-id'
          name="input"
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
        <label for="input">°C</label>
      </form>
      <p data-testid='output'>
        {temperature}°C is {celsiusToFahrenheit(temperature)}°F and {celsiusToKelvin(temperature)}K.
      </p>
    </div>
  );
};

export default App;