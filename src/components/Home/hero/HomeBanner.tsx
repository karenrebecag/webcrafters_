'use client';

import React, { useEffect, useRef } from 'react';
import Scene from './Scene';
import './homeBanner.css';
import '@/texts.css';
import InputAI from './InputAI';
import { gsap } from 'gsap';

const HomeBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLHeadingElement>(null);
  const inlineTextRef = useRef<HTMLDivElement>(null);
  const inlineText1Ref = useRef<HTMLHeadingElement>(null);
  const inlineText2Ref = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (bannerRef.current) {
      // Start with the banner off-screen and transparent
      gsap.set(bannerRef.current, { y: 100, opacity: 0 });

      // Start with text elements, input, and buttons off-screen and transparent
      gsap.set(firstTextRef.current, { y: 20, opacity: 0 });
      gsap.set([inlineText1Ref.current, inlineText2Ref.current], { y: 20, opacity: 0 });
      gsap.set(inputRef.current, { y: 20, opacity: 0 });
      gsap.set(buttonRefs.current, { y: 20, opacity: 0 });

      // Animate banner after 2 seconds
      const bannerTimer = setTimeout(() => {
        gsap.to(bannerRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        });

        // Animate first text after a slight delay
        gsap.to(firstTextRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3, // Starts at 2.3 seconds
        });

        // Animate inline texts with a stagger
        gsap.to([inlineText1Ref.current, inlineText2Ref.current], {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2, // 0.2-second delay between each text
          delay: 0.6, // Starts at 2.6 seconds
        });

        // Animate input field
        gsap.to(inputRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.9, // Starts at 2.9 seconds
        });

        // Animate buttons with a stagger
        gsap.to(buttonRefs.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2, // 0.2-second delay between each button
          delay: 1.2, // Starts at 3.2 seconds
        });
      }, 2000); // 2 seconds delay

      return () => clearTimeout(bannerTimer);
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
          <h2 className="HeadingGradientWhite" ref={firstTextRef}>
            Unlock the real power
          </h2>

          <div className="homeBanner-inline-text" ref={inlineTextRef}>
            <h2 className="HeadingGradientWhite" ref={inlineText1Ref}>
              with the
            </h2>
            <h2 className="HeadingGradientRed" ref={inlineText2Ref}>
              Power of AI
            </h2>
          </div>
        </div>
        <InputAI inputRef={inputRef} buttonRefs={buttonRefs} />
      </div>
    </section>
  );
};

export default HomeBanner;