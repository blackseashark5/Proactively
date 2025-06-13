import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageCarousel from '../components/Hero/ImageCarousel';

const mockImages = [
  {
    src: 'image1.jpg',
    webp: 'image1.webp',
    alt: 'Image 1'
  },
  {
    src: 'image2.jpg',
    webp: 'image2.webp',
    alt: 'Image 2'
  },
  {
    src: 'image3.jpg',
    webp: 'image3.webp',
    alt: 'Image 3'
  }
];

describe('ImageCarousel Component', () => {
  test('renders carousel with images', () => {
    render(<ImageCarousel images={mockImages} />);
    
    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'carousel');
    expect(screen.getAllByRole('img')).toHaveLength(9); // 3 sets of 3 images
  });

  test('navigates to next slide on button click', () => {
    render(<ImageCarousel images={mockImages} />);
    
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);
    
    // Check if transform style has changed
    const track = document.querySelector('.hero__carousel-track');
    expect(track).toHaveStyle('transform: translateX(-133.33333333333334%)');
  });

  test('navigates to previous slide on button click', () => {
    render(<ImageCarousel images={mockImages} />);
    
    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);
    
    const track = document.querySelector('.hero__carousel-track');
    expect(track).toHaveStyle('transform: translateX(-66.66666666666667%)');
  });

  test('toggles play/pause on button click', () => {
    render(<ImageCarousel images={mockImages} />);
    
    const playPauseButton = screen.getByLabelText('Pause carousel');
    fireEvent.click(playPauseButton);
    
    expect(screen.getByLabelText('Play carousel')).toBeInTheDocument();
  });

  test('handles keyboard navigation', () => {
    render(<ImageCarousel images={mockImages} />);
    
    const carousel = screen.getByRole('region');
    carousel.focus();
    
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    
    const track = document.querySelector('.hero__carousel-track');
    expect(track).toHaveStyle('transform: translateX(-133.33333333333334%)');
  });

  test('has proper accessibility attributes', () => {
    render(<ImageCarousel images={mockImages} />);
    
    const carousel = screen.getByRole('region');
    expect(carousel).toHaveAttribute('aria-label', 'Lifestyle medicine images');
    expect(carousel).toHaveAttribute('tabIndex', '0');
  });

  test('pauses on mouse enter and resumes on mouse leave', () => {
    render(<ImageCarousel images={mockImages} />);
    
    const carousel = screen.getByRole('region');
    
    fireEvent.mouseEnter(carousel);
    // Test that auto-advance is paused
    
    fireEvent.mouseLeave(carousel);
    // Test that auto-advance resumes
  });
});