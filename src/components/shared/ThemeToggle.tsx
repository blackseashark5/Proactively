import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.switchToLight', 'Switch to light mode') : t('theme.switchToDark', 'Switch to dark mode')}
      title={isDark ? t('theme.switchToLight', 'Switch to light mode') : t('theme.switchToDark', 'Switch to dark mode')}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;