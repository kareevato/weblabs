const db = require('../database/db');
const bcrypt = require('bcrypt');

class User {
  static async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    
    try {
      const user = await db.getAsync(sql, [email]);
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    
    try {
      const user = await db.getAsync(sql, [id]);
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  static async create(email, password, firstName = null, lastName = null) {
    // Хешуємо пароль перед зберіганням
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const sql = `
      INSERT INTO users (email, password_hash, first_name, last_name)
      VALUES (?, ?, ?, ?)
    `;
    const params = [email, passwordHash, firstName, lastName];

    try {
      const result = await db.runAsync(sql, params);
      const user = await this.findById(result.lastID);
      // Не повертаємо хеш пароля
      delete user.password_hash;
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      // Якщо користувач вже існує (UNIQUE constraint)
      if (error.message && error.message.includes('UNIQUE constraint')) {
        throw new Error('Користувач з таким email вже існує');
      }
      throw error;
    }
  }

  static async verifyPassword(email, password) {
    const user = await this.findByEmail(email);
    
    if (!user) {
      return false;
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password_hash);
      return isMatch;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }

  static async updatePassword(email, newPassword) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    const sql = `
      UPDATE users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE email = ?
    `;

    try {
      await db.runAsync(sql, [passwordHash, email]);
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  static async updateName(email, firstName, lastName) {
    const sql = `
      UPDATE users 
      SET first_name = ?, last_name = ?, updated_at = CURRENT_TIMESTAMP
      WHERE email = ?
    `;

    try {
      await db.runAsync(sql, [firstName, lastName, email]);
      return true;
    } catch (error) {
      console.error('Error updating name:', error);
      throw error;
    }
  }
}

module.exports = User;

