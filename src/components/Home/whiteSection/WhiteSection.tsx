'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import AreasOfExpertise from './AreasofExpertice';
import SlideShow from './SlideShow/SlideShow';
import './whiteSection.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const WhiteSection: React.FC = () => {
  const colTitleRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const handWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (colTitleRef.current) {
        // Ensure the heading container is visible
        gsap.set(colTitleRef.current, { opacity: 1 });

        // SplitText animation for the heading
        const headingElement = colTitleRef.current.querySelector('.SplitText');
        if (headingElement) {
          const split = new SplitText(headingElement, {
            type: 'words',
            wordsClass: 'word word++',
            ignore: 'sup', // Ignore <sup> elements
          });

          gsap.fromTo(
            split.words,
            { y: -100, opacity: 0, rotation: 'random(-20, 20)' },
            {
              y: 0,
              opacity: 1,
              rotation: 0,
              duration: 1,
              stagger: 0.1,
              ease: 'back',
              scrollTrigger: {
                trigger: colTitleRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Red dot animation
        gsap.fromTo(
          colTitleRef.current.querySelector('.RedDot'),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: colTitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    if (subheadingRef.current) {
      // Mask reveal effect for the subheading
      gsap.fromTo(
        subheadingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subheadingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Parallax effect for the subheading
      gsap.to(subheadingRef.current, {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }

    if (handWrapperRef.current) {
      // Animate hand-wrapper height similar to SplitText animation
      gsap.fromTo(
        handWrapperRef.current,
        { height: '20vh' }, // Min height
        {
          height: '50vh', // Max height
          duration: 1,
          ease: 'back',
          scrollTrigger: {
            trigger: handWrapperRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="WhiteSection">
      <div className="noise-layer" />
      <div className="heading-container">
        <div className="ColTitle" ref={colTitleRef}>
          <span className="RedDot">• </span>
          <span className="SplitText">
            Smart Digital Services<sup></sup>
          </span>
        </div>
        <p className="subheading" ref={subheadingRef}>
          Explore a full suite of tailored solutions—from immersive 3D visuals and powerful AI tools to seamless product design and app development. At WebCrafters, we craft technology with purpose, beauty, and intelligence.
        </p>
      </div>
      <div className="hand-wrapper" ref={handWrapperRef}>
        <SlideShow
          productDesign={{
            title: 'Product Design',
            description:
              'This is where ideas are transformed into structured, scalable, and visually refined digital products. We don’t just design interfaces – we architect digital experiences that are rooted in business logic, user behavior, and market strategy.\n\nFrom startups to established companies, we guide our clients through a full-cycle design process that blends UX consulting, product logic, and creative direction. Every solution is tailored, with attention to both aesthetics and functionality, ensuring it’s not only beautiful – but high-performing and user-centered.',
            services: [
              'Strategic Product Consulting',
              'Product Architecture And Business Logic',
              'UX Research & UX Writing',
              'Wireframing And Interactive Prototyping',
              'High-End UI Design',
              'MVP Design And User Testing',
              'Product Direction And Long-Term Guidance',
            ],
          }}
          productDevelopment={{
            title: 'Product Development',
            description:
              'We specialize in developing high-end, scalable web and mobile applications using both custom code and no/low code builders—tailored to your project’s needs, goals, and existing growth. Whether you’re launching a new idea or expanding an existing product, we architect systems to evolve.\n\nOur approach blends top-tier technical execution with strategic thinking, ensuring every app we create is optimized for performance, usability, and long-term value. We treat development as a craft: visually refined, technically sound, and built to scale.',
            services: [
              'Full-Stack Web & Mobile App Development',
              'MVP And Prototype Engineering',
              'Modular And Scalable Architecture',
              'No-Code / Low-Code Integrations',
              'Backend Systems & API Integrations',
              'CMS & Custom Dashboards',
              'DevOps, QA Testing & Ongoing Support',
            ],
          }}
          threeDIntelligence={{
            title: '3D Intelligence & Visualization',
            description:
              'We create high-fidelity 3D assets that elevate how your brand communicates, analyzes, and inspires. Whether you need interactive product mockups, immersive simulations, or advanced data visualizations, our 3D systems are engineered for performance, elegance, and clarity.\n\nFrom virtual environments to real-time visual analytics, we blend creative vision with technical precision to turn complex information into intuitive, emotionally resonant experiences. Ideal for product launches, marketing campaigns, or strategic storytelling.',
            services: [
              'Interactive 3D Mockups & Product Showcases',
              'Web-Based 3D Visualizations (Three.js / WebGL)',
              'Real-Time Data Visualization In 3D',
              'Virtual Spaces For Events & Demos',
              '3D Animation For Marketing & Storytelling',
              'Custom 3D Asset Development',
            ],
          }}
          aiDrivenSystems={{
            title: 'AI-Driven Systems',
            description:
              'We design and implement custom AI-powered solutions that enhance productivity, improve user experience, and unlock new business potential. From smart automations to conversational bots and predictive models, we build intelligent systems that integrate seamlessly into your platforms and workflows.\n\nOur approach blends machine learning, natural language processing, and custom API orchestration with human-centered design to ensure your technology not only works – it understands.',
            services: [
              'AI & GPT-Based Chatbots For Web, Apps & Social Platforms',
              'Predictive Systems & Behavioral Analysis Integration With CRMs, Call Centers & Internal Tools',
              'Custom AI Deployment',
              'Voice Assistants & Speech-To-Text Interfaces',
              'AI-Powered Recommendation',
              'Automated Workflows For Sales, Support & Operations',
            ],
          }}
          growthSEO={{
            title: 'Growth & SEO',
            description:
              'We optimize and maintain digital products through SEO, performance audits, analytics, and marketing automation. Whether it’s a web app, e-commerce site, AI assistant or 3D experience, we ensure it reaches the right users, loads fast, ranks high, and evolves smartly.',
            services: [
              'SEO Architecture & Semantic Structuring',
              'Core Ascendancy SEO',
              'Core Web Vitals & Performance Optimization',
              'CRM, Analytics & Conversion Tracking Setup',
              'Content Strategy & AI-Assisted SEO',
              'Marketing Automation & Retargeting Strategy',
            ],
          }}
        />
      </div>
      <AreasOfExpertise />
    </section>
  );
};

export default WhiteSection;