import React from 'react';
import './features.css';

export default function Features() {
  const features = [
    { image: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg', title: 'Dune', description: 'Епічна науково-фантастична сага про виживання на пустельній планеті. Starting at 319 грн.' },
    { image: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg', title: 'Oppenheimer', description: 'Біографічна драма про створення атомної бомби. Starting at 349 грн.' },
    { image: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg', title: 'Avatar', description: 'Науково-фантастичний блокбастер про пандору. Starting at 259 грн.' }
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
      <div className="features-actions">
        <button className="view-more-btn">View more</button>
      </div>
    </section>
  );
}


