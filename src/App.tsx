import React, { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import SectionLayout from './ui/layout/sectionLayout';
import SeirekiWarekiConverter from './components/SeirekiWarekiConverter';
import AgeCalculator from './components/AgeCalculator';
import { D_GRAY, L_GRAY } from './types/color';
import ReactGA from "react-ga4";

const App: React.FC = () => {
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    ReactGA.initialize(trackingId, {
      gaOptions: {
        debug_mode: import.meta.env.DEV,
      }
    });
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, []);

  return (
    <HelmetProvider>
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
          <meta name="google-site-verification" content="M_9xCpXlDzN6_KIGiDz5kIjEwYxVcO452FtZMeLY0Aw" />
        </Helmet>
        <SectionLayout bgColor={L_GRAY}>
          <Header />
        </SectionLayout>
        <SectionLayout bgColor={D_GRAY}>
          <SeirekiWarekiConverter />
        </SectionLayout>
        <AgeCalculator />
      </div>
    </HelmetProvider>
  );
};

export default App;
