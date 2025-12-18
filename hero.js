import React from 'react';
import './hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content-card">
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=800&fit=crop" alt="Cinema" />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">Відкрийте світ кіно</h1>
          <p className="hero-description">
            Виберіть фільми, які підкреслить ваш стиль і стануть справжнім символом індивідуальності. Ми пропонуємо тільки сертифіковані шедеври найвищої якості – від класики до сучасності.
          </p>
          <p className="hero-description">
            Кожен фільм проходить експертну оцінку та має унікальний рейтинг. Ціни стартують від <strong>199 грн</strong> залежно від жанру, рейтингу та якості.
          </p>
        </div>
      </div>
    </section>
  );
}

