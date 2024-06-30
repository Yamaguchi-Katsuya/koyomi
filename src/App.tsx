import React from 'react';
import './App.css';
import SeirekiWarekiConverter from './components/SeirekiWarekiConverter';
import AgeCalculator from './components/AgeCalculator';

function App() {
  return (
    <div className="App">
      <SeirekiWarekiConverter />
      <AgeCalculator />
    </div>
  );
}

export default App;
