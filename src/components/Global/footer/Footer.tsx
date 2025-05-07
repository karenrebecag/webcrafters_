'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlobsBackground from '../BlobsBackground';
import './Footer.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Our Services', href: '#' },
  { label: 'Case Studies', href: '#' },
  { label: 'Innovation Hub', href: '#' },
  { label: 'Blog & Insights', href: '#' },
];

const resourceLinks = [
  { label: 'AI & Automation', href: '#' },
  { label: 'Cloud Computing', href: '#' },
  { label: 'UI/UX Design', href: '#' },
  { label: 'Web3 & Blockchain', href: '#' },
];

const contactInfo = [
  { label: '+1 (555) 123-4567', type: 'phone' },
  { label: 'contact@sphereagency.com', type: 'email' },
  { label: '123 Creative Blvd, Innovation City, NY 10001, USA', type: 'location' },
];

const socialLinks = [
  { label: 'Dribble', href: '#', icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/DribbleWhite.svg' },
  { label: 'Behance', href: '#', icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/BehanceWhite.svg' },
  { label: 'Instagram', href: '#', icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/InstagramWhite.svg' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const navSectionRef = useRef<HTMLDivElement>(null);
  const resourcesSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate Logo Section
    if (logoSectionRef.current) {
      gsap.fromTo(
        logoSectionRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate Navigation Section
    if (navSectionRef.current) {
      gsap.fromTo(
        navSectionRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate Resources Section
    if (resourcesSectionRef.current) {
      gsap.fromTo(
        resourcesSectionRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate Contact Section
    if (contactSectionRef.current) {
      gsap.fromTo(
        contactSectionRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate Social Section
    if (socialSectionRef.current) {
      gsap.fromTo(
        socialSectionRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <BlobsBackground>
      <footer ref={footerRef} className="footer">
        <div className="footer-container">
          <div className="footer-row">

          <div className="footer-logo-section" ref={logoSectionRef}>
              <div className="footer-logo">
                <Image
                  src="/assets/Logos/webCraftersLogoWhite.svg"
                  alt="WebCrafters Logo"
                  width={256}
                  height={32}
                  priority
                />
              </div>
              <p className="footer-description">
                Welcome to Void, where cutting-edge technology meets limitless possibilities.
              </p>
              <p className="footer-subtitle">Digital Innovation Website</p>
            </div>
            
            <div className="footer-section" ref={navSectionRef}>
              <h4 className="footer-section-title">Navigation</h4>
              {navLinks.map((link, index) => (
                <a key={index} href={link.href} className="footer-section-link">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer-section" ref={resourcesSectionRef}>
              <h4 className="footer-section-title">Resources</h4>
              {resourceLinks.map((link, index) => (
                <a key={index} href={link.href} className="footer-section-link">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer-section" ref={contactSectionRef}>
              <h4 className="footer-section-title">Get in Touch</h4>
              {contactInfo.map((info, index) => (
                <div key={index} className="footer-contact-item">
                  <span className="footer-contact-label">{info.label}</span>
                </div>
              ))}
            </div>

            <div className="footer-section footer-social-section" ref={socialSectionRef}>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} className="footer-social-link">
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={24}
                      height={24}
                      className="footer-social-icon"
                    />
                  </a>
                ))}
              </div>
              <p className="footer-description">
                We specialize in digital transformation, AI-driven solutions.
              </p>
            </div>


          </div>
        </div>
      </footer>
    </BlobsBackground>
  );
}