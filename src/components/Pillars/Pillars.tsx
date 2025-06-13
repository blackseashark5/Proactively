import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Activity, Moon, Brain, Users, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePillarsCarousel } from '../hooks/usePillarsCarousel';

interface PillarCard {
  id: string;
  title: string;
  description: string;
  image: string;
  webp: string;
  badge: {
    icon: React.ReactNode;
    text: string;
    variant: string;
  };
}

const Pillars: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('nutrition');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const tabs = [
    { id: 'nutrition', label: t('pillars.tabs.nutrition', 'Nutrition') },
    { id: 'activity', label: t('pillars.tabs.activity', 'Physical activity') },
    { id: 'sleep', label: t('pillars.tabs.sleep', 'Restorative sleep') },
    { id: 'stress', label: t('pillars.tabs.stress', 'Stress management') },
    { id: 'social', label: t('pillars.tabs.social', 'Social connection') },
    { id: 'substance', label: t('pillars.tabs.substance', 'Substance abuse') },
  ];

  const pillarData: Record<string, PillarCard[]> = {
    nutrition: [
      {
        id: 'nutrition-1',
        title: t('pillars.nutrition.title', 'Nutrition'),
        description: t('pillars.nutrition.description', 'Evidence supports the use of a whole food, plant-predominant diet to prevent, treat and reverse chronic illness.'),
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Heart size={12} />,
          text: '121/80 mmHg',
          variant: 'nutrition'
        }
      },
      {
        id: 'nutrition-2',
        title: t('pillars.mealPlanning.title', 'Meal Planning'),
        description: t('pillars.mealPlanning.description', 'Structured meal planning helps maintain consistent nutrition and supports long-term health goals.'),
        image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Heart size={12} />,
          text: '2000 kcal',
          variant: 'nutrition'
        }
      },
      {
        id: 'nutrition-3',
        title: t('pillars.mindfulEating.title', 'Mindful Eating'),
        description: t('pillars.mindfulEating.description', 'Practice mindful eating techniques to improve digestion and build a healthier relationship with food.'),
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Heart size={12} />,
          text: '15 min',
          variant: 'nutrition'
        }
      }
    ],
    activity: [
      {
        id: 'activity-1',
        title: t('pillars.activity.title', 'Physical activity'),
        description: t('pillars.activity.description', 'Regular physical activity is key to managing weight, improving mental health, and reducing risk of chronic disease.'),
        image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Activity size={12} />,
          text: '32 minutes',
          variant: 'activity'
        }
      },
      {
        id: 'activity-2',
        title: t('pillars.strength.title', 'Strength Training'),
        description: t('pillars.strength.description', 'Build muscle mass and bone density through regular resistance training exercises.'),
        image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Activity size={12} />,
          text: '3x weekly',
          variant: 'activity'
        }
      },
      {
        id: 'activity-3',
        title: t('pillars.flexibility.title', 'Flexibility'),
        description: t('pillars.flexibility.description', 'Maintain mobility and prevent injury through regular stretching and flexibility work.'),
        image: 'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Activity size={12} />,
          text: '10 min daily',
          variant: 'activity'
        }
      }
    ],
    sleep: [
      {
        id: 'sleep-1',
        title: t('pillars.sleep.title', 'Restorative sleep'),
        description: t('pillars.sleep.description', 'Consistent, quality sleep plays a vital role in both physical and mental health.'),
        image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Moon size={12} />,
          text: '8 hours',
          variant: 'sleep'
        }
      },
      {
        id: 'sleep-2',
        title: t('pillars.sleepHygiene.title', 'Sleep Hygiene'),
        description: t('pillars.sleepHygiene.description', 'Develop healthy sleep habits and create an optimal sleep environment.'),
        image: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Moon size={12} />,
          text: '10 PM',
          variant: 'sleep'
        }
      },
      {
        id: 'sleep-3',
        title: t('pillars.sleepRecovery.title', 'Sleep Recovery'),
        description: t('pillars.sleepRecovery.description', 'Monitor and improve sleep quality to enhance physical and mental recovery.'),
        image: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Moon size={12} />,
          text: '90% quality',
          variant: 'sleep'
        }
      }
    ],
    stress: [
      {
        id: 'stress-1',
        title: t('pillars.stress.title', 'Stress management'),
        description: t('pillars.stress.description', 'Effective stress management techniques help reduce cortisol levels and improve overall well-being.'),
        image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Brain size={12} />,
          text: '20 min',
          variant: 'stress'
        }
      },
      {
        id: 'stress-2',
        title: t('pillars.meditation.title', 'Meditation'),
        description: t('pillars.meditation.description', 'Practice mindfulness meditation to reduce stress and improve mental clarity.'),
        image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Brain size={12} />,
          text: 'Daily',
          variant: 'stress'
        }
      },
      {
        id: 'stress-3',
        title: t('pillars.breathing.title', 'Breathing Techniques'),
        description: t('pillars.breathing.description', 'Learn breathing exercises to activate the parasympathetic nervous system.'),
        image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Brain size={12} />,
          text: '4-7-8',
          variant: 'stress'
        }
      }
    ],
    social: [
      {
        id: 'social-1',
        title: t('pillars.social.title', 'Social connection'),
        description: t('pillars.social.description', 'Strong social connections are associated with a lower risk of many chronic diseases and enhanced mental health.'),
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Users size={12} />,
          text: 'Feeling',
          variant: 'social'
        }
      },
      {
        id: 'social-2',
        title: t('pillars.community.title', 'Community Support'),
        description: t('pillars.community.description', 'Engage with community groups and support networks for better health outcomes.'),
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Users size={12} />,
          text: 'Weekly',
          variant: 'social'
        }
      },
      {
        id: 'social-3',
        title: t('pillars.family.title', 'Family Time'),
        description: t('pillars.family.description', 'Prioritize quality time with family and loved ones for emotional well-being.'),
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Users size={12} />,
          text: '2+ hours',
          variant: 'social'
        }
      }
    ],
    substance: [
      {
        id: 'substance-1',
        title: t('pillars.substance.title', 'Substance abuse'),
        description: t('pillars.substance.description', 'Avoiding tobacco, limiting alcohol use, and abstaining from harmful substances are vital for long-term health.'),
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Shield size={12} />,
          text: '42 days',
          variant: 'substance'
        }
      },
      {
        id: 'substance-2',
        title: t('pillars.recovery.title', 'Recovery Support'),
        description: t('pillars.recovery.description', 'Access professional support and resources for substance abuse recovery.'),
        image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Shield size={12} />,
          text: '24/7',
          variant: 'substance'
        }
      },
      {
        id: 'substance-3',
        title: t('pillars.alternatives.title', 'Healthy Alternatives'),
        description: t('pillars.alternatives.description', 'Replace harmful substances with healthy coping mechanisms and activities.'),
        image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=500',
        webp: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=500&fm=webp',
        badge: {
          icon: <Shield size={12} />,
          text: 'Success',
          variant: 'substance'
        }
      }
    ]
  };

  const currentCards = pillarData[activeTab] || [];
  const { currentSlide, handlePrevSlide, handleNextSlide, maxSlides, resetSlide } = usePillarsCarousel(currentCards.length);

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return;
    
    setAutoAdvanceEnabled(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(tabId);
      resetSlide();
      setIsTransitioning(false);
      setAutoAdvanceEnabled(true);
    }, 300);
  };

  // Auto-advance tabs every 5 seconds
  useEffect(() => {
    if (!autoAdvanceEnabled) return;

    autoAdvanceRef.current = setInterval(() => {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      handleTabClick(tabs[nextIndex].id);
    }, 5000);

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
    };
  }, [activeTab, autoAdvanceEnabled, tabs]);

  // Pause auto-advance on hover
  const handleMouseEnter = () => setAutoAdvanceEnabled(false);
  const handleMouseLeave = () => setAutoAdvanceEnabled(true);

  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (tabsRef.current?.contains(event.target as Node)) {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
          event.preventDefault();
          handleTabClick(tabs[currentIndex - 1].id);
        } else if (event.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
          event.preventDefault();
          handleTabClick(tabs[currentIndex + 1].id);
        }
      }
      
      if (carouselRef.current?.contains(event.target as Node)) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          handlePrevSlide();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          handleNextSlide();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, tabs, handlePrevSlide, handleNextSlide]);

  return (
    <section 
      className="pillars"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container pillars__container">
        <h2 className="pillars__title">
          {t('pillars.howItWorks', 'HOW IT WORKS')}
        </h2>
        <h3 className="pillars__subtitle">
          <span className="highlight">
            {t('pillars.lifestyleMedicine', 'Lifestyle as medicine')}
          </span>
          : {t('pillars.sixPillars', 'The six pillars')}
        </h3>

        <div 
          className="pillars__tabs" 
          ref={tabsRef}
          role="tablist"
          aria-label="Lifestyle medicine pillars"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pillars__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`pillar-panel-${tab.id}`}
              id={`pillar-tab-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pillars__content">
          <div 
            className={`pillars__cards ${!isTransitioning ? 'active' : ''}`}
            id={`pillar-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`pillar-tab-${activeTab}`}
            ref={carouselRef}
          >
            {currentCards.slice(currentSlide, currentSlide + 3).map((card) => (
              <article key={card.id} className="pillars__card">
                <div className="pillars__card-image">
                  <picture>
                    <source srcSet={card.webp} type="image/webp" />
                    <img src={card.image} alt={card.title} loading="lazy" />
                  </picture>
                  <div className={`pillars__card-badge pillars__card-badge--${card.badge.variant}`}>
                    {card.badge.icon}
                    {card.badge.text}
                  </div>
                </div>
                <div className="pillars__card-content">
                  <h4 className="pillars__card-title">{card.title}</h4>
                  <p className="pillars__card-description">{card.description}</p>
                </div>
              </article>
            ))}
          </div>

          {currentCards.length > 3 && (
            <div className="pillars__navigation" role="group" aria-label="Carousel navigation">
              <button
                className="pillars__nav-button"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous cards"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                className="pillars__nav-button"
                onClick={handleNextSlide}
                disabled={currentSlide >= maxSlides}
                aria-label="Next cards"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pillars;