'use client';

import Image from 'next/image';
import '@/texts.css';
import styles from './AreasOfExpertise.module.css';

interface ExpertiseCard {
  title: string;
  icon: string;
  description: string;
}

interface AreasOfExpertiseProps {
  cards: ExpertiseCard[];
}

const expertiseCards: ExpertiseCard[] = [
  {
    title: 'E-Commerce',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconECommerce.svg',
    description: 'Tailored platforms with seamless shopping experiences and smart automations.',
  },
  {
    title: 'Fintech & Banking',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconFintechBanking.svg',
    description: 'High-security systems, AI integrations, and UX for complex financial products.',
  },
  {
    title: 'AI-Powered Tools',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconAITools.svg',
    description: 'Process automation, smart dashboards, and AI assistants for business operations.',
  },
  {
    title: 'Startups & MVP Launches',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconStartups.svg',
    description: 'From idea to impact: digital products engineered to validate, scale, and stand out.',
  },
  {
    title: 'Real Estate & Architecture',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconRealState.svg',
    description: 'Immersive 3D visualizations, property configurators, and virtual experiences.',
  },
  {
    title: 'Luxury & Lifestyle Brands',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconLuxury.svg',
    description: 'High-end UX/UI, storytelling design, and bespoke user journeys.',
  },
  {
    title: 'Education & Investigation',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconEducation.svg',
    description: 'Smart platforms for academic, innovation-driven, collaborative learning.',
  },
  {
    title: 'Art, Media & Culture',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconArt.svg',
    description: 'Creative tech for artists, studios, galleries, and cultural projects.',
  },
  {
    title: 'Healthcare & Wellness',
    icon: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/IconHealthcare.svg',
    description: 'Digital products designed with empathy, precision, and data visualization.',
  },
];

const AreasOfExpertise: React.FC<AreasOfExpertiseProps> = ({ cards = expertiseCards }) => {
  return (
    <section className={styles.expertiseSection}>
      <div className={styles.headerSection}>
        <div className="ColTitle">
          <span className="RedDot">• </span>
          <span className="MiniTextBlack">Areas of Expertise</span>
        </div>
        <h4 className={styles.expertiseTitle}>
          Where Innovation Meets Purpose Across High-Impact Sectors
        </h4>
        <p className="ParagraphBlack">
          We craft tailored digital experiences for industries that demand precision, beauty, and future-ready solutions.
        </p>
      </div>
      <div className={styles.expertiseGrid}>
        {cards.map((card, index) => (
          <div key={index} className={styles.expertiseCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={32}
                  height={32}
                  priority
                />
              </div>
              <h3 className="MiniHeadingBlack">{card.title}</h3>
            </div>
            <p className="ParagraphBlack">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AreasOfExpertise;