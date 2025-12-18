# Web Lab 10 - Redux State Management & Quality Selection

## Опис
Повний проект з інтеграцією REST API та SQL бази даних. Включає всі 
функції з попередніх лабораторних робіт плюс:
- Backend API сервер на Node.js/Express
- SQLite база даних з таблицею films
- Інтеграція з REST API через axios
- Завантаження даних фільмів з backend
- Пошук та фільтри через GET запити з URL параметрами
- Loading Spinner компонент для відображення стану завантаження
- API сервіс для всіх HTTP запитів

## Структура проекту
овнофункціональний веб-додаток для перегляду та покупки фільмів з інтеграцією Redux для управління станом кошика. Проект включає:
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

- **Backend API** сервер на Node.js/Express з SQLite базою даних
- **Frontend React** додаток з Redux для управління станом
- **Вибір якості фільмів** (720p, 1080p, 1440p, 4K) з динамічним ціноутворенням
- **Персистентний кошик** з збереженням в localStorage
- **Badge з кількістю товарів** у кошику
- **Повна інтеграція** між frontend та backend через REST API
