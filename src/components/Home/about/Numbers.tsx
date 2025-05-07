'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Numbers.css';
import WhiteButton from '../../Global/buttons/WhiteButton';
import CountUpDigit from './CountUpDigit';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Numbers() {
  const numbersContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const whiteButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate NumbersBadge
    gsap.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: badgeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate HeadingWhite
    gsap.fromTo(
      headingRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate ParagraphWhite
    gsap.fromTo(
      paragraphRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate StatsRow with stagger
    gsap.fromTo(
      statsRowRef.current?.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRowRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate WhiteButton
    gsap.fromTo(
      whiteButtonRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: whiteButtonRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Preserve the slide-up animation for the Numbers container (already set in AboutIntro)
    gsap.fromTo(
      numbersContainerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: numbersContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section className="NumbersContainer" ref={numbersContainerRef}>
      <div className="GridOverlay" />
      <div className="TopLayer" />

      <div className="NumbersBadge" ref={badgeRef}>
        <Image
          src="https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/Union_.svg"
          alt="Asterisk"
          className="BadgeIcon"
          width={32}
          height={32}
          priority
        />
        <div className="MacroHeading">
          <CountUpDigit target={24000} />
        </div>
        <div className="ParagraphWhite">Experience</div>
      </div>

      <div className="NumbersContent">
        <h2 className="HeadingWhite" ref={headingRef}>
          Reimagining the world’s narrative
        </h2>
        <p className="ParagraphWhite" ref={paragraphRef}>
          Revolutionize your content game with our AI-powered SEO and
          copywriting tools! Say goodbye to writer’s block and hello to
          high-quality content that ranks.
        </p>

        <div className="StatsRow" ref={statsRowRef}>
          <div className="StatBlock">
            <div className="MiniHeadingWhite">
              <CountUpDigit target={10000000} />
            </div>
            <div className="ParagraphWhite">Our Client</div>
          </div>
          <div className="StatBlock">
            <div className="MiniHeadingWhite">
              <CountUpDigit target={400} />
            </div>
            <div className="ParagraphWhite">Money Raised</div>
          </div>
          <div className="StatBlock">
            <div className="MiniHeadingWhite">
              <CountUpDigit target={12} />
            </div>
            <div className="ParagraphWhite">Unicorn Award</div>
          </div>
          <div className="StatBlock">
            <div className="MiniHeadingWhite">
              <CountUpDigit target={4250} />
            </div>
            <div className="ParagraphWhite">Project Complete</div>
          </div>
        </div>

        <div ref={whiteButtonRef}>
          <WhiteButton label="Read More" />
        </div>
      </div>
    </section>
  );
}