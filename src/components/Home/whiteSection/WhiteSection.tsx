'use client';

import React from 'react';
import Services from './Services';
import Hand from './3D/Hand';

const WhiteSection: React.FC = () => {
  return (
    <section className="WhiteSection">
      <div className="hand-wrapper">
        <Hand />
      </div>
      <Services />
    </section>
  );
};

export default WhiteSection;