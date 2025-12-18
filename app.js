const initialFilms = [
  { id: 1, name: "Inception", genre: "Sci-Fi", duration: 148, year: 2010, rating: 8.8 },
  { id: 2, name: "Interstellar", genre: "Adventure", duration: 169, year: 2014, rating: 8.6 },
  { id: 3, name: "The Matrix", genre: "Action", duration: 136, year: 1999, rating: 8.7 },
  { id: 4, name: "Pulp Fiction", genre: "Crime", duration: 154, year: 1994, rating: 8.9 },
  { id: 5, name: "The Dark Knight", genre: "Action", duration: 152, year: 2008, rating: 9.0 },
  { id: 6, name: "Fight Club", genre: "Drama", duration: 139, year: 1999, rating: 8.8 },
  { id: 7, name: "Forrest Gump", genre: "Drama", duration: 142, year: 1994, rating: 8.8 },
  { id: 8, name: "The Shawshank Redemption", genre: "Drama", duration: 142, year: 1994, rating: 9.3 }
];

function loadFilmsFromStorage() {
  const stored = localStorage.getItem('films');
  let currentFilms = [];
  
  if (stored) {
    currentFilms = JSON.parse(stored);
  }
  
  const hasInitialFilms = initialFilms.every(initialFilm => 
    currentFilms.some(f => f.id === initialFilm.id)
  );
  
  if (!hasInitialFilms) {
    initialFilms.forEach(initialFilm => {
      if (!currentFilms.find(f => f.id === initialFilm.id)) {
        currentFilms.push(initialFilm);
      }
    });
    localStorage.setItem('films', JSON.stringify(currentFilms));
  }
  
  return currentFilms.length > 0 ? currentFilms : initialFilms;
}

let films = loadFilmsFromStorage();
let filteredFilms = [...films];

const filmsContainer = document.getElementById('filmsContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const sortOrder = document.getElementById('sortOrder');
const totalDuration = document.getElementById('totalDuration');
const avgRating = document.getElementById('avgRating');
const totalFilms = document.getElementById('totalFilms');

function renderFilms() {
  filmsContainer.innerHTML = filteredFilms.map(film => `
    <div class="film-card">
      <h3>${film.name}</h3>
      <p><span class="label">Жанр:</span> ${film.genre}</p>
      <p><span class="label">Тривалість:</span> ${film.duration} хв</p>
      <p><span class="label">Рік:</span> ${film.year}</p>
      <p><span class="label">Рейтинг:</span> ⭐ ${film.rating}</p>
      <div class="card-actions">
        <a href="edit.html?id=${film.id}" class="btn btn-edit">✏️ Редагувати</a>
      </div>
    </div>
  `).join('');
  
  updateStats();
}

function updateStats() {
  const total = filteredFilms.reduce((sum, film) => sum + film.duration, 0);
  totalDuration.textContent = total;
  
  const avg = filteredFilms.length > 0 
    ? (filteredFilms.reduce((sum, film) => sum + film.rating, 0) / filteredFilms.length).toFixed(2)
    : 0;
  avgRating.textContent = avg;
  
  totalFilms.textContent = filteredFilms.length;
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  applyFiltersAndSort(query);
});

function sortFilms() {
  const query = searchInput.value.toLowerCase();
  applyFiltersAndSort(query);
}

function applyFiltersAndSort(searchQuery = '') {
  if (searchQuery) {
    filteredFilms = films.filter(film => 
      film.name.toLowerCase().includes(searchQuery)
    );
  } else {
    filteredFilms = [...films];
  }
  
  const sortBy = sortSelect.value;
  const order = sortOrder.value;
  
  if (sortBy) {
    filteredFilms.sort((a, b) => {
      if (order === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }
  
  renderFilms();
}

sortSelect.addEventListener('change', sortFilms);
sortOrder.addEventListener('change', sortFilms);

function saveFilms() {
  localStorage.setItem('films', JSON.stringify(films));
  filteredFilms = [...films];
  applyFiltersAndSort(searchInput.value.toLowerCase());
}

function loadFilmForEdit(id) {
  const film = films.find(f => f.id === parseInt(id));
  if (film) {
    document.getElementById('filmId').value = film.id;
    document.getElementById('name').value = film.name;
    document.getElementById('genre').value = film.genre;
    document.getElementById('duration').value = film.duration;
    document.getElementById('year').value = film.year;
    document.getElementById('rating').value = film.rating;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');
if (editId && window.location.pathname.includes('edit.html')) {
  loadFilmForEdit(editId);
}

function refreshFilms() {
  films = loadFilmsFromStorage();
  const query = searchInput.value.toLowerCase();
  applyFiltersAndSort(query);
}

refreshFilms();

window.addEventListener('focus', refreshFilms);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { films, saveFilms, renderFilms };
}

