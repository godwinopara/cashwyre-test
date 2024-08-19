import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    const endpoint = 'https://cashwyreservice.azurewebsites.net/api/v1.0/Ext/getUSDNGNRates';
    const payload = {
      appId: 'e14a0642-6b0c-4023-8a93-e6a96748fee0'
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log(response)

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div className="App">
      <h1>Exchange Rate Viewer</h1>
      <button onClick={fetchRates}>Get USD to NGN Rates</button>
      <div id="data">
        {error && <p>Error: {error}</p>}
        {data && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
