import React, { useState, useEffect } from 'react';
import { useFilms } from '../../contexts/FilmsContext';
import { Link, useSearchParams } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import Select from '../../components/Select/select';
import './catalog.css';

export default function Catalog() {
  const { films, loading } = useFilms();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterRating, setFilterRating] = useState('');

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  if (loading) {
    return <div className="loading">Завантаження...</div>;
  }

  const genres = [...new Set(films.map(f => f.genre))].sort();
  const years = [...new Set(films.map(f => f.year))].sort((a, b) => b - a);
  const ratings = ['7+', '8+', '8.5+', '9+'];

  let filteredFilms = films.filter(film => {
    const matchesSearch = !searchQuery || 
      film.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = !filterGenre || film.genre === filterGenre;
    const matchesYear = !filterYear || film.year.toString() === filterYear;
    
    let matchesRating = true;
    if (filterRating) {
      const minRating = parseFloat(filterRating.replace('+', ''));
      matchesRating = film.rating >= minRating;
    }

    return matchesSearch && matchesGenre && matchesYear && matchesRating;
  });

  const handleResetFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setFilterGenre('');
    setFilterYear('');
    setFilterRating('');
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Каталог фільмів</h1>
      </div>

      <div className="filters-section">
        <div className="filter-row">
          <Select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            options={genres}
            placeholder="Всі жанри"
            className="filter-select"
          />
          <Select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            options={years}
            placeholder="Всі роки"
            className="filter-select"
          />
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            options={ratings}
            placeholder="Всі рейтинги"
            className="filter-select"
          />
          <PrimaryButton onClick={handleResetFilters} variant="secondary">
            Скинути
          </PrimaryButton>
        </div>
      </div>

      <div className="films-grid">
        {filteredFilms.length === 0 ? (
          <div className="no-results">
            <p>Фільми не знайдено</p>
          </div>
        ) : (
          filteredFilms.map((film) => (
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
                <Link to={`/film/${film.id}`}>
                  <PrimaryButton className="view-more-btn">View more</PrimaryButton>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
