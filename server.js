const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "db.json");

function readData() {
  try {
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("❌ Помилка читання db.json:", err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

app.get("/", (req, res) => {
  res.send("🎬 Film API is running...");
});

app.get("/films", (req, res) => {
  let data = readData().map(f => ({
    ...f,
    views: typeof f.views === "number" ? f.views : 0
  }));
  const { sort, order } = req.query;

  if (sort) {
    data.sort((a, b) => {
      const valA = a[sort] ?? "";
      const valB = b[sort] ?? "";
      if (typeof valA === "number" && typeof valB === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      } else {
        return order === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
  }

  res.json(data);
});

app.get("/films/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex((f) => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Фільм не знайдено" });
  
  const film = data[index];
  const currentViews = typeof film.views === "number" ? film.views : 0;
  data[index] = { ...film, views: currentViews + 1 };
  writeData(data);
  
  res.json(data[index]);
});

app.post("/films", (req, res) => {
  const data = readData();
  const { name, genre, duration, year, rating } = req.body;

  console.log("🟢 Отримано від фронтенду:", req.body);

  if (!name || !genre || !duration || !year || !rating) {
    return res.status(400).json({ error: "Усі поля обов’язкові!" });
  }

  const newFilm = {
    id: Date.now().toString(),
    name,
    genre,
    duration,
    year,
    rating,
    views: 0,
  };

  data.push(newFilm);
  writeData(data);
  res.status(201).json(newFilm);
});

app.put("/films/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.findIndex((f) => f.id === id);
  if (index === -1) return res.status(404).json({ error: "Фільм не знайдено" });

  const { views, ...updateData } = req.body;
  data[index] = { ...data[index], ...updateData };
  writeData(data);
  res.json(data[index]);
});

app.delete("/films/:id", (req, res) => {
  let data = readData();
  const id = req.params.id;
  data = data.filter((f) => f.id !== id);
  writeData(data);
  res.json({ message: "Фільм видалено" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
