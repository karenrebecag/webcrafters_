'use client';

import React from 'react';
import Services from './Services';
import SlideShow from './SlideShow/SlideShow';

const WhiteSection: React.FC = () => {
  return (
    <section className="WhiteSection">
      <div className="hand-wrapper">
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
              'Core Web Vitals & Performance Optimization',
              'CRM, Analytics & Conversion Tracking Setup',
              'Content Strategy & AI-Assisted SEO',
              'CRM, Analytics & Conversion Tracking Setup',
              'Marketing Automation & Retargeting Strategy',
            ],
          }}
        />
      </div>
      <Services />
    </section>
  );
};

export default WhiteSection;