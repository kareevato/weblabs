const db = require('../database/db');

class Film {
  static async findAll(filters = {}) {
    let sql = 'SELECT * FROM films WHERE 1=1';
    const params = [];

    if (filters.search) {
      sql += ' AND name LIKE ?';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm);
    }

    if (filters.genre) {
      sql += ' AND genre = ?';
      params.push(filters.genre);
    }

    if (filters.year) {
      sql += ' AND year = ?';
      params.push(filters.year);
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      sql += ' AND rating >= ?';
      params.push(minRating);
    }

    if (filters.quality) {
      sql += ' AND quality >= ?';
      params.push(filters.quality);
    }

    sql += ' ORDER BY name ASC';

    try {
      const films = await db.allAsync(sql, params);
      return films;
    } catch (error) {
      console.error('Error finding films:', error);
      throw error;
    }
  }

  static async findById(id) {
    const sql = 'SELECT * FROM films WHERE id = ?';
    
    try {
      const film = await db.getAsync(sql, [id]);
      return film;
    } catch (error) {
      console.error('Error finding film by ID:', error);
      throw error;
    }
  }

  static async create(filmData) {
    const sql = `
      INSERT INTO films (name, genre, year, duration, rating, price, views, image, quality)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      filmData.name,
      filmData.genre,
      filmData.year,
      filmData.duration,
      filmData.rating,
      filmData.price,
      filmData.views || 0,
      filmData.image || null,
      filmData.quality || 720
    ];

    try {
      const result = await db.runAsync(sql, params);
      return await this.findById(result.lastID);
    } catch (error) {
      console.error('Error creating film:', error);
      throw error;
    }
  }

  static async update(id, filmData) {
    const sql = `
      UPDATE films 
      SET name = ?, genre = ?, year = ?, duration = ?, 
          rating = ?, price = ?, views = ?, image = ?, quality = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const params = [
      filmData.name,
      filmData.genre,
      filmData.year,
      filmData.duration,
      filmData.rating,
      filmData.price,
      filmData.views || 0,
      filmData.image || null,
      filmData.quality || 720,
      id
    ];

    try {
      await db.runAsync(sql, params);
      return await this.findById(id);
    } catch (error) {
      console.error('Error updating film:', error);
      throw error;
    }
  }

  static async delete(id) {
    const sql = 'DELETE FROM films WHERE id = ?';
    
    try {
      await db.runAsync(sql, [id]);
      return true;
    } catch (error) {
      console.error('Error deleting film:', error);
      throw error;
    }
  }

  static async getGenres() {
    const sql = 'SELECT DISTINCT genre FROM films ORDER BY genre ASC';
    
    try {
      const rows = await db.allAsync(sql);
      return rows.map(row => row.genre);
    } catch (error) {
      console.error('Error getting genres:', error);
      throw error;
    }
  }

  static async getYears() {
    const sql = 'SELECT DISTINCT year FROM films ORDER BY year DESC';
    
    try {
      const rows = await db.allAsync(sql);
      return rows.map(row => row.year);
    } catch (error) {
      console.error('Error getting years:', error);
      throw error;
    }
  }
}

module.exports = Film;

