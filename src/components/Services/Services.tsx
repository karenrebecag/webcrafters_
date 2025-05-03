'use client';

import Image from 'next/image';
import styles from './Services.module.css';
import '../../texts.css';

const services = [
  {
    title: 'Artificial Intelligence',
    icon: '/assets/icons/ArtificialIntelligence.gif',
    description:
      'Tailored advice and development of AI systems to integrate intelligent solutions into businesses, enhancing small to large enterprises.',
  },
  {
    title: 'Digital Transformation',
    icon: '/assets/icons/DigitalTransformation.gif',
    description:
      'Full digital transformation of brand identities through website creation, inclusive of automation processes to digitize communications.',
  },
  {
    title: 'Data Solutions & SEO',
    icon: '/assets/icons/DataSolutions.gif',
    description:
      'Services encompassing data collection and analysis to strengthen business strategies, including CRM, Meta Ads, and Google Search Console analysis.',
  },
  {
    title: 'Product Design and UX/UI',
    icon: '/assets/icons/ProductDesign.gif',
    description:
      'Customized creation of mobile and web applications, encompassing UX research, consultancy, and both UX and UI design.',
  },
  {
    title: 'NoCode Solutions',
    icon: '/assets/icons/NoCode.gif',
    description:
      'Drag-and-Drop Website Building: Offering clients the ability to easily create websites without coding knowledge using NoCode platforms.',
  },
  {
    title: 'E-Commerce',
    icon: '/assets/icons/ECommerce.gif',
    description:
      'Design and development of e-commerce platforms tailored to the unique needs of each client, ensuring a seamless shopping experience.',
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.servicesSection}>
        <div className={styles.TitleSection}>
            <div className='ColTitle'>
                <span className='RedDot'>• </span>
                <span className="MiniTextBlack">Services</span>
            </div>
            <h4 className="HeadingBlack">Where Every Frame 
            Speaks, Every Detail Inspires</h4>
        </div>
          <div className={styles.grid}>
            {services.map((service, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.icon}>
                  <Image className='animatedIcon'
                    src={service.icon}
                    alt={service.title}
                    width={38}
                    height={38}
                    priority
                  />
                </div>
                <h3 className="MiniHeadingBlack">{service.title}</h3>
                <p className="ParagraphBlack">{service.description}</p>
                <div className={styles.arrow}>
                  <Image
                    src="/assets/icons/ArrowUp.svg"
                    alt="Arrow Icon"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            ))}
          </div>
    </section>
  );
}