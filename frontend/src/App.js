import React, { useEffect, useState } from 'react';
import './App.css';
import API_URL from './config';

function App() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  useEffect(() => {
    const getId = async () => {
      try {
        const resp = await fetch(`${API_URL}/`); //
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        const data = await resp.json();
        setSuccessMessage(data.id);
      } catch (e) {
        setFailureMessage(`Error fetching data: ${e.message}`);
      }
    };

    getId();
  }, []); // ✅ Added dependency array to run only once on mount

  return (
    <div className="App">
      {!failureMessage && !successMessage ? 'Fetching...' : null}
      {failureMessage ? <p style={{ color: 'red' }}>{failureMessage}</p> : null}
      {successMessage ? <h1>SUCCESS: {successMessage}</h1> : null}
    </div>
  );
}

export default App;

