'use client';

import './chromeButton.css';

interface CircularButtonProps {
  iconSrc: string;
  altText?: string;
  onClick?: () => void;
}

export default function ChromeButton({ iconSrc, altText = 'Icon', onClick }: CircularButtonProps) {
  return (
    <button className="circularButton" onClick={onClick}>
      <img src={iconSrc} alt={altText} className="centerIcon" />
    </button>
  );
}