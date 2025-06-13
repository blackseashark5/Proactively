import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEOHead: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{t('seo.title', 'ProVital - Lifestyle Medicine Experts')}</title>
      <meta 
        name="description" 
        content={t('seo.description', 'Book appointments with lifestyle medicine experts. Optimize your lifestyle and reverse chronic diseases through evidence-based healthcare.')} 
      />
      <meta 
        name="keywords" 
        content="lifestyle medicine, healthcare, appointments, nutrition, physical activity, sleep, stress management" 
      />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://provital.com/" />
      <meta property="og:title" content={t('seo.title', 'ProVital - Lifestyle Medicine Experts')} />
      <meta 
        property="og:description" 
        content={t('seo.description', 'Book appointments with lifestyle medicine experts. Optimize your lifestyle and reverse chronic diseases.')} 
      />
      <meta property="og:image" content="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://provital.com/" />
      <meta property="twitter:title" content={t('seo.title', 'ProVital - Lifestyle Medicine Experts')} />
      <meta 
        property="twitter:description" 
        content={t('seo.description', 'Book appointments with lifestyle medicine experts. Optimize your lifestyle and reverse chronic diseases.')} 
      />
      <meta property="twitter:image" content="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#4A90A4" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="ProVital" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="dns-prefetch" href="https://images.pexels.com" />
    </Helmet>
  );
};

export default SEOHead;