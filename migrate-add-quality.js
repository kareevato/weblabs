const db = require('./db');


const addQualityColumn = () => {
  return new Promise((resolve, reject) => {
    
    db.get("PRAGMA table_info(films)", (err, row) => {
      if (err) {
        console.error('Error checking table info:', err.message);
        reject(err);
        return;
      }

      
      db.all("PRAGMA table_info(films)", (err, columns) => {
        if (err) {
          console.error('Error getting columns:', err.message);
          reject(err);
          return;
        }

        const hasQuality = columns.some(col => col.name === 'quality');
        
        if (hasQuality) {
          console.log('Quality column already exists');
          resolve();
          return;
        }

        
        const sql = `ALTER TABLE films ADD COLUMN quality INTEGER DEFAULT 720`;
        
        db.run(sql, (err) => {
          if (err) {
            console.error('Error adding quality column:', err.message);
            reject(err);
          } else {
            console.log('Quality column added successfully');
            resolve();
          }
        });
      });
    });
  });
};


const updatePricesByQuality = () => {
  return new Promise((resolve, reject) => {
    
    const qualityMultipliers = {
      720: 1.0,
      1080: 1.3,
      1440: 1.6,
      2160: 2.0
    };

    
    db.all("SELECT id, quality, price FROM films", (err, films) => {
      if (err) {
        console.error('Error fetching films:', err.message);
        reject(err);
        return;
      }

      let updated = 0;
      const updates = films.map(film => {
        return new Promise((resolveUpdate, rejectUpdate) => {
          
          const qualities = [720, 1080, 1440, 2160];
          const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
          
          
          const basePrice = film.price / (qualityMultipliers[film.quality] || 1.0);
          
          
          const newQuality = film.quality || randomQuality;
          const multiplier = qualityMultipliers[newQuality] || 1.0;
          const newPrice = Math.round(basePrice * multiplier);

          const sql = `UPDATE films SET quality = ?, price = ? WHERE id = ?`;
          db.run(sql, [newQuality, newPrice, film.id], (err) => {
            if (err) {
              console.error(`Error updating film ${film.id}:`, err.message);
              rejectUpdate(err);
            } else {
              updated++;
              resolveUpdate();
            }
          });
        });
      });

      Promise.all(updates)
        .then(() => {
          console.log(`Updated ${updated} films with quality and prices`);
          resolve();
        })
        .catch(reject);
    });
  });
};


const runMigration = async () => {
  try {
    console.log('Running migration: add quality column...');
    await addQualityColumn();
    await updatePricesByQuality();
    console.log('Migration completed successfully!');
    
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
    console.error('Error running migration:', error);
    db.close();
    process.exit(1);
  }
};

runMigration();


