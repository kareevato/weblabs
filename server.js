const express = require('express');
const cors = require('cors');
const filmsRoutes = require('./routes/films');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/films', filmsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// View more endpoint - для кнопки "View more" на Home сторінці
app.get('/api/view-more', async (req, res) => {
  try {
    console.log('View more button clicked - GET /api/view-more');
    const Film = require('./models/Film');
    const films = await Film.findAll({});
    console.log(`Returning ${films.length} films for view more`);
    res.json({ 
      success: true, 
      count: films.length,
      films: films 
    });
  } catch (error) {
    console.error('Error in /api/view-more:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch films', 
      message: error.message 
    });
  }
});

// Navigation endpoints
app.get('/api/nav/home', (req, res) => {
  console.log('Navigation: Home button clicked - GET /api/nav/home');
  res.json({ success: true, action: 'navigate_home', message: 'Navigating to home' });
});

app.get('/api/nav/catalog', (req, res) => {
  console.log('Navigation: Catalog button clicked - GET /api/nav/catalog');
  res.json({ success: true, action: 'navigate_catalog', message: 'Navigating to catalog' });
});

app.get('/api/nav/cart', (req, res) => {
  console.log('Navigation: Cart button clicked - GET /api/nav/cart');
  res.json({ success: true, action: 'navigate_cart', message: 'Navigating to cart' });
});

// Film details endpoint - для кнопки "View more" (детальніше) на картках каталогу
app.get('/api/film-details/:id', async (req, res) => {
  try {
    const filmId = req.params.id;
    console.log(`Film details button clicked - GET /api/film-details/${filmId}`);
    const Film = require('./models/Film');
    const film = await Film.findById(filmId);
    if (!film) {
      return res.status(404).json({ success: false, error: 'Film not found' });
    }
    res.json({ success: true, action: 'view_film_details', film: film });
  } catch (error) {
    console.error('Error in /api/film-details:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch film', message: error.message });
  }
});

// Item page actions
app.get('/api/go-back', (req, res) => {
  console.log('Go back button clicked - GET /api/go-back');
  res.json({ success: true, action: 'go_back', message: 'Going back to catalog' });
});

app.get('/api/add-to-cart', (req, res) => {
  const filmId = req.query.filmId || req.query.id;
  console.log(`Add to cart button clicked - GET /api/add-to-cart?filmId=${filmId}`);
  res.json({ success: true, action: 'add_to_cart', filmId: filmId, message: 'Film added to cart' });
});

// Select change endpoint
app.get('/api/select-change', (req, res) => {
  const { field, value } = req.query;
  console.log(`Select changed - GET /api/select-change?field=${field}&value=${value}`);
  res.json({ success: true, action: 'select_change', field: field, value: value });
});

// Quantity change endpoint
app.get('/api/quantity-change', (req, res) => {
  const { action, filmId } = req.query;
  console.log(`Quantity change - GET /api/quantity-change?action=${action}&filmId=${filmId}`);
  res.json({ success: true, action: 'quantity_change', change: action, filmId: filmId });
});

// Features view more endpoint
app.get('/api/features-view-more', (req, res) => {
  const { action } = req.query;
  console.log(`Features view more button clicked - GET /api/features-view-more?action=${action}`);
  res.json({ success: true, action: 'features_view_more', toggle: action, message: 'Features content toggled' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;

