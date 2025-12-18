let films = JSON.parse(localStorage.getItem('films')) || [];

const form = document.getElementById('editForm');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeBtn = document.querySelector('.close');

const urlParams = new URLSearchParams(window.location.search);
const filmId = parseInt(urlParams.get('id'));

if (filmId) {
  const film = films.find(f => f.id === filmId);
  if (film) {
    document.getElementById('filmId').value = film.id;
    document.getElementById('name').value = film.name;
    document.getElementById('genre').value = film.genre;
    document.getElementById('duration').value = film.duration;
    document.getElementById('year').value = film.year;
    document.getElementById('rating').value = film.rating;
  } else {
    alert('Фільм не знайдено!');
    window.location.href = 'index.html';
  }
}

function validateForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.length < 2) {
    errors.push('Назва фільму має містити мінімум 2 символи');
  }

  if (!formData.genre || formData.genre.length < 2) {
    errors.push('Жанр має містити мінімум 2 символи');
  }

  const duration = parseInt(formData.duration);
  if (!duration || duration < 1 || duration > 600) {
    errors.push('Тривалість має бути від 1 до 600 хвилин');
  }

  const year = parseInt(formData.year);
  if (!year || year < 1888 || year > 2025) {
    errors.push('Рік має бути від 1888 до 2025');
  }

  const rating = parseFloat(formData.rating);
  if (isNaN(rating) || rating < 0 || rating > 10) {
    errors.push('Рейтинг має бути від 0 до 10');
  }

  return errors;
}

function showErrorModal(errors) {
  errorMessage.textContent = errors.join('\n');
  errorModal.style.display = 'block';
}

function closeModal() {
  errorModal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === errorModal) {
    closeModal();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    id: parseInt(document.getElementById('filmId').value),
    name: document.getElementById('name').value.trim(),
    genre: document.getElementById('genre').value.trim(),
    duration: document.getElementById('duration').value,
    year: document.getElementById('year').value,
    rating: document.getElementById('rating').value
  };

  const errors = validateForm(formData);
  if (errors.length > 0) {
    showErrorModal(errors);
    return;
  }

  const index = films.findIndex(f => f.id === formData.id);
  if (index !== -1) {
    films[index] = {
      id: formData.id,
      name: formData.name,
      genre: formData.genre,
      duration: parseInt(formData.duration),
      year: parseInt(formData.year),
      rating: parseFloat(formData.rating)
    };

    localStorage.setItem('films', JSON.stringify(films));
    alert('✅ Фільм успішно оновлено!');
    window.location.href = 'index.html';
  } else {
    alert('❌ Фільм не знайдено!');
  }
});

