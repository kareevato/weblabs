import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilms } from '../../contexts/FilmsContext';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import './item.css';

export default function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFilmById } = useFilms();

  const film = getFilmById(id);

  if (!film) {
    return (
      <div className="item-page">
        <div className="error-message">
          <p>Фільм не знайдено</p>
          <PrimaryButton onClick={() => navigate('/catalog')}>
            Повернутися до каталогу
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const characteristics = [
    `Жанр: ${film.genre}`,
    `Рік: ${film.year}`
  ];

  return (
    <div className="item-page">
      <div className="item-content">
        <div className="item-image-section">
          <img 
            src={film.image} 
            alt={film.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x700?text=No+Image';
            }}
          />
        </div>
        <div className="item-info-section">
          <div className="characteristics">
            {characteristics.map((char, index) => (
              <span key={index} className={`characteristic ${index === 0 ? 'dark' : 'teal'}`}>
                {index + 1} {char.split(':')[0]}
              </span>
            ))}
          </div>
          
          <h1 className="item-title">{film.name}</h1>
          
          <p className="item-description">
            {film.genre} фільм {film.year} року. Тривалість: {film.duration} хвилин. 
            Рейтинг: ⭐ {film.rating}. Переглянуто {film.views.toLocaleString()} разів.
          </p>
          
          {/* Fields removed per request: show only description, price and actions */}
          
          <div className="item-price">
            Ціна: {film.price} грн
          </div>
          
          <div className="item-actions">
            <PrimaryButton 
              variant="secondary" 
              onClick={() => navigate('/catalog')}
            >
              Go back
            </PrimaryButton>
            <PrimaryButton variant="dark">
              Add to cart
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}


