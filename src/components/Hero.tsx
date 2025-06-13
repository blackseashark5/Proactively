import React from 'react';
import { Search, MapPin, CreditCard } from 'lucide-react';

const Hero: React.FC = () => {
  const images = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <section className="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Book an appointment with <span className="highlight">lifestyle medicine</span> experts
          </h1>
          <p className="hero__subtitle">
            Optimize your lifestyle and reverse chronic diseases.
          </p>

          <div className="hero__search">
            <form className="hero__search-form" onSubmit={handleSearch}>
              <div className="hero__search-group">
                <label className="hero__search-label" htmlFor="condition">
                  Condition, procedure, specialty...
                </label>
                <div style={{ position: 'relative' }}>
                  <Search 
                    size={20} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-light)' 
                    }} 
                  />
                  <input
                    id="condition"
                    type="text"
                    className="hero__search-input"
                    placeholder="Condition, procedure, specialty..."
                    style={{ paddingLeft: '44px' }}
                  />
                </div>
              </div>

              <div className="hero__search-group">
                <label className="hero__search-label" htmlFor="location">
                  City, state, or zipcode
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin 
                    size={20} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-light)' 
                    }} 
                  />
                  <input
                    id="location"
                    type="text"
                    className="hero__search-input"
                    placeholder="City, state, or zipcode"
                    style={{ paddingLeft: '44px' }}
                  />
                </div>
              </div>

              <div className="hero__search-group">
                <label className="hero__search-label" htmlFor="insurance">
                  Insurance carrier
                </label>
                <div style={{ position: 'relative' }}>
                  <CreditCard 
                    size={20} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-light)' 
                    }} 
                  />
                  <input
                    id="insurance"
                    type="text"
                    className="hero__search-input"
                    placeholder="Insurance carrier"
                    style={{ paddingLeft: '44px' }}
                  />
                </div>
              </div>

              <div className="hero__search-group">
                <button type="submit" className="btn btn--primary hero__search-button">
                  Find now
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hero__images">
          {/* Desktop Grid */}
          <div className="hero__images-grid">
            {images.map((src, index) => (
              <div key={index} className="hero__image">
                <img src={src} alt={`Lifestyle medicine ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="hero__carousel">
            <div className="hero__carousel-container">
              <div className="hero__carousel-track">
                {[...images, ...images].map((src, index) => (
                  <div key={index} className="hero__carousel-item">
                    <img src={src} alt={`Lifestyle medicine ${(index % images.length) + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;