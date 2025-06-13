import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Pillars from '../components/Pillars/Pillars';

const PillarsWithRouter = () => (
  <BrowserRouter>
    <Pillars />
  </BrowserRouter>
);

describe('Pillars Component', () => {
  test('renders all pillar tabs', () => {
    render(<PillarsWithRouter />);
    
    expect(screen.getByText('Nutrition')).toBeInTheDocument();
    expect(screen.getByText('Physical activity')).toBeInTheDocument();
    expect(screen.getByText('Restorative sleep')).toBeInTheDocument();
    expect(screen.getByText('Stress management')).toBeInTheDocument();
    expect(screen.getByText('Social connection')).toBeInTheDocument();
    expect(screen.getByText('Substance abuse')).toBeInTheDocument();
  });

  test('switches tabs on click', async () => {
    render(<PillarsWithRouter />);
    
    const activityTab = screen.getByText('Physical activity');
    fireEvent.click(activityTab);
    
    await waitFor(() => {
      expect(activityTab).toHaveClass('active');
    });
  });

  test('displays cards for active tab', () => {
    render(<PillarsWithRouter />);
    
    // Nutrition tab should be active by default
    expect(screen.getByText('Evidence supports the use of a whole food')).toBeInTheDocument();
  });

  test('handles keyboard navigation', () => {
    render(<PillarsWithRouter />);
    
    const tabsContainer = screen.getByRole('tablist');
    const firstTab = screen.getByText('Nutrition');
    
    firstTab.focus();
    fireEvent.keyDown(tabsContainer, { key: 'ArrowRight' });
    
    // Should move to next tab
    expect(screen.getByText('Physical activity')).toHaveClass('active');
  });

  test('shows navigation buttons when needed', () => {
    render(<PillarsWithRouter />);
    
    // Check if navigation buttons are present (they should be hidden if not needed)
    const navButtons = screen.queryAllByRole('button', { name: /Previous cards|Next cards/ });
    
    // Navigation should only be visible if there are more than 3 cards
    if (navButtons.length > 0) {
      expect(navButtons).toHaveLength(2);
    }
  });

  test('has proper ARIA attributes', () => {
    render(<PillarsWithRouter />);
    
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Lifestyle medicine pillars');
    
    const firstTab = screen.getByText('Nutrition');
    expect(firstTab).toHaveAttribute('role', 'tab');
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });
});