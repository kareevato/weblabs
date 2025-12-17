const db = require('../database/db');
const Film = require('../models/Film');

// Sample films data
const filmsData = [
  {
    name: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    duration: 169,
    rating: 8.6,
    price: 329,
    views: 1250000,
    image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
  },
  {
    name: "Tenet",
    genre: "Action",
    year: 2020,
    duration: 150,
    rating: 7.3,
    price: 279,
    views: 890000,
    image: "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg"
  },
  {
    name: "Oppenheimer",
    genre: "Biography",
    year: 2023,
    duration: 180,
    rating: 8.7,
    price: 349,
    views: 2100000,
    image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg"
  },
  {
    name: "Dune",
    genre: "Adventure",
    year: 2021,
    duration: 155,
    rating: 8.1,
    price: 319,
    views: 1800000,
    image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg"
  },
  {
    name: "Avatar",
    genre: "Fantasy",
    year: 2009,
    duration: 162,
    rating: 7.8,
    price: 259,
    views: 3500000,
    image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg"
  },
  {
    name: "Matrix",
    genre: "Sci-Fi",
    year: 1999,
    duration: 136,
    rating: 8.7,
    price: 199,
    views: 2800000,
    image: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
  },
  {
    name: "Joker",
    genre: "Drama",
    year: 2019,
    duration: 122,
    rating: 8.5,
    price: 279,
    views: 1950000,
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg"
  },
  {
    name: "The Batman",
    genre: "Action",
    year: 2022,
    duration: 176,
    rating: 7.9,
    price: 299,
    views: 1650000,
    image: "https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_%28film%29_poster.jpg"
  },
  {
    name: "Fight Club",
    genre: "Drama",
    year: 1999,
    duration: 139,
    rating: 8.8,
    price: 219,
    views: 2200000,
    image: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg"
  },
  {
    name: "Shutter Island",
    genre: "Thriller",
    year: 2010,
    duration: 138,
    rating: 8.2,
    price: 249,
    views: 1100000,
    image: "https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg"
  },
  {
    name: "Barbie",
    genre: "Comedy",
    year: 2023,
    duration: 114,
    rating: 7.0,
    price: 229,
    views: 3200000,
    image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg"
  },
  {
    name: "Whiplash",
    genre: "Drama",
    year: 2014,
    duration: 107,
    rating: 8.5,
    price: 239,
    views: 750000,
    image: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg"
  },
  {
    name: "The Social Network",
    genre: "Biography",
    year: 2010,
    duration: 120,
    rating: 7.8,
    price: 199,
    views: 980000,
    image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Social_network_film_poster.jpg"
  },
  {
    name: "Inglourious Basterds",
    genre: "War",
    year: 2009,
    duration: 153,
    rating: 8.3,
    price: 269,
    views: 1400000,
    image: "https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg"
  }
];

// Seed database
const seedDatabase = async () => {
  try {
    console.log('Seeding database...');
    
    // Check if films already exist
    const existingFilms = await Film.findAll();
    if (existingFilms.length > 0) {
      console.log(`Database already contains ${existingFilms.length} films.`);
      console.log('Skipping seed. To reseed, delete database.sqlite and run seed again.');
      process.exit(0);
    }

    // Insert films
    for (const filmData of filmsData) {
      await Film.create(filmData);
      console.log(`Inserted: ${filmData.name}`);
    }

    console.log(`Successfully seeded ${filmsData.length} films!`);
    
    // Close database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
        process.exit(1);
      } else {
        console.log('Database connection closed');
        process.exit(0);
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    db.close();
    process.exit(1);
  }
};

// Run seed
seedDatabase();

