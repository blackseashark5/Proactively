import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Activity, Moon, Brain, Users, Shield } from 'lucide-react';

interface PillarCard {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: {
    icon: React.ReactNode;
    text: string;
    variant: string;
  };
}

const Pillars: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nutrition');
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = [
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'activity', label: 'Physical activity' },
    { id: 'sleep', label: 'Restorative sleep' },
    { id: 'stress', label: 'Stress management' },
    { id: 'social', label: 'Social connection' },
    { id: 'substance', label: 'Substance abuse' },
  ];

  const pillarData: Record<string, PillarCard[]> = {
    nutrition: [
      {
        id: 'nutrition-1',
        title: 'Nutrition',
        description: 'Evidence supports the use of a whole food, plant-predominant diet to prevent, treat and reverse chronic illness.',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Heart size={12} />,
          text: '121/80 mmHg',
          variant: 'nutrition'
        }
      },
      {
        id: 'nutrition-2',
        title: 'Meal Planning',
        description: 'Structured meal planning helps maintain consistent nutrition and supports long-term health goals.',
        image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Heart size={12} />,
          text: '2000 kcal',
          variant: 'nutrition'
        }
      },
      {
        id: 'nutrition-3',
        title: 'Mindful Eating',
        description: 'Practice mindful eating techniques to improve digestion and build a healthier relationship with food.',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500',
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
        title: 'Physical activity',
        description: 'Regular physical activity is key to managing weight, improving mental health, and reducing risk of chronic disease.',
        image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Activity size={12} />,
          text: '32 minutes',
          variant: 'activity'
        }
      },
      {
        id: 'activity-2',
        title: 'Strength Training',
        description: 'Build muscle mass and bone density through regular resistance training exercises.',
        image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Activity size={12} />,
          text: '3x weekly',
          variant: 'activity'
        }
      },
      {
        id: 'activity-3',
        title: 'Flexibility',
        description: 'Maintain mobility and prevent injury through regular stretching and flexibility work.',
        image: 'https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=500',
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
        title: 'Restorative sleep',
        description: 'Consistent, quality sleep plays a vital role in both physical and mental health.',
        image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Moon size={12} />,
          text: '8 hours',
          variant: 'sleep'
        }
      },
      {
        id: 'sleep-2',
        title: 'Sleep Hygiene',
        description: 'Develop healthy sleep habits and create an optimal sleep environment.',
        image: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Moon size={12} />,
          text: '10 PM',
          variant: 'sleep'
        }
      },
      {
        id: 'sleep-3',
        title: 'Sleep Recovery',
        description: 'Monitor and improve sleep quality to enhance physical and mental recovery.',
        image: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=500',
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
        title: 'Stress management',
        description: 'Effective stress management techniques help reduce cortisol levels and improve overall well-being.',
        image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Brain size={12} />,
          text: '20 min',
          variant: 'stress'
        }
      },
      {
        id: 'stress-2',
        title: 'Meditation',
        description: 'Practice mindfulness meditation to reduce stress and improve mental clarity.',
        image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Brain size={12} />,
          text: 'Daily',
          variant: 'stress'
        }
      },
      {
        id: 'stress-3',
        title: 'Breathing Techniques',
        description: 'Learn breathing exercises to activate the parasympathetic nervous system.',
        image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500',
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
        title: 'Social connection',
        description: 'Strong social connections are associated with a lower risk of many chronic diseases and enhanced mental health.',
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Users size={12} />,
          text: 'Feeling',
          variant: 'social'
        }
      },
      {
        id: 'social-2',
        title: 'Community Support',
        description: 'Engage with community groups and support networks for better health outcomes.',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Users size={12} />,
          text: 'Weekly',
          variant: 'social'
        }
      },
      {
        id: 'social-3',
        title: 'Family Time',
        description: 'Prioritize quality time with family and loved ones for emotional well-being.',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=500',
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
        title: 'Substance abuse',
        description: 'Avoiding tobacco, limiting alcohol use, and abstaining from harmful substances are vital for long-term health.',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Shield size={12} />,
          text: '42 days',
          variant: 'substance'
        }
      },
      {
        id: 'substance-2',
        title: 'Recovery Support',
        description: 'Access professional support and resources for substance abuse recovery.',
        image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Shield size={12} />,
          text: '24/7',
          variant: 'substance'
        }
      },
      {
        id: 'substance-3',
        title: 'Healthy Alternatives',
        description: 'Replace harmful substances with healthy coping mechanisms and activities.',
        image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=500',
        badge: {
          icon: <Shield size={12} />,
          text: 'Success',
          variant: 'substance'
        }
      }
    ]
  };

  const currentCards = pillarData[activeTab] || [];
  const maxSlides = Math.max(0, currentCards.length - 3);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentSlide(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(Math.max(0, currentSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(Math.min(maxSlides, currentSlide + 1));
  };

  return (
    <section className="pillars">
      <div className="container pillars__container">
        <h2 className="pillars__title">HOW IT WORKS</h2>
        <h3 className="pillars__subtitle">
          <span className="highlight">Lifestyle as medicine</span>: The six pillars
        </h3>

        <div className="pillars__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pillars__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pillars__content">
          <div className="pillars__cards active">
            {currentCards.slice(currentSlide, currentSlide + 3).map((card) => (
              <div key={card.id} className="pillars__card">
                <div className="pillars__card-image">
                  <img src={card.image} alt={card.title} />
                  <div className={`pillars__card-badge pillars__card-badge--${card.badge.variant}`}>
                    {card.badge.icon}
                    {card.badge.text}
                  </div>
                </div>
                <div className="pillars__card-content">
                  <h4 className="pillars__card-title">{card.title}</h4>
                  <p className="pillars__card-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          {currentCards.length > 3 && (
            <div className="pillars__navigation">
              <button
                className="pillars__nav-button"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous cards"
              >
                <ChevronLeft />
              </button>
              <button
                className="pillars__nav-button"
                onClick={handleNextSlide}
                disabled={currentSlide >= maxSlides}
                aria-label="Next cards"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pillars;