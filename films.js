const express = require('express');
const router = express.Router();
const Film = require('../models/Film');


router.get('/', async (req, res) => {
  try {
    const filters = {
      search: req.query.search || null,
      genre: req.query.genre || null,
      year: req.query.year || null,
      rating: req.query.rating || null,
      quality: req.query.quality || null
    };

    
    Object.keys(filters).forEach(key => {
      if (filters[key] === null || filters[key] === '') {
        delete filters[key];
      }
    });

    const films = await Film.findAll(filters);
    res.json(films);
  } catch (error) {
    console.error('Error fetching films:', error);
    res.status(500).json({ error: 'Failed to fetch films', message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    
    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }
    
    res.json(film);
  } catch (error) {
    console.error('Error fetching film:', error);
    res.status(500).json({ error: 'Failed to fetch film', message: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const film = await Film.create(req.body);
    res.status(201).json(film);
  } catch (error) {
    console.error('Error creating film:', error);
    res.status(500).json({ error: 'Failed to create film', message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const film = await Film.update(req.params.id, req.body);
    res.json(film);
  } catch (error) {
    console.error('Error updating film:', error);
    res.status(500).json({ error: 'Failed to update film', message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Film.delete(req.params.id);
    res.json({ message: 'Film deleted successfully' });
  } catch (error) {
    console.error('Error deleting film:', error);
    res.status(500).json({ error: 'Failed to delete film', message: error.message });
  }
});

module.exports = router;

