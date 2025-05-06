'use client';

import { useState, useEffect } from 'react';
import Info from '@/components/Home/about/Info';
import HomeBanner from '@/components/Home/hero/HomeBanner';
import WhiteSection from '@/components/Home/whiteSection/WhiteSection';
import Header from '@/components/Global/header/Header';
import Loader from '@/components/Global/loader/Loader';

export default function HomePage() {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderExit = () => {
    console.log('handleLoaderExit called, setting isLoaderFinished to true');
    setIsLoaderFinished(true);
  };

  // Show content after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('2-second timer complete, setting showContent to true');
      setShowContent(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  console.log('Rendering HomePage, showContent:', showContent, 'isLoaderFinished:', isLoaderFinished);

  return (
    <>
      {!isLoaderFinished && <Loader onLoaded={handleLoaderExit} />}
      <main style={{ visibility: showContent ? 'visible' : 'hidden' }}>
        <Header />
        <HomeBanner />
        <Info />
        <WhiteSection />
      </main>
    </>
  );
}