# Web Lab 9 - Connecting to REST API with SQL Database

## Опис
Повний проект з інтеграцією REST API та SQL бази даних. Включає всі функції з попередніх лабораторних робіт плюс:
- Backend API сервер на Node.js/Express
- SQLite база даних з таблицею films
- Інтеграція з REST API через axios
- Завантаження даних фільмів з backend
- Пошук та фільтри через GET запити з URL параметрами
- Loading Spinner компонент для відображення стану завантаження
- API сервіс для всіх HTTP запитів

## Структура проекту

```
лаб9/
├── backend/          # Backend API сервер
│   ├── src/
│   │   ├── database/ # База даних SQLite
│   │   ├── models/   # Моделі даних
│   │   ├── routes/   # API маршрути
│   │   └── seeders/  # Наповнення бази даних
│   └── package.json
├── src/              # Frontend React додаток
│   ├── components/   # React компоненти
│   ├── pages/        # Сторінки
│   ├── services/     # API сервіси
│   └── contexts/     # React контексти
└── README.md
```

## Встановлення та Запуск

### 1. Backend (API сервер)

```bash
cd backend
npm install
npm run init-db      # Створення таблиць в базі даних
npm run seed         # Заповнення бази даних тестовими даними
npm start            # Запуск сервера на http://localhost:3001
```

Або для development з автоматичним перезапуском:
```bash
npm run dev
```

### 2. Frontend (React додаток)

```bash
# В корені проекту (лаб9)
npm install

# Створіть файл .env
echo "REACT_APP_API_URL=http://localhost:3001/api" > .env

# Запуск
npm start
```

Сайт відкриється на http://localhost:3000

## Налаштування

### Backend (.env)

Створіть файл `backend/.env`:
```
PORT=3001
```

### Frontend (.env)

Створіть файл `.env` в корені проекту:
```
REACT_APP_API_URL=http://localhost:3001/api
```

## API Endpoints

### GET /api/health
Перевірка стану сервера

### GET /api/films
Отримати всі фільми з опціональними фільтрами

**Query параметри:**
- `search` - пошук по назві або жанру
- `genre` - фільтр по жанру
- `year` - фільтр по року
- `rating` - фільтр по мінімальному рейтингу (напр. "7+")

**Приклад:**
```
GET /api/films?search=matrix&genre=Sci-Fi&year=1999&rating=8+
```

**Відповідь:**
```json
[
  {
    "id": 1,
    "name": "Matrix",
    "genre": "Sci-Fi",
    "year": 1999,
    "duration": 136,
    "rating": 8.7,
    "price": 199,
    "views": 2800000,
    "image": "https://...",
    "created_at": "2024-01-01 12:00:00",
    "updated_at": "2024-01-01 12:00:00"
  }
]
```

### GET /api/films/:id
Отримати фільм по ID

**Приклад:**
```
GET /api/films/1
```

## База даних

### SQLite Database

База даних зберігається в файлі `backend/database.sqlite`

### Структура таблиці `films`

| Поле | Тип | Опис |
|------|-----|------|
| id | INTEGER | Primary key, auto increment |
| name | TEXT | Назва фільму |
| genre | TEXT | Жанр |
| year | INTEGER | Рік випуску |
| duration | INTEGER | Тривалість (хвилини) |
| rating | REAL | Рейтинг |
| price | REAL | Ціна (грн) |
| views | INTEGER | Кількість переглядів |
| image | TEXT | URL постеру |
| created_at | DATETIME | Дата створення |
| updated_at | DATETIME | Дата оновлення |

### Команди для роботи з базою даних

```bash
# Створити таблиці
npm run init-db

# Заповнити базу даних тестовими даними
npm run seed

# Видалити базу даних (якщо потрібно перезапустити)
rm backend/database.sqlite
```

## Функціональність

### Backend
- ✅ Express.js REST API сервер
- ✅ SQLite база даних
- ✅ CRUD операції для фільмів
- ✅ Фільтрація та пошук через SQL запити
- ✅ CORS для роботи з frontend

### Frontend
- ✅ Використання axios для всіх HTTP запитів
- ✅ Завантаження фільмів з backend через GET запити
- ✅ Пошук через URL параметри
- ✅ Фільтри (жанр, рік, рейтинг) через URL параметри
- ✅ Loading Spinner перед отриманням відповіді
- ✅ Організація API функцій в окремому файлі

## Технології

### Backend
- Node.js
- Express.js 4.18.2
- SQLite3 5.1.6
- CORS 2.8.5

### Frontend
- React 18.3.1
- React Router DOM 6.23.0
- Axios (для HTTP запитів)
- React Scripts 5.0.1

## Розробка

### Запуск в development режимі

1. **Термінал 1 - Backend:**
```bash
cd backend
npm run dev
```

2. **Термінал 2 - Frontend:**
```bash
npm start
```

### Перевірка API

Ви можете протестувати API за допомогою curl або Postman:

```bash
# Отримати всі фільми
curl http://localhost:3001/api/films

# Пошук фільмів
curl "http://localhost:3001/api/films?search=matrix"

# Фільтр по жанру
curl "http://localhost:3001/api/films?genre=Sci-Fi"

# Комбіновані фільтри
curl "http://localhost:3001/api/films?genre=Action&year=2020&rating=7+"
```

## Міграція на PostgreSQL/MySQL

Для використання PostgreSQL або MySQL замість SQLite:

1. Встановіть відповідний драйвер:
```bash
cd backend
# Для PostgreSQL
npm install pg

# Для MySQL
npm install mysql2
```

2. Оновіть `backend/src/database/db.js` для використання нового драйвера
3. Оновіть SQL запити у `backend/src/models/Film.js` для відповідної СУБД
4. Додайте параметри підключення до `backend/.env`

Детальні інструкції дивіться в `backend/README.md`

## Troubleshooting

### Backend не запускається
- Перевірте, чи встановлені всі залежності: `cd backend && npm install`
- Перевірте, чи порт 3001 не зайнятий іншим процесом
- Перевірте, чи створена база даних: `npm run init-db`

### Frontend не підключається до API
- Перевірте, чи запущений backend сервер
- Перевірте файл `.env` з правильним URL: `REACT_APP_API_URL=http://localhost:3001/api`
- Перевірте CORS налаштування в backend

### База даних порожня
- Запустіть seed скрипт: `cd backend && npm run seed`
- Перевірте, чи існує файл `backend/database.sqlite`
