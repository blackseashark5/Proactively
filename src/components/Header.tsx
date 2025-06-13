import React, { useState } from 'react';
import { Menu, X, ChevronDown, Activity } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <a href="/" className="header__logo">
            <Activity size={32} />
            ProVital
          </a>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li><a href="#" className="header__nav-link">List your practice</a></li>
              <li><a href="#" className="header__nav-link">For Employers</a></li>
              <li><a href="#" className="header__nav-link">Courses</a></li>
              <li><a href="#" className="header__nav-link">Books</a></li>
              <li><a href="#" className="header__nav-link">Speakers</a></li>
              <li><a href="#" className="header__nav-link">Doctors</a></li>
            </ul>

            <div className="header__auth-dropdown">
              <button 
                className="header__auth-dropdown-trigger"
                onClick={toggleAuthDropdown}
                aria-expanded={isAuthDropdownOpen}
                aria-haspopup="true"
              >
                Login / Signup
                <ChevronDown size={16} />
              </button>
              
              <div className={`header__auth-dropdown-menu ${isAuthDropdownOpen ? 'open' : ''}`}>
                <a href="#" className="header__auth-dropdown-item">Doctor</a>
                <a href="#" className="header__auth-dropdown-item">Patient</a>
              </div>
            </div>
          </nav>

          <button 
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="header__mobile-menu-header">
          <a href="/" className="header__logo">
            <Activity size={32} />
            ProVital
          </a>
          <button 
            className="header__mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <X />
          </button>
        </div>

        <nav>
          <ul className="header__mobile-menu-nav">
            <li className="header__mobile-menu-item">
              <a href="#" className="header__mobile-menu-link" onClick={closeMobileMenu}>
                List your practice
              </a>
            </li>
            <li className="header__mobile-menu-item">
              <a href="#" className="header__mobile-menu-link" onClick={closeMobileMenu}>
                For Employers
              </a>
            </li>
            <li className="header__mobile-menu-item">
              <a href="#" className="header__mobile-menu-link" onClick={closeMobileMenu}>
                Courses
              </a>
            </li>
            <li className="header__mobile-menu-item">
              <a href="#" className="header__mobile-menu-link" onClick={closeMobileMenu}>
                Books
              </a>
            </li>
            <li className="header__mobile-menu-item">
              <a href="#" className="header__mobile-menu-link" onClick={closeMobileMenu}>
                Speakers
              </a>
            </li>
            <li className="header__mobile-menu-item">
              <a href="#" className="header__mobile-menu-link" onClick={closeMobileMenu}>
                Doctors
              </a>
            </li>
          </ul>

          <div className="header__mobile-menu-auth">
            <h3 className="header__mobile-menu-auth-title">Login / Signup</h3>
            <div className="header__mobile-menu-auth-links">
              <a href="#" className="header__mobile-menu-auth-link" onClick={closeMobileMenu}>
                Doctor
              </a>
              <a href="#" className="header__mobile-menu-auth-link" onClick={closeMobileMenu}>
                Patient
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;