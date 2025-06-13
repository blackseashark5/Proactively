import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../shared/ThemeToggle';
import LanguageToggle from '../shared/LanguageToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { path: '/list-practice', label: t('nav.listPractice', 'List your practice') },
    { path: '/employers', label: t('nav.employers', 'For Employers') },
    { path: '/courses', label: t('nav.courses', 'Courses') },
    { path: '/books', label: t('nav.books', 'Books') },
    { path: '/speakers', label: t('nav.speakers', 'Speakers') },
    { path: '/doctors', label: t('nav.doctors', 'Doctors') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeAuthDropdown = () => {
    setIsAuthDropdownOpen(false);
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeAuthDropdown();
      }
    };

    if (isAuthDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAuthDropdownOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isAuthDropdownOpen) {
          closeAuthDropdown();
        }
        if (isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isAuthDropdownOpen, isMobileMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <NavLink to="/" className="header__logo">
            <Activity size={32} aria-hidden="true" />
            ProVital
          </NavLink>

          <nav className="header__nav" role="navigation" aria-label="Main navigation">
            <ul className="header__nav-list">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `header__nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="header__controls">
              <div className="header__auth-dropdown" ref={dropdownRef}>
                <button 
                  className="header__auth-dropdown-trigger"
                  onClick={toggleAuthDropdown}
                  aria-expanded={isAuthDropdownOpen}
                  aria-haspopup="true"
                  aria-controls="auth-dropdown-menu"
                >
                  {t('auth.loginSignup', 'Login / Signup')}
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                
                <div 
                  id="auth-dropdown-menu"
                  className={`header__auth-dropdown-menu ${isAuthDropdownOpen ? 'open' : ''}`}
                  role="menu"
                >
                  <NavLink 
                    to="/login/doctor" 
                    className="header__auth-dropdown-item"
                    role="menuitem"
                    onClick={closeAuthDropdown}
                  >
                    {t('auth.doctor', 'Doctor')}
                  </NavLink>
                  <NavLink 
                    to="/login/patient" 
                    className="header__auth-dropdown-item"
                    role="menuitem"
                    onClick={closeAuthDropdown}
                  >
                    {t('auth.patient', 'Patient')}
                  </NavLink>
                </div>
              </div>

              <LanguageToggle />
              <ThemeToggle />
            </div>
          </nav>

          <button 
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`header__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="header__mobile-menu-header">
          <NavLink to="/" className="header__logo" onClick={closeMobileMenu}>
            <Activity size={32} aria-hidden="true" />
            ProVital
          </NavLink>
          <button 
            className="header__mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <nav role="navigation" aria-label="Mobile navigation">
          <ul className="header__mobile-menu-nav">
            {navigationItems.map((item) => (
              <li key={item.path} className="header__mobile-menu-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `header__mobile-menu-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="header__mobile-menu-auth">
            <h3 className="header__mobile-menu-auth-title">
              {t('auth.loginSignup', 'Login / Signup')}
            </h3>
            <div className="header__mobile-menu-auth-links">
              <NavLink 
                to="/login/doctor" 
                className="header__mobile-menu-auth-link" 
                onClick={closeMobileMenu}
              >
                {t('auth.doctor', 'Doctor')}
              </NavLink>
              <NavLink 
                to="/login/patient" 
                className="header__mobile-menu-auth-link" 
                onClick={closeMobileMenu}
              >
                {t('auth.patient', 'Patient')}
              </NavLink>
            </div>
          </div>

          <div className="header__mobile-menu-controls">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;