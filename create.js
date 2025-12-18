let films = JSON.parse(localStorage.getItem('films')) || [];

const form = document.getElementById('createForm');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeBtn = document.querySelector('.close');

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

  const newFilm = {
    id: Date.now(),
    name: formData.name,
    genre: formData.genre,
    duration: parseInt(formData.duration),
    year: parseInt(formData.year),
    rating: parseFloat(formData.rating)
  };

  films.push(newFilm);
  localStorage.setItem('films', JSON.stringify(films));

  alert('✅ Фільм успішно створено!');
  window.location.href = 'index.html';
});

