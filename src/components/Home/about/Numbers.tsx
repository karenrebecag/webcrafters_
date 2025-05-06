'use client';

import Image from 'next/image';
import './Numbers.css';
import WhiteButton from '../../Global/buttons/WhiteButton';
import CountUpDigit from './CountUpDigit'; 

export default function Numbers() {
  return (
    <section className="NumbersContainer">
      <div className="GridOverlay" />
      <div className="TopLayer" />
      
      <div className="NumbersBadge">
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
        <h2 className="HeadingWhite">Reimagining the world&rsquo;s narrative</h2>
        <p className="ParagraphWhite">
          Revolutionize your content game with our AI-powered SEO and copywriting tools!
          Say goodbye to writer&rsquo;s block and hello to high-quality content that ranks.
        </p>

        <div className="StatsRow">
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

        <WhiteButton label="Read More" />
      </div>
    </section>
  );
}