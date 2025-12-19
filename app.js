const API = 'http://localhost:3000';
const cards = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const sortField = document.getElementById('sortField');
const sortOrder = document.getElementById('sortOrder');

let films = [];

async function loadFilms() {
  const sf = sortField?.value || '';
  const so = sortOrder?.value || 'desc';
  const params = new URLSearchParams();
  if (sf) params.set('sort', sf);
  if (so) params.set('order', so);
  const url = params.toString() ? `${API}/films?${params}` : `${API}/films`;

  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Server error');
    films = await r.json();
    applySearch();
  } catch (err) {
    console.error(err);
    cards.innerHTML = `<p style="color:red;">❌ Помилка під час завантаження фільмів</p>`;
  }
}

function render(list) {
  if (!list.length) {
    cards.innerHTML = `<p style="color:#64748b;">Нічого не знайдено 😕</p>`;
    updateStats([]);
    return;
  }

  cards.innerHTML = list.map(f => `
    <div class="card">
      <h3>${f.name ?? 'Без назви'}</h3>
      <p><b>Жанр:</b> ${f.genre ?? '—'}</p>
      <p><b>Тривалість:</b> ${f.duration ?? 0} хв</p>
      <p><b>Рік:</b> ${f.year ?? '—'}</p>
      <p><b>Рейтинг:</b> ⭐ ${f.rating ?? '—'}</p>
      <p><b>Перегляди:</b> ${f.views ?? 0}</p>
      <div class="btn-row">
        <a class="btn" href="edit.html?id=${f.id}">✏️</a>
        <button class="btn" onclick="delFilm('${f.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
  
  updateStats(list);
}

function updateStats(list) {
  const totalDuration = list.reduce((sum, f) => sum + (f.duration || 0), 0);
  const avgRating = list.length > 0 
    ? (list.reduce((sum, f) => sum + (f.rating || 0), 0) / list.length).toFixed(2)
    : 0;
  const totalViews = list.reduce((sum, f) => sum + (f.views || 0), 0);
  
  document.getElementById('totalDuration').textContent = totalDuration;
  document.getElementById('avgRating').textContent = avgRating;
  document.getElementById('totalFilms').textContent = list.length;
  document.getElementById('totalViews').textContent = totalViews;
}

function applySearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    render(films);
    return;
  }

  const filtered = films.filter(f => {
    const name = (f.name || '').toLowerCase();
    const genre = (f.genre || '').toLowerCase();
    const year = f.year ? f.year.toString() : '';
    const rating = f.rating ? f.rating.toString() : '';
    return (
      name.includes(q) ||
      genre.includes(q) ||
      year.includes(q) ||
      rating.includes(q)
    );
  });

  render(filtered);
}

async function delFilm(id) {
  if (!confirm('Видалити фільм?')) return;
  await fetch(`${API}/films/${id}`, { method: 'DELETE' });
  loadFilms();
}

searchInput.addEventListener('input', applySearch);
if (sortField) sortField.addEventListener('change', loadFilms);
if (sortOrder) sortOrder.addEventListener('change', loadFilms);

loadFilms();
