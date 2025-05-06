'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import './header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const iconsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const navItems = ['Home', 'Services', 'Insights', 'Blog', 'Plans', 'Contact'];

  const icons = [
    {
      name: 'Instagram',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/InstagramWhite.svg',
    },
    {
      name: 'LinkedIn',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/LinkedinWhite.svg',
    },
    {
      name: 'Languages',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/LanguagesWhite.svg',
    },
  ];

  const mobileIcons = [
    {
      name: 'Instagram',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/InstagramWhite.svg',
    },
    {
      name: 'LinkedIn',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/LinkedinWhite.svg',
    },
    {
      name: 'Languages',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/LanguagesWhite.svg',
    },
    {
      name: 'Twitter',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/InstagramWhite.svg', // Placeholder
    },
    {
      name: 'Facebook',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/InstagramWhite.svg', // Placeholder
    },
    {
      name: 'GitHub',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/InstagramWhite.svg', // Placeholder
    },
  ];

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth <= 1200);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isMobile]);

  useEffect(() => {
    if (isMobile && megaMenuRef.current) {
      if (isMenuOpen) {
        gsap.to(megaMenuRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          display: 'flex',
          duration: 0.8,
          ease: 'power4.out',
          backdropFilter: 'blur(10px)',
        });
        gsap.to(megaMenuRef.current, {
          '--gradient-angle': '360deg',
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
        gsap.to(navItemsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.3,
        });
        gsap.to(iconsRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: 0.6,
        });
      } else {
        gsap.to(iconsRef.current, {
          opacity: 0,
          x: 18, // Reduced by 40% from 30
          scale: 0.88, // Reduced by 40% from 0.8 (0.8 + 0.2 * 0.4 = 0.88)
          stagger: 0.1,
          duration: 0.4,
          ease: 'power3.in',
        });
        gsap.to(navItemsRef.current, {
          opacity: 0,
          y: 18, // Reduced by 40% from 30
          scale: 0.94, // Reduced by 40% from 0.9 (0.9 + 0.1 * 0.4 = 0.94)
          stagger: 0.1,
          duration: 0.4,
          ease: 'power3.in',
        });
        gsap.to(megaMenuRef.current, {
          opacity: 0,
          y: -60, // Reduced by 40% from -100
          scale: 0.97, // Reduced by 40% from 0.95 (0.95 + 0.05 * 0.4 = 0.97)
          duration: 0.6,
          ease: 'power4.in',
          onComplete: () => {
            gsap.set(megaMenuRef.current, { display: 'none' });
          },
        });
      }
    }
  }, [isMenuOpen, isMobile]);

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      <header className={`header sticky ${isDarkMode ? 'dark' : 'light'} visible`}>
        <div id="header-spacer"></div>
        {!isMobile ? (
          <div className="header-desktop">
            <Image
              src="/assets/Logos/webCraftersLogoWhite.svg"
              alt="WebCrafters Logo"
              width={217}
              height={50}
              className="logo"
            />
            <nav className="nav-links">
              {navItems.map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`}>
                  <span className={item === 'Home' ? 'active' : ''}>{item}</span>
                </Link>
              ))}
            </nav>
            <div className="right-icons">
              <div className="toggle-switch">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={!isDarkMode}
                    onChange={() => setIsDarkMode((prev) => !prev)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {icons.map((icon) =>
                icon.name === 'Languages' ? (
                  <div className="language-dropdown" key={icon.name}>
                    <button className="Btn" onClick={toggleLanguageDropdown}>
                      <Image
                        src={icon.url}
                        alt={`${icon.name} Icon`}
                        width={20}
                        height={20}
                        className="svgIcon"
                      />
                    </button>
                    <div
                      className={`dropdown-menu ${isLanguageDropdownOpen ? 'open' : ''}`}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => selectLanguage('English')}
                      >
                        English
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => selectLanguage('Spanish')}
                      >
                        Spanish
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="Btn" key={icon.name}>
                    <Image
                      src={icon.url}
                      alt={`${icon.name} Icon`}
                      width={20}
                      height={20}
                      className="svgIcon"
                    />
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="header-mobile">
            <div className="toggle-switch">
              <label className="switch-label">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={!isDarkMode}
                  onChange={() => setIsDarkMode((prev) => !prev)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <Image
              src="/assets/Logos/webCraftersLogoWhite.svg"
              alt="WebCrafters Logo"
              width={140}
              height={30}
              className="logo"
            />
            <div className="right-icons">
              <button
                className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <div />
                <div />
                <div />
              </button>
            </div>
          </div>
        )}
      </header>

      {isMobile && (
        <div
          className={`mega-menu ${isMenuOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}
          ref={megaMenuRef}
        >
          <nav className="mega-nav">
            {navItems.map((item, index) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                ref={(el) => (navItemsRef.current[index] = el)}
              >
                <span className={item === 'Home' ? 'active' : ''}>{item}</span>
              </Link>
            ))}
          </nav>
          <div className="mega-icons">
            {mobileIcons.map((icon, index) =>
              icon.name === 'Languages' ? (
                <div className="language-dropdown" key={icon.name}>
                  <button
                    className="Btn"
                    onClick={toggleLanguageDropdown}
                    ref={(el) => (iconsRef.current[index] = el)}
                  >
                    <Image
                      src={icon.url}
                      alt={`${icon.name} Icon`}
                      width={20}
                      height={20}
                      className="svgIcon"
                    />
                  </button>
                  <div
                    className={`dropdown-menu ${isLanguageDropdownOpen ? 'open' : ''}`}
                  >
                    <button
                      className="dropdown-item"
                      onClick={() => selectLanguage('English')}
                    >
                      English
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => selectLanguage('Spanish')}
                    >
                      Spanish
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="Btn"
                  key={icon.name}
                  ref={(el) => (iconsRef.current[index] = el)}
                >
                  <Image
                    src={icon.url}
                    alt={`${icon.name} Icon`}
                    width={20}
                    height={20}
                    className="svgIcon"
                  />
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;