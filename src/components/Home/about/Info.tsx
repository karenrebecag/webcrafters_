'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../../variables.css';
import '../../../texts.css';
import './info.css';
import WhiteButton from '../../Global/buttons/WhiteButton';
import ChromeButton from '../../Global/buttons/ChromeButton';
import Marquee from './Marquee';
import Numbers from './Numbers';
import BlobsBackground from '../../Global/BlobsBackground';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutIntro() {
  const colTitleRef = useRef<HTMLDivElement>(null);
  const headingWhiteRef = useRef<HTMLSpanElement>(null);
  const headingRedRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const whiteButtonRef = useRef<HTMLDivElement>(null); // Assuming WhiteButton renders a div
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate ColTitle
    gsap.fromTo(
      colTitleRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: colTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate HeadingWhite
    gsap.fromTo(
      headingWhiteRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingWhiteRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate HeadingRed
    gsap.fromTo(
      headingRedRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRedRef.current,
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

    // Animate Numbers with slide-up
    gsap.fromTo(
      numbersRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: numbersRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <BlobsBackground>
      <div className="MainContainer">
        <div className="MainInfoContainer">
          <div className="TextSubContainer">
            <div className="ColTitle" ref={colTitleRef}>
              <span className="RedDot">• </span>
              <span className="MiniText">About Us</span>
            </div>
            <span className="HeadingWhite" ref={headingWhiteRef}>
              Crafting the future,{' '}
            </span>
            <span className="HeadingRed" ref={headingRedRef}>
              one pixel at time.
            </span>
          </div>
          <div className="MainInfoSubcontainer">
            <p className="ParagraphWhite" ref={paragraphRef}>
              Our agency stands at the intersection of technology and
              creativity, serving as a beacon for businesses seeking to navigate
              the complexities of the digital age. Here, innovation is not just
              about keeping up with trends but setting them. Each project at
              WebCrafters is a testament to our ability to foresee market shifts
              and adapt technologies that define the future of digital
              interactions.
              <br /> <br />
              We specialize in dynamic web development, creating websites that
              are not only visually captivating but also functionally superior.
              Our web solutions are crafted with the latest technologies to
              ensure seamless performance across all platforms and devices.
              Whether it’s crafting a small business website or developing
              complex enterprise solutions, we focus on delivering a user
              experience that is intuitive and engaging.
            </p>

            <div ref={whiteButtonRef}>
              <WhiteButton label="Get Started" />
            </div>
          </div>
        </div>

        <Marquee />
        {/*
        <div className="Center">
          <ChromeButton iconSrc="/assets/icons/ArrowDown.svg" />
        </div>
        */}
        <div ref={numbersRef}>
          <Numbers />
        </div>
      </div>
    </BlobsBackground>
  );
}