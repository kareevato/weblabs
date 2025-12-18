// Дані фільмів
const films = [
  { id: 1, name: "Inception", genre: "Sci-Fi", duration: 148, year: 2010, rating: 8.8 },
  { id: 2, name: "Interstellar", genre: "Adventure", duration: 169, year: 2014, rating: 8.6 },
  { id: 3, name: "The Matrix", genre: "Action", duration: 136, year: 1999, rating: 8.7 },
  { id: 4, name: "Pulp Fiction", genre: "Crime", duration: 154, year: 1994, rating: 8.9 },
  { id: 5, name: "The Dark Knight", genre: "Action", duration: 152, year: 2008, rating: 9.0 },
  { id: 6, name: "Fight Club", genre: "Drama", duration: 139, year: 1999, rating: 8.8 },
  { id: 7, name: "Forrest Gump", genre: "Drama", duration: 142, year: 1994, rating: 8.8 },
  { id: 8, name: "The Shawshank Redemption", genre: "Drama", duration: 142, year: 1994, rating: 9.3 }
];

let filteredFilms = [...films];

// DOM елементи
const filmsContainer = document.getElementById('filmsContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const sortOrder = document.getElementById('sortOrder');
const totalDuration = document.getElementById('totalDuration');
const avgRating = document.getElementById('avgRating');
const totalFilms = document.getElementById('totalFilms');

// Рендер фільмів
function renderFilms() {
  filmsContainer.innerHTML = filteredFilms.map(film => `
    <div class="film-card">
      <h3>${film.name}</h3>
      <p><span class="label">Жанр:</span> ${film.genre}</p>
      <p><span class="label">Тривалість:</span> ${film.duration} хв</p>
      <p><span class="label">Рік:</span> ${film.year}</p>
      <p><span class="label">Рейтинг:</span> ⭐ ${film.rating}</p>
    </div>
  `).join('');
  
  updateStats();
}

// Оновлення статистики
function updateStats() {
  // Загальна тривалість (reduce)
  const total = filteredFilms.reduce((sum, film) => sum + film.duration, 0);
  totalDuration.textContent = total;
  
  // Середній рейтинг (reduce)
  const avg = filteredFilms.length > 0 
    ? (filteredFilms.reduce((sum, film) => sum + film.rating, 0) / filteredFilms.length).toFixed(2)
    : 0;
  avgRating.textContent = avg;
  
  // Кількість фільмів
  totalFilms.textContent = filteredFilms.length;
}

// Пошук (filter)
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  filteredFilms = films.filter(film => 
    film.name.toLowerCase().includes(query)
  );
  renderFilms();
});

// Сортування (sort)
function sortFilms() {
  const sortBy = sortSelect.value;
  const order = sortOrder.value;
  
  if (!sortBy) {
    filteredFilms = [...films];
  } else {
    filteredFilms.sort((a, b) => {
      if (order === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }
  
  // Застосувати пошук після сортування
  const query = searchInput.value.toLowerCase();
  if (query) {
    filteredFilms = filteredFilms.filter(film => 
      film.name.toLowerCase().includes(query)
    );
  }
  
  renderFilms();
}

sortSelect.addEventListener('change', sortFilms);
sortOrder.addEventListener('change', sortFilms);

// Початковий рендер
renderFilms();

