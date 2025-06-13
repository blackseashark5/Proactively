import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSwipeable } from '../hooks/useSwipeable';

interface Image {
  src: string;
  webp: string;
  alt: string;
}

interface ImageCarouselProps {
  images: Image[];
  autoAdvanceInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  autoAdvanceInterval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(images.length);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create infinite loop by triplicating images
  const infiniteImages = [...images, ...images, ...images];
  const visibleCount = 3;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, [isTransitioning]);

  // Handle infinite loop reset
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      if (currentIndex >= images.length * 2) {
        setCurrentIndex(images.length);
        setIsTransitioning(false);
      } else if (currentIndex < images.length) {
        setCurrentIndex(images.length * 2 - 1);
        setIsTransitioning(false);
      } else {
        setIsTransitioning(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex, images.length, isTransitioning]);

  // Auto-advance functionality
  useEffect(() => {
    if (isPlaying && !isPaused && !isTransitioning) {
      intervalRef.current = setInterval(nextSlide, autoAdvanceInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, isTransitioning, nextSlide, autoAdvanceInterval]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, nextSlide, prevSlide]);

  const translateX = -(currentIndex * (100 / visibleCount));

  return (
    <div 
      className="hero__carousel-container"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...swipeHandlers}
      role="region"
      aria-roledescription="carousel"
      aria-label="Lifestyle medicine images"
      tabIndex={0}
    >
      <div 
        className="hero__carousel-track"
        style={{
          transform: `translateX(${translateX}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
        }}
        aria-live="polite"
        aria-atomic="false"
      >
        {infiniteImages.map((image, index) => (
          <div 
            key={`${index}-${image.src}`} 
            className="hero__carousel-item"
            aria-hidden={
              index < currentIndex || index >= currentIndex + visibleCount ? 'true' : 'false'
            }
          >
            <picture>
              <source srcSet={image.webp} type="image/webp" />
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
              />
            </picture>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="hero__carousel-controls">
        <button
          className="hero__carousel-control hero__carousel-control--prev"
          onClick={prevSlide}
          aria-label="Previous image"
          disabled={isTransitioning}
        >
          ‹
        </button>
        <button
          className="hero__carousel-control hero__carousel-control--play-pause"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button
          className="hero__carousel-control hero__carousel-control--next"
          onClick={nextSlide}
          aria-label="Next image"
          disabled={isTransitioning}
        >
          ›
        </button>
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing images {((currentIndex % images.length) + 1)} to {((currentIndex % images.length) + visibleCount)} of {images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;