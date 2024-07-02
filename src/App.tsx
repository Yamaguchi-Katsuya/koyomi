import React from 'react';
import './App.css';
import SeirekiWarekiConverter from './components/SeirekiWarekiConverter';
import AgeCalculator from './components/AgeCalculator';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>KOYOMI</title>
        <meta
          name="description"
          content="暦に関する様々なことができるサービス"
        />
        <meta
          name="keywords"
          content="年齢計算, 西暦, 和暦, 変換, 干支, 今日は何の日"
        />
      </Helmet>
      <SeirekiWarekiConverter />
      <AgeCalculator />
    </div>
  );
}

export default App;
