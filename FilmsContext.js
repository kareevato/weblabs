import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFilms as fetchFilms, getFilmById as fetchFilmById } from '../services/api';

const FilmsContext = createContext();

export function FilmsProvider({ children }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilms = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFilms();
        setFilms(data);
      } catch (err) {
        console.error('Error loading films:', err);
        setError(err.message || 'Failed to load films');
        setFilms([]);
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  const getFilmById = async (id) => {
    try {
      const cachedFilm = films.find(film => film.id === parseInt(id));
      if (cachedFilm) {
        return cachedFilm;
      }
      
      const film = await fetchFilmById(id);
      return film;
    } catch (err) {
      console.error(`Error fetching film with id ${id}:`, err);
      return null;
    }
  };

  const refreshFilms = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFilms(filters);
      setFilms(data);
    } catch (err) {
      console.error('Error refreshing films:', err);
      setError(err.message || 'Failed to refresh films');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FilmsContext.Provider value={{ films, loading, error, getFilmById, refreshFilms }}>
      {children}
    </FilmsContext.Provider>
  );
}

export function useFilms() {
  const context = useContext(FilmsContext);
  if (!context) {
    throw new Error('useFilms must be used within FilmsProvider');
  }
  return context;
}

