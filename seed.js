const db = require('../database/db');
const Film = require('../models/Film');

const qualityMultipliers = {
  720: 1.0,
  1080: 1.3,
  1440: 1.6,
  2160: 2.0
};

const calculatePrice = (basePrice, quality) => {
  return Math.round(basePrice * qualityMultipliers[quality]);
};

const filmsData = [
  {
    name: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    duration: 169,
    rating: 8.6,
    basePrice: 250, 
    quality: 2160, 
    views: 1250000,
    image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
  },
  {
    name: "Tenet",
    genre: "Action",
    year: 2020,
    duration: 150,
    rating: 7.3,
    basePrice: 215,
    quality: 1440, 
    views: 890000,
    image: "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg"
  },
  {
    name: "Oppenheimer",
    genre: "Biography",
    year: 2023,
    duration: 180,
    rating: 8.7,
    basePrice: 175,
    quality: 2160, 
    views: 2100000,
    image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg"
  },
  {
    name: "Dune",
    genre: "Adventure",
    year: 2021,
    duration: 155,
    rating: 8.1,
    basePrice: 200,
    quality: 2160, 
    views: 1800000,
    image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg"
  },
  {
    name: "Avatar",
    genre: "Fantasy",
    year: 2009,
    duration: 162,
    rating: 7.8,
    basePrice: 200,
    quality: 2160, 
    views: 3500000,
    image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg"
  },
  {
    name: "Matrix",
    genre: "Sci-Fi",
    year: 1999,
    duration: 136,
    rating: 8.7,
    basePrice: 150,
    quality: 1080, 
    views: 2800000,
    image: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
  },
  {
    name: "Joker",
    genre: "Drama",
    year: 2019,
    duration: 122,
    rating: 8.5,
    basePrice: 215,
    quality: 1440, 
    views: 1950000,
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg"
  },
  {
    name: "The Batman",
    genre: "Action",
    year: 2022,
    duration: 176,
    rating: 7.9,
    basePrice: 230,
    quality: 2160, 
    views: 1650000,
    image: "https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_%28film%29_poster.jpg"
  },
  {
    name: "Fight Club",
    genre: "Drama",
    year: 1999,
    duration: 139,
    rating: 8.8,
    basePrice: 169,
    quality: 1080, 
    views: 2200000,
    image: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg"
  },
  {
    name: "Shutter Island",
    genre: "Thriller",
    year: 2010,
    duration: 138,
    rating: 8.2,
    basePrice: 192,
    quality: 1080, 
    views: 1100000,
    image: "https://upload.wikimedia.org/wikipedia/en/7/76/Shutterislandposter.jpg"
  },
  {
    name: "Barbie",
    genre: "Comedy",
    year: 2023,
    duration: 114,
    rating: 7.0,
    basePrice: 176,
    quality: 1440, 
    views: 3200000,
    image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg"
  },
  {
    name: "Whiplash",
    genre: "Drama",
    year: 2014,
    duration: 107,
    rating: 8.5,
    basePrice: 184,
    quality: 720, 
    views: 750000,
    image: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg"
  },
  {
    name: "The Social Network",
    genre: "Biography",
    year: 2010,
    duration: 120,
    rating: 7.8,
    basePrice: 153,
    quality: 720, 
    views: 980000,
    image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Social_network_film_poster.jpg"
  },
  {
    name: "Inglourious Basterds",
    genre: "War",
    year: 2009,
    duration: 153,
    rating: 8.3,
    basePrice: 207,
    quality: 1080, 
    views: 1400000,
    image: "https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg"
  },
  {
    name: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    duration: 148,
    rating: 8.8,
    basePrice: 240,
    quality: 2160, 
    views: 3200000,
    image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
  },
  {
    name: "The Dark Knight",
    genre: "Action",
    year: 2008,
    duration: 152,
    rating: 9.0,
    basePrice: 220,
    quality: 2160, 
    views: 4500000,
    image: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg"
  },
  {
    name: "Pulp Fiction",
    genre: "Crime",
    year: 1994,
    duration: 154,
    rating: 8.9,
    basePrice: 180,
    quality: 1080, 
    views: 2800000,
    image: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg"
  },
  {
    name: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    duration: 142,
    rating: 9.3,
    basePrice: 190,
    quality: 1080, 
    views: 3800000,
    image: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
  },
  {
    name: "Forrest Gump",
    genre: "Drama",
    year: 1994,
    duration: 142,
    rating: 8.8,
    basePrice: 175,
    quality: 1080, 
    views: 2900000,
    image: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"
  },
  {
    name: "The Godfather",
    genre: "Crime",
    year: 1972,
    duration: 175,
    rating: 9.2,
    basePrice: 200,
    quality: 1080, 
    views: 4200000,
    image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
  },
  {
    name: "Gladiator",
    genre: "Action",
    year: 2000,
    duration: 155,
    rating: 8.5,
    basePrice: 195,
    quality: 1440, 
    views: 2100000,
    image: "https://upload.wikimedia.org/wikipedia/en/8/8d/Gladiator_ver1.jpg"
  },
  {
    name: "Titanic",
    genre: "Romance",
    year: 1997,
    duration: 194,
    rating: 7.9,
    basePrice: 185,
    quality: 1440, 
    views: 5500000,
    image: "https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png"
  },
  {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy",
    year: 2001,
    duration: 178,
    rating: 8.8,
    basePrice: 210,
    quality: 2160, 
    views: 3400000,
    image: "https://upload.wikimedia.org/wikipedia/en/8/87/Ringstrilogyposter.jpg"
  },
  {
    name: "Blade Runner 2049",
    genre: "Sci-Fi",
    year: 2017,
    duration: 164,
    rating: 8.0,
    basePrice: 225,
    quality: 2160, 
    views: 1800000,
    image: "https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png"
  },
  {
    name: "Mad Max: Fury Road",
    genre: "Action",
    year: 2015,
    duration: 120,
    rating: 8.1,
    basePrice: 205,
    quality: 2160, 
    views: 1950000,
    image: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg"
  },
  {
    name: "Parasite",
    genre: "Thriller",
    year: 2019,
    duration: 132,
    rating: 8.5,
    basePrice: 218,
    quality: 1440, 
    views: 1600000,
    image: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png"
  },
  {
    name: "1917",
    genre: "War",
    year: 2019,
    duration: 119,
    rating: 8.2,
    basePrice: 212,
    quality: 2160, 
    views: 1450000,
    image: "https://upload.wikimedia.org/wikipedia/en/f/fe/1917_%282019%29_Film_Poster.jpg"
  },
  {
    name: "La La Land",
    genre: "Musical",
    year: 2016,
    duration: 128,
    rating: 8.0,
    basePrice: 198,
    quality: 1440, 
    views: 1750000,
    image: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png"
  },
  {
    name: "The Revenant",
    genre: "Adventure",
    year: 2015,
    duration: 156,
    rating: 8.0,
    basePrice: 208,
    quality: 2160, 
    views: 1680000,
    image: "https://upload.wikimedia.org/wikipedia/en/b/b6/The_Revenant_2015_film_poster.jpg"
  },
  {
    name: "Django Unchained",
    genre: "Western",
    year: 2012,
    duration: 165,
    rating: 8.4,
    basePrice: 215,
    quality: 1440, 
    views: 2200000,
    image: "https://upload.wikimedia.org/wikipedia/en/8/8b/Django_Unchained_Poster.jpg"
  },
  {
    name: "The Grand Budapest Hotel",
    genre: "Comedy",
    year: 2014,
    duration: 99,
    rating: 8.1,
    basePrice: 188,
    quality: 1080, 
    views: 1200000,
    image: "https://upload.wikimedia.org/wikipedia/en/a/a6/The_Grand_Budapest_Hotel_Poster.jpg"
  },
  {
    name: "Get Out",
    genre: "Horror",
    year: 2017,
    duration: 104,
    rating: 7.8,
    basePrice: 192,
    quality: 1080, 
    views: 1350000,
    image: "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png"
  },
  {
    name: "Spider-Man: Into the Spider-Verse",
    genre: "Animation",
    year: 2018,
    duration: 117,
    rating: 8.4,
    basePrice: 205,
    quality: 2160, 
    views: 1850000,
    image: "https://upload.wikimedia.org/wikipedia/en/f/f9/Spider-Man_Into_the_Spider-Verse_poster.jpg"
  }
];


const seedDatabase = async () => {
  try {
    console.log('Seeding database...');
    
    const existingFilms = await Film.findAll();
    if (existingFilms.length > 0) {
      console.log(`Database already contains ${existingFilms.length} films.`);
      console.log('Skipping seed. To reseed, delete database.sqlite and run seed again.');
      process.exit(0);
    }

    for (const filmData of filmsData) {
      const price = calculatePrice(filmData.basePrice, filmData.quality);
      const filmToCreate = {
        ...filmData,
        price: price
      };
      delete filmToCreate.basePrice;
      
      await Film.create(filmToCreate);
      console.log(`Inserted: ${filmData.name} - Quality: ${filmData.quality}p, Price: ${price} грн`);
    }

    console.log(`Successfully seeded ${filmsData.length} films!`);
    
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

seedDatabase();

