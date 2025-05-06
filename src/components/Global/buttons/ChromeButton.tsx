'use client';

import './chromeButton.css';

interface CircularButtonProps {
  altText?: string;
  onClick?: () => void;
}

export default function ChromeButton({ altText = 'Arrow Down', onClick }: CircularButtonProps) {
  return (
    <button className="circularButton" onClick={onClick}>
      <img
        src="https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/Arrow_Down.svg"
        alt={altText}
        className="centerIcon"
      />
    </button>
  );
}