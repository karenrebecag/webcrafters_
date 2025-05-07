import React from 'react';
import './Hand.css';

const Hand: React.FC = () => {
  return (
    <div className="hand-container">
      <img
        src="https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/RedBottom.png"
        alt="Red Bottom"
        className="hand-layer layer-1"
      />
      <img
        src="https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/marble_hand.png"
        alt="Marble Hand"
        className="hand-layer layer-2"
      />
      <img
        src="https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/TinyCard.svg"
        alt="Tiny Card"
        className="hand-layer layer-3"
      />
      <img
        src="https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/BigCard.svg"
        alt="Big Card"
        className="hand-layer layer-4"
      />
    </div>
  );
};

export default Hand;