import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import { DARK, LIGHT } from './types/bgType';
import SectionLayout from './ui/layout/sectionLayout';
import SeirekiWarekiConverter from './components/SeirekiWarekiConverter';
import AgeCalculator from './components/AgeCalculator';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let currentSection = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = index;
      }
    });

    setCurrentSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <SectionLayout bgType={LIGHT}>
        <Header />
      </SectionLayout>
      <SectionLayout bgType={DARK}>
        <SeirekiWarekiConverter />
      </SectionLayout>
      <SectionLayout bgType={LIGHT}>
        <AgeCalculator />
      </SectionLayout>
    </div>
  );
};

export default App;
