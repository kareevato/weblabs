import React, { useState } from 'react';
import { featuresViewMore } from '../../services/api';
import './features.css';

export default function Features() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    { image: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg', title: 'Dune', description: 'Епічна науково-фантастична сага про виживання на пустельній планеті. Starting at 319 грн.' },
    { image: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg', title: 'Oppenheimer', description: 'Біографічна драма про створення атомної бомби. Starting at 349 грн.' },
    { image: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg', title: 'Avatar', description: 'Науково-фантастичний блокбастер про пандору. Starting at 259 грн.' }
  ];

  const additionalContent = [
    { heading: 'Величезна колекція', text: 'Наш каталог налічує понад 1000 унікальних фільмів різних жанрів. Від класичних шедеврів до сучасних блокбастерів - ми маємо все для справжніх кіноманів.' },
    { heading: 'Гарантія якості', text: 'Кожен фільм проходить ретельну перевірку перед додаванням до каталогу. Ми гарантуємо високу якість зображення та звуку для вашого максимального комфорту.' },
    { heading: 'Ексклюзивні пропозиції', text: 'Регулярно додаємо новинки та пропонуємо спеціальні знижки на популярні фільми. Стежте за нашими оновленнями та не пропустіть вигідні пропозиції!' }
  ];

  return (
    <section className="features">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="card-image">
              <img src={feature.image} alt={feature.title} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {showMore && (
        <div className="additional-content">
          {additionalContent.map((item, index) => (
            <div key={index} className="additional-item">
              <h3>{item.heading}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="features-actions">
        <button 
          className="view-more-btn"
          onClick={async () => {
            const newState = !showMore;
            try {
              await featuresViewMore(newState ? 'show' : 'hide');
              setShowMore(newState);
            } catch (error) {
              console.error('Error in features view more:', error);
              setShowMore(newState);
            }
          }}
        >
          {showMore ? 'Show less' : 'View more'}
        </button>
      </div>
    </section>
  );
}
