import React, { useState, useEffect } from 'react';
import { useFilms } from '../../contexts/FilmsContext';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import Select from '../../components/Select/select';
import Spinner from '../../components/Spinner/spinner';
import { getFilms, getFilmDetails, selectChange } from '../../services/api';
import './catalog.css';

export default function Catalog() {
  const [films, setFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const searchQuery = searchParams.get('search') || '';
  const filterGenre = searchParams.get('genre') || '';
  const filterYear = searchParams.get('year') || '';
  const filterRating = searchParams.get('rating') || '';

  
  useEffect(() => {
    const loadAllFilms = async () => {
      try {
        const data = await getFilms({});
        setAllFilms(data);
      } catch (error) {
        console.error('Error loading all films:', error);
      }
    };

    loadAllFilms();
  }, []);

  useEffect(() => {
    const loadFilms = async () => {
      try {
        setLoading(true);
        
        const filters = {};
        if (searchQuery) {
          filters.search = searchQuery;
        }
        if (filterGenre) {
          filters.genre = filterGenre;
        }
        if (filterYear) {
          filters.year = filterYear;
        }
        if (filterRating) {
          filters.rating = filterRating;
        }
        
        console.log('Loading films with filters:', filters);
        const data = await getFilms(filters);
        setFilms(data);
      } catch (error) {
        console.error('Error loading films:', error);
        setFilms([]);
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, [searchQuery, filterGenre, filterYear, filterRating]);

  const genres = [...new Set(allFilms.map(f => f.genre))].sort();
  const years = [...new Set(allFilms.map(f => f.year))].sort((a, b) => b - a);
  const ratings = ['7+', '8+', '8.5+', '9+'];

  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams);
    
    Object.keys(updates).forEach(key => {
      if (updates[key]) {
        params.set(key, updates[key]);
      } else {
        params.delete(key);
      }
    });
    
    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    updateFilters({ search: value });
  };

  const handleGenreChange = async (value) => {
    try {
      await selectChange('genre', value);
      updateFilters({ genre: value });
    } catch (error) {
      console.error('Error in genre change:', error);
    updateFilters({ genre: value });
    }
  };

  const handleYearChange = async (value) => {
    try {
      await selectChange('year', value);
    updateFilters({ year: value });
    } catch (error) {
      console.error('Error in year change:', error);
      updateFilters({ year: value }); 
    }
  };

  const handleRatingChange = async (value) => {
    try {
      await selectChange('rating', value);
    updateFilters({ rating: value });
    } catch (error) {
      console.error('Error in rating change:', error);
      updateFilters({ rating: value }); 
    }
  };


  const handleResetFilters = () => {
    setSearchParams({});
  };

  const handleViewMore = async (filmId, e) => {
    e.preventDefault();
    try {
      await getFilmDetails(filmId);
      navigate(`/film/${filmId}`);
    } catch (error) {
      console.error('Error in view more:', error);
      navigate(`/film/${filmId}`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Каталог фільмів</h1>
      </div>

      <div className="filters-section">
        <div className="filter-row">
          <Select
            value={filterGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            options={genres}
            placeholder="Всі жанри"
            className="filter-select"
          />
          <Select
            value={filterYear}
            onChange={(e) => handleYearChange(e.target.value)}
            options={years}
            placeholder="Всі роки"
            className="filter-select"
          />
          <Select
            value={filterRating}
            onChange={(e) => handleRatingChange(e.target.value)}
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
        {films.length === 0 ? (
          <div className="no-results">
            <p>Фільми не знайдено</p>
          </div>
        ) : (
          films.map((film) => (
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
                <p className="film-card-quality">Якість: {film.quality}p</p>
                <p className="film-card-price">Ціна: {film.price} грн</p>
                <PrimaryButton 
                  className="view-more-btn"
                  onClick={(e) => handleViewMore(film.id, e)}
                >
                  View more
                </PrimaryButton>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
