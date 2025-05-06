'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import './Loader.css';

interface LoaderProps {
  onLoaded: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoaded }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log('Loader useEffect: Starting 2-second animation');

    // Disable scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    // Animate logo to appear
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1.1,
      duration: 0.5,
      ease: 'power3.inOut',
    });

    // Animate progress bar width
    tl.to(progressRef.current, {
      width: '100%',
      duration: 0.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const progress = (tl.progress() * 100) | 0;
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${progress}%`;
        }
      },
    });

    // Fade-out animation starting at 2 seconds total
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      delay: 1, // Start fading at 2 seconds (0.5 + 0.5 + 1 = 2 seconds)
      onComplete: () => {
        console.log('Loader animation complete, calling onLoaded');
        document.body.style.overflow = 'auto';
        onLoaded();
      },
    });

    return () => {
      console.log('Loader cleanup');
      document.body.style.overflow = 'auto';
      tl.kill();
    };
  }, [onLoaded]); // Run once on mount, re-run if onLoaded changes

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-logo" ref={logoRef}>
        <Image
          src="/assets/Logos/webCraftersLogoWhite.svg"
          alt="WebCrafters Logo"
          width={200}
          height={50}
          className="loader-logo-image"
        />
      </div>
      <div className="loader-progress">
        <div className="loader-progress-bar" ref={progressRef} />
        <span className="loader-progress-text" ref={progressTextRef}>0%</span>
      </div>
    </div>
  );
};

export default Loader;