const express = require('express');
const cors = require('cors');
const filmsRoutes = require('./routes/films');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/films', filmsRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});


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


app.get('/api/go-back', (req, res) => {
  console.log('Go back button clicked - GET /api/go-back');
  res.json({ success: true, action: 'go_back', message: 'Going back to catalog' });
});

app.get('/api/add-to-cart', (req, res) => {
  const filmId = req.query.filmId || req.query.id;
  console.log(`Add to cart button clicked - GET /api/add-to-cart?filmId=${filmId}`);
  res.json({ success: true, action: 'add_to_cart', filmId: filmId, message: 'Film added to cart' });
});


app.get('/api/select-change', (req, res) => {
  const { field, value } = req.query;
  console.log(`Select changed - GET /api/select-change?field=${field}&value=${value}`);
  res.json({ success: true, action: 'select_change', field: field, value: value });
});


app.get('/api/quantity-change', (req, res) => {
  const { action, filmId } = req.query;
  console.log(`Quantity change - GET /api/quantity-change?action=${action}&filmId=${filmId}`);
  res.json({ success: true, action: 'quantity_change', change: action, filmId: filmId });
});


app.get('/api/features-view-more', (req, res) => {
  const { action } = req.query;
  console.log(`Features view more button clicked - GET /api/features-view-more?action=${action}`);
  res.json({ success: true, action: 'features_view_more', toggle: action, message: 'Features content toggled' });
});


app.get('/api/cart-remove', (req, res) => {
  const { filmId } = req.query;
  console.log(`Cart remove - GET /api/cart-remove?filmId=${filmId}`);
  res.json({ success: true, action: 'cart_remove', filmId: filmId });
});

app.get('/api/cart-increase', (req, res) => {
  const { filmId } = req.query;
  console.log(`Cart increase quantity - GET /api/cart-increase?filmId=${filmId}`);
  res.json({ success: true, action: 'cart_increase', filmId: filmId });
});

app.get('/api/cart-decrease', (req, res) => {
  const { filmId } = req.query;
  console.log(`Cart decrease quantity - GET /api/cart-decrease?filmId=${filmId}`);
  res.json({ success: true, action: 'cart_decrease', filmId: filmId });
});

app.get('/api/cart-clear', (req, res) => {
  console.log('Cart clear - GET /api/cart-clear');
  res.json({ success: true, action: 'cart_clear' });
});


app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;

