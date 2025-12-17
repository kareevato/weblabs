import React, { createContext, useState, useContext } from 'react';

const FilmsContext = createContext();

// Static films data
const staticFilms = [
  { id: 2, name: "Interstellar", genre: "Sci-Fi", year: 2014, duration: 169, rating: 8.6, price: 329, views: 1250000 },
  { id: 3, name: "Tenet", genre: "Action", year: 2020, duration: 150, rating: 7.3, price: 279, views: 890000 },
  { id: 4, name: "Oppenheimer", genre: "Biography", year: 2023, duration: 180, rating: 8.7, price: 349, views: 2100000 },
  { id: 5, name: "Dune", genre: "Adventure", year: 2021, duration: 155, rating: 8.1, price: 319, views: 1800000 },
  { id: 6, name: "Avatar", genre: "Fantasy", year: 2009, duration: 162, rating: 7.8, price: 259, views: 3500000 },
  { id: 7, name: "Matrix", genre: "Sci-Fi", year: 1999, duration: 136, rating: 8.7, price: 199, views: 2800000 },
  { id: 8, name: "Joker", genre: "Drama", year: 2019, duration: 122, rating: 8.5, price: 279, views: 1950000 },
  { id: 9, name: "The Batman", genre: "Action", year: 2022, duration: 176, rating: 7.9, price: 299, views: 1650000 },
  { id: 10, name: "Fight Club", genre: "Drama", year: 1999, duration: 139, rating: 8.8, price: 219, views: 2200000 },
  { id: 11, name: "Shutter Island", genre: "Thriller", year: 2010, duration: 138, rating: 8.2, price: 249, views: 1100000 },
  { id: 12, name: "Barbie", genre: "Comedy", year: 2023, duration: 114, rating: 7.0, price: 229, views: 3200000 },
  { id: 13, name: "Whiplash", genre: "Drama", year: 2014, duration: 107, rating: 8.5, price: 239, views: 750000 },
  { id: 14, name: "The Social Network", genre: "Biography", year: 2010, duration: 120, rating: 7.8, price: 199, views: 980000 },
  { id: 15, name: "Inglourious Basterds", genre: "War", year: 2009, duration: 153, rating: 8.3, price: 269, views: 1400000 }
];

// Map film names to poster images
const filmImages = {
  'Interstellar': 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
  'Tenet': 'https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg',
  'Oppenheimer': 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
  'Dune': 'https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg',
  'Avatar': 'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg',
  'Matrix': 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
  'Joker': 'https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg',
  'The Batman': 'https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_%28film%29_poster.jpg',
  'Fight Club': 'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
  'Shutter Island': 'https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg',
  'Barbie': 'https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg',
  'Whiplash': 'https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg',
  'The Social Network': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Social_network_film_poster.jpg',
  'Inglourious Basterds': 'https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg'
};

const addImagesToFilms = (films) => {
  return films.map(film => ({
    ...film,
    image: filmImages[film.name] || 'https://via.placeholder.com/300x400?text=No+Image'
  }));
};

export function FilmsProvider({ children }) {
  const [films] = useState(() => {
    return addImagesToFilms(staticFilms);
  });
  const loading = false;

  const getFilmById = (id) => {
    return films.find(film => film.id === parseInt(id));
  };

  return (
    <FilmsContext.Provider value={{ films, loading, getFilmById }}>
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


