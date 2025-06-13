import React, { Suspense } from 'react';
import { Search, MapPin, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../shared/LoadingSpinner';

// Lazy load carousel for better performance
const ImageCarousel = React.lazy(() => import('./ImageCarousel'));

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const images = [
    {
      src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
      webp: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
      alt: 'Lifestyle medicine nutrition consultation'
    },
    {
      src: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=500',
      webp: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
      alt: 'Physical activity and exercise therapy'
    },
    {
      src: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=500',
      webp: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
      alt: 'Restorative sleep and wellness'
    },
    {
      src: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=500',
      webp: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
      alt: 'Stress management and meditation'
    },
    {
      src: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500',
      webp: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
      alt: 'Mindful eating and nutrition'
    },
    {
      src: 'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=500',
      webp: 'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
      alt: 'Flexibility and movement therapy'
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted');
  };

  return (
    <section className="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            {t('hero.title.part1', 'Book an appointment with')}{' '}
            <span className="highlight">
              {t('hero.title.highlight', 'lifestyle medicine')}
            </span>{' '}
            {t('hero.title.part2', 'experts')}
          </h1>
          <p className="hero__subtitle">
            {t('hero.subtitle', 'Optimize your lifestyle and reverse chronic diseases.')}
          </p>

          <div className="hero__search">
            <form className="hero__search-form" onSubmit={handleSearch}>
              <div className="hero__search-group">
                <label className="hero__search-label" htmlFor="condition">
                  {t('search.condition.label', 'Condition, procedure, specialty...')}
                </label>
                <div className="hero__search-input-wrapper">
                  <Search 
                    size={20} 
                    className="hero__search-icon"
                    aria-hidden="true"
                  />
                  <input
                    id="condition"
                    type="text"
                    className="hero__search-input"
                    placeholder={t('search.condition.placeholder', 'Condition, procedure, specialty...')}
                    aria-describedby="condition-help"
                  />
                </div>
              </div>

              <div className="hero__search-group">
                <label className="hero__search-label" htmlFor="location">
                  {t('search.location.label', 'City, state, or zipcode')}
                </label>
                <div className="hero__search-input-wrapper">
                  <MapPin 
                    size={20} 
                    className="hero__search-icon"
                    aria-hidden="true"
                  />
                  <input
                    id="location"
                    type="text"
                    className="hero__search-input"
                    placeholder={t('search.location.placeholder', 'City, state, or zipcode')}
                    aria-describedby="location-help"
                  />
                </div>
              </div>

              <div className="hero__search-group">
                <label className="hero__search-label" htmlFor="insurance">
                  {t('search.insurance.label', 'Insurance carrier')}
                </label>
                <div className="hero__search-input-wrapper">
                  <CreditCard 
                    size={20} 
                    className="hero__search-icon"
                    aria-hidden="true"
                  />
                  <input
                    id="insurance"
                    type="text"
                    className="hero__search-input"
                    placeholder={t('search.insurance.placeholder', 'Insurance carrier')}
                    aria-describedby="insurance-help"
                  />
                </div>
              </div>

              <div className="hero__search-group">
                <button type="submit" className="btn btn--primary hero__search-button">
                  {t('search.findNow', 'Find now')}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hero__images">
          {/* Desktop Grid */}
          <div className="hero__images-grid">
            {images.map((image, index) => (
              <div key={index} className="hero__image">
                <picture>
                  <source srcSet={image.webp} type="image/webp" />
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </picture>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="hero__carousel">
            <Suspense fallback={<LoadingSpinner />}>
              <ImageCarousel images={images} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;