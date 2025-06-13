import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="language-toggle" ref={dropdownRef}>
      <button
        className="language-toggle__trigger"
        onClick={toggleDropdown}
        aria-label={t('language.toggle', 'Change language')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={20} />
        <span className="language-toggle__current">{currentLanguage.flag}</span>
      </button>

      <div className={`language-toggle__dropdown ${isOpen ? 'open' : ''}`} role="menu">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`language-toggle__option ${language.code === i18n.language ? 'active' : ''}`}
            onClick={() => changeLanguage(language.code)}
            role="menuitem"
          >
            <span className="language-toggle__flag">{language.flag}</span>
            <span className="language-toggle__name">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;