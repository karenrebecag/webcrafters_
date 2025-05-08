import React, { useState, useEffect, useRef } from 'react';
import TopButton from '../../../Global/buttons/TopButton';
import BlackButton from '../../../Global/buttons/BlackButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SlideShow.css';
import '@/texts.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SlideProps {
  title: string;
  description: string;
  services: string[];
}

interface SlideshowProps {
  productDesign: SlideProps;
  productDevelopment: SlideProps;
  threeDIntelligence: SlideProps;
  aiDrivenSystems: SlideProps;
  growthSEO: SlideProps;
}

const Slideshow: React.FC<SlideshowProps> = ({
  productDesign,
  productDevelopment,
  threeDIntelligence,
  aiDrivenSystems,
  growthSEO,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shapeRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const slides = [
    { content: productDesign, image: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/ProductDesignShape.png' },
    { content: productDevelopment, image: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/ProductDevelopmentShape.png' },
    { content: threeDIntelligence, image: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/3DIntelligenceShape.png' },
    { content: aiDrivenSystems, image: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/AIDrivenShape.png' },
    { content: growthSEO, image: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/GrowthSEOShape.png' },
  ];

  const icons = [
    'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/ProductDesignIcon.svg',
    'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/ProductDevelopmentIcon.svg',
    'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/3DIntelligenceIcon.svg',
    'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/AiDrivenIcon.svg',
    'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/GrowthSEOIcon.svg',
  ];

  const titles = [
    'Product Design',
    'Product Development',
    '3D Intelligence',
    'AI-Driven Systems',
    'Growth & SEO',
  ];

  // Preload images
  useEffect(() => {
    const imageUrls = slides.map(slide => slide.image);
    const preloadImages = () => {
      const promises = imageUrls.map(url => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        });
      });

      Promise.all(promises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch(error => {
          console.error('Error preloading images:', error);
          setImagesLoaded(true);
        });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeButton = buttonRefs.current[activeSlide];
      if (activeButton && indicatorRef.current) {
        const newPosition = activeButton.offsetLeft;
        const newWidth = activeButton.offsetWidth;
        setIndicatorPosition(newPosition);
        setIndicatorWidth(newWidth);
        gsap.to(indicatorRef.current, {
          left: newPosition,
          width: newWidth,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSlide]);

  useEffect(() => {
    // Slide transition animation for shape and text
    if (shapeRef.current && textRef.current) {
      gsap.fromTo(
        shapeRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [activeSlide, imagesLoaded]);

  const handleShapeHover = () => {
    if (shapeRef.current) {
      gsap.to(shapeRef.current, {
        scale: 1.05,
        rotation: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleShapeLeave = () => {
    if (shapeRef.current) {
      gsap.to(shapeRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  // Scroll-based fade-up animation
  useEffect(() => {
    if (imagesLoaded && slideshowRef.current) {
      // Fade-up animation for the entire slideshow container
      gsap.fromTo(
        slideshowRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slideshowRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Staggered fade-up animations for individual elements
      gsap.fromTo(
        [shapeRef.current, titleRef.current, descriptionRef.current, buttonContainerRef.current, marqueeRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slideshowRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [imagesLoaded]);

  const { content, image } = slides[activeSlide];

  // Show a loading message while images are preloading
  if (!imagesLoaded) {
    return (
      <div className="WhiteContainer">
        <div className="GeneralContainer">
          <div className="slideshow-background" />
          <div className="slideshow-noise" />
          <div className="slideshow-container">
            <p>Loading images...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="WhiteContainer">
      <div className="GeneralContainer">
        <div className="slideshow-background" />
        <div className="slideshow-noise" />
        <div ref={slideshowRef} className="slideshow-container">
          {/* Navigation Buttons */}
          <div className="slideshow-nav">
            {titles.map((title, index) => (
              <TopButton
                key={index}
                ref={(el: HTMLButtonElement) => (buttonRefs.current[index] = el)}
                icon={icons[index]}
                label={title}
                isActive={activeSlide === index}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          {/* Sliding Indicator */}
          <div ref={indicatorRef} className="slideshow-indicator" />

          {/* Slide Content */}
          <div className="slideshow-content">
            {/* Left: Static Image */}
            <div className="slideshow-shape">
              <img
                ref={shapeRef}
                src={image}
                alt={`${content.title} shape`}
                className="slideshow-shape-image"
                onMouseEnter={handleShapeHover}
                onMouseLeave={handleShapeLeave}
              />
            </div>

            {/* Right: Text Content */}
            <div ref={textRef} className="slideshow-text">
              <h1 ref={titleRef} className="slideshow-title">{content.title}</h1>
              <p ref={descriptionRef} className="slideshow-description">{content.description}</p>
              <div ref={buttonContainerRef}>
                <BlackButton label="Get Started" />
              </div>
              <div ref={marqueeRef} className="marquee-container">
                <div className="marquee-content">
                  {[...content.services, ...content.services].map((service, index) => (
                    <React.Fragment key={index}>
                      <span className="marquee-item">{service}</span>
                      {index < content.services.length * 2 - 1 && (
                        <span className="marquee-divider">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;