const db = require('./db');
const path = require('path');
const fs = require('fs');


const dbDir = path.join(__dirname, '../../');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}


const createFilmsTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS films (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        genre TEXT NOT NULL,
        year INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        rating REAL NOT NULL,
        price REAL NOT NULL,
        views INTEGER DEFAULT 0,
        image TEXT,
        quality INTEGER DEFAULT 720,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(sql, (err) => {
      if (err) {
        console.error('Error creating films table:', err.message);
        reject(err);
      } else {
        console.log('Films table created successfully');
        resolve();
      }
    });
  });
};

const createUsersTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(sql, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
        reject(err);
      } else {
        console.log('Users table created successfully');
        resolve();
      }
    });
  });
};


const initDatabase = async () => {
  try {
    console.log('Initializing database...');
    await createFilmsTable();
    await createUsersTable();
    console.log('Database initialized successfully!');
    
    
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
        process.exit(1);
      } else {
        console.log('Database connection closed');
        process.exit(0);
      }
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    db.close();
    process.exit(1);
  }
};


initDatabase();

