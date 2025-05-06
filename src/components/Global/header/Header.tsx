'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = ['Home', 'Services', 'Insights', 'Blog', 'Plans', 'Contact'];

  const icons = [
    {
      name: 'Instagram',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/InstagramWhite.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/LinkedinWhite.svg'
    },
    {
      name: 'Languages',
      url: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/LanguagesWhite.svg'
    }
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
                    onChange={() => setIsDarkMode(prev => !prev)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {icons.map((icon) => (
                <button className="Btn" key={icon.name}>
                  <Image src={icon.url} alt={`${icon.name} Icon`} width={20} height={20} className="svgIcon" />
                </button>
              ))}
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
                  onChange={() => setIsDarkMode(prev => !prev)}
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
              <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(prev => !prev)}>
                <div/>
                <div/>
                <div/>
              </button>
            </div>
          </div>
        )}
      </header>

      {isMobile && (
        <div className={`mega-menu ${isMenuOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
          <nav className="mega-nav">
            {navItems.map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`}>
                <span className={item === 'Home' ? 'active' : ''}>{item}</span>
              </Link>
            ))}
          </nav>
          <div className="mega-icons">
            {icons.map((icon) => (
              <button className="Btn" key={icon.name}>
                <Image src={icon.url} alt={`${icon.name} Icon`} width={20} height={20} className="svgIcon" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;