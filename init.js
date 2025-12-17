const db = require('./db');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname, '../../');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create films table
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

// Initialize database
const initDatabase = async () => {
  try {
    console.log('Initializing database...');
    await createFilmsTable();
    console.log('Database initialized successfully!');
    
    // Close database connection
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

// Run initialization
initDatabase();

