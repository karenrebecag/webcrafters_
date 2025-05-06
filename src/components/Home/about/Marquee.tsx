'use client';

import Image from 'next/image';
import './marquee.css';

const logos = [
  '/assets/logosdeprueba/logo1.png',
  '/assets/logosdeprueba/logo2.png',
  '/assets/logosdeprueba/logo3.png',
  '/assets/logosdeprueba/logo4.png',
  '/assets/logosdeprueba/logo5.png',
];

export default function LogoMarquee() {
  return (
    <div className="logoMarqueeWrapper">
      <div className="logoMarqueeTrack">
        {logos.concat(logos).map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`logo-${index}`}
            className="logoMarqueeItem"
            width={100}
            height={60}
            priority={index < 5}
          />
        ))}
      </div>
    </div>
  );
}