import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../components/Header/Header';

const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe('Header Component', () => {
  test('renders logo and navigation links', () => {
    render(<HeaderWithRouter />);
    
    expect(screen.getByText('ProVital')).toBeInTheDocument();
    expect(screen.getByText('List your practice')).toBeInTheDocument();
    expect(screen.getByText('For Employers')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
  });

  test('toggles mobile menu on hamburger click', () => {
    render(<HeaderWithRouter />);
    
    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(hamburgerButton);
    
    expect(screen.getByRole('dialog')).toHaveClass('header__mobile-menu open');
  });

  test('toggles auth dropdown on click', () => {
    render(<HeaderWithRouter />);
    
    const authButton = screen.getByText('Login / Signup');
    fireEvent.click(authButton);
    
    expect(screen.getByRole('menu')).toHaveClass('header__auth-dropdown-menu open');
  });

  test('closes dropdown on escape key', async () => {
    render(<HeaderWithRouter />);
    
    const authButton = screen.getByText('Login / Signup');
    fireEvent.click(authButton);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).not.toHaveClass('open');
    });
  });

  test('has proper ARIA attributes', () => {
    render(<HeaderWithRouter />);
    
    const authButton = screen.getByText('Login / Signup');
    expect(authButton).toHaveAttribute('aria-expanded', 'false');
    expect(authButton).toHaveAttribute('aria-haspopup', 'true');
  });

  test('closes mobile menu when clicking overlay', () => {
    render(<HeaderWithRouter />);
    
    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(hamburgerButton);
    
    const overlay = document.querySelector('.mobile-menu-overlay');
    fireEvent.click(overlay!);
    
    expect(screen.getByRole('dialog')).not.toHaveClass('open');
  });
});