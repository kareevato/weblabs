import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getViewMore } from '../../services/api';
import PrimaryButton from '../PrimaryButton/primaryButton';
import './hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleViewMore = async () => {
    console.log('View more button clicked!');
    try {
      setLoading(true);
      const data = await getViewMore();
      console.log('View more response:', data);
      console.log('Films loaded:', data.films);
      console.log('Number of films:', data.count);
      navigate('/catalog');
    } catch (error) {
      console.error('Error loading films:', error);
      console.error('Error details:', error.response || error.message);
      navigate('/catalog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content-card">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80"
            alt="Кінозал з екраном"
          />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">Відкрийте світ кіно</h1>
          <p className="hero-description">
            Виберіть фільми, які підкреслить ваш стиль і стануть справжнім символом індивідуальності. Ми пропонуємо тільки сертифіковані шедеври найвищої якості – від класики до сучасності.
          </p>
          <p className="hero-description">
            Кожен фільм проходить експертну оцінку та має унікальний рейтинг. Ціни стартують від <strong>199 грн</strong> залежно від жанру, рейтингу та якості.
          </p>
          <div className="hero-actions">
            <PrimaryButton 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked, calling handleViewMore');
                handleViewMore();
              }}
              disabled={loading}
            >
              {loading ? 'Завантаження...' : 'View more'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

