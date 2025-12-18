const db = require('./db');


const qualityMultipliers = {
  720: 1.0,
  1080: 1.3,
  1440: 1.6,
  2160: 2.0
};


const basePrices = {
  "Interstellar": 250,
  "Tenet": 215,
  "Oppenheimer": 175,
  "Dune": 200,
  "Avatar": 200,
  "Matrix": 150,
  "Joker": 215,
  "The Batman": 230,
  "Fight Club": 169,
  "Shutter Island": 192,
  "Barbie": 176,
  "Whiplash": 184,
  "The Social Network": 153,
  "Inglourious Basterds": 207
};


const qualityAssignments = {
  "Interstellar": 2160,
  "Tenet": 1440,
  "Oppenheimer": 2160,
  "Dune": 2160,
  "Avatar": 2160,
  "Matrix": 1080,
  "Joker": 1440,
  "The Batman": 2160,
  "Fight Club": 1080,
  "Shutter Island": 1080,
  "Barbie": 1440,
  "Whiplash": 720,
  "The Social Network": 720,
  "Inglourious Basterds": 1080
};


const updatePricesByQuality = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT id, name FROM films", (err, films) => {
      if (err) {
        console.error('Error fetching films:', err.message);
        reject(err);
        return;
      }

      let updated = 0;
      const updates = films.map(film => {
        return new Promise((resolveUpdate, rejectUpdate) => {
          const basePrice = basePrices[film.name];
          const quality = qualityAssignments[film.name] || 720;
          
          if (!basePrice) {
            console.log(`Skipping ${film.name} - no base price defined`);
            resolveUpdate();
            return;
          }

          
          const multiplier = qualityMultipliers[quality] || 1.0;
          const newPrice = Math.round(basePrice * multiplier);

          const sql = `UPDATE films SET quality = ?, price = ? WHERE id = ?`;
          db.run(sql, [quality, newPrice, film.id], (err) => {
            if (err) {
              console.error(`Error updating film ${film.name}:`, err.message);
              rejectUpdate(err);
            } else {
              console.log(`Updated ${film.name}: ${quality}p, ${newPrice} грн (base: ${basePrice})`);
              updated++;
              resolveUpdate();
            }
          });
        });
      });

      Promise.all(updates)
        .then(() => {
          console.log(`\nUpdated ${updated} films with quality and prices`);
          resolve();
        })
        .catch(reject);
    });
  });
};


const runUpdate = async () => {
  try {
    console.log('Updating films with quality-based pricing...\n');
    await updatePricesByQuality();
    console.log('\nUpdate completed successfully!');
    
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
    console.error('Error running update:', error);
    db.close();
    process.exit(1);
  }
};

runUpdate();


