import { useState, useCallback } from 'react';

export const usePillarsCarousel = (totalCards: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlides = Math.max(0, totalCards - 3);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(maxSlides, prev + 1));
  }, [maxSlides]);

  const resetSlide = useCallback(() => {
    setCurrentSlide(0);
  }, []);

  return {
    currentSlide,
    handlePrevSlide,
    handleNextSlide,
    resetSlide,
    maxSlides,
  };
};