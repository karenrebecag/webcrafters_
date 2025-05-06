'use client';

import React from 'react';
import Scene from './Scene';
import './homeBanner.css';
import '@/texts.css';
import InputAI from './InputAI';

const HomeBanner: React.FC = () => {
  return (
    <section className="HomeBanner">
      {/* BG 3D Scene */}
      <div className="scene-background">
        <Scene />
      </div>

      {/* Overlay Content */}
      <div className="homeBanner-content">
        <div className='text-container'>
          <h2 className="HeadingGradientWhite">
            Unlock the real power
          </h2>

          <div className="homeBanner-inline-text">
              <h2 className="HeadingGradientWhite">
              with the
              </h2>
              <h2 className="HeadingGradientRed">
                Power of AI
              </h2>
          </div>
        </div>
        <InputAI/>
      </div>
    </section>
  );
};

export default HomeBanner;
