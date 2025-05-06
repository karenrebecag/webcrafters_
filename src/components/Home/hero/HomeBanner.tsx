'use client';

import React, { useEffect, useRef } from 'react';
import Scene from './Scene';
import './homeBanner.css';
import '@/texts.css';
import InputAI from './InputAI';
import { gsap } from 'gsap';

const HomeBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current) {
      // Start with the banner off-screen and transparent
      gsap.set(bannerRef.current, { y: 100, opacity: 0 });

      // Animate after 2 seconds
      const timer = setTimeout(() => {
        gsap.to(bannerRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        });
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="HomeBanner" ref={bannerRef}>
      {/* BG 3D Scene */}
      <div className="scene-background">
        <Scene />
      </div>

      {/* Overlay Content */}
      <div className="homeBanner-content">
        <div className="text-container">
          <h2 className="HeadingGradientWhite">Unlock the real power</h2>

          <div className="homeBanner-inline-text">
            <h2 className="HeadingGradientWhite">with the</h2>
            <h2 className="HeadingGradientRed">Power of AI</h2>
          </div>
        </div>
        <InputAI />
      </div>
    </section>
  );
};

export default HomeBanner;