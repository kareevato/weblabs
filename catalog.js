import React from 'react';
import { useFilms } from '../../contexts/FilmsContext';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import Select from '../../components/Select/select';
import './catalog.css';

export default function Catalog() {
  const { films, loading } = useFilms();

  if (loading) {
    return <div className="loading">Завантаження...</div>;
  }

  if (!films || films.length === 0) {
    return <div className="loading">Фільми не знайдено</div>;
  }

  // Get unique genres, years, ratings for filters (UI only, no functionality)
  const genres = [...new Set(films.map(f => f.genre))].sort();
  const years = [...new Set(films.map(f => f.year))].sort((a, b) => b - a);
  const ratings = ['7+', '8+', '8.5+', '9+'];

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Каталог фільмів</h1>
      </div>

      <div className="filters-section">
        <div className="filter-row">
          <Select
            options={genres}
            placeholder="Всі жанри"
            className="filter-select"
          />
          <Select
            options={years}
            placeholder="Всі роки"
            className="filter-select"
          />
          <Select
            options={ratings}
            placeholder="Всі рейтинги"
            className="filter-select"
          />
          <PrimaryButton variant="secondary">
            Apply
          </PrimaryButton>
        </div>
      </div>

      <div className="films-grid">
        {films.map((film) => (
          <div key={film.id} className="film-card">
            <div className="film-card-image">
              <img 
                src={film.image} 
                alt={film.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                }}
              />
            </div>
            <div className="film-card-content">
              <h3 className="film-card-title">{film.name}</h3>
              <p className="film-card-description">
                {film.genre} • {film.year} • ⭐ {film.rating}
              </p>
              <p className="film-card-price">Ціна: {film.price} грн</p>
              <PrimaryButton className="view-more-btn">View more</PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
