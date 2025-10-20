import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json()); // Add middleware to parse JSON bodies

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});
// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is live" });
});

// Fetch all games
app.get("/games", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM gamedb");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching all games:", err);
    res.status(500).json({ error: "Failed to fetch all games" });
  }
});

// Fetch games by genre
app.get("/games/:genre", async (req, res) => {
  const genre = req.params.genre;

  try {
    const result = await db.query("SELECT * FROM gamedb WHERE genre = $1", [
      genre,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "Failed to fetch games by genre" });
  }
});

// Add a new game
app.post("/games", async (req, res) => {
  // Get data from request body or use defaults
  const { title, series, studio, genre, gamedescription, url } = req.body;

  const gameTitle = title || "Sample Game";
  const gameSeries = series || "Sample Series";
  const gameStudio = studio || "Sample Studio";
  const gameGenre = genre || "RPG";
  const gameDescription = gamedescription || "This is a sample game";
  const gameUrl = url || null; // Image URL can be null

  try {
    const result = await db.query(
      "INSERT INTO gamedb (gametitle, series, studio, genre, gamedescription, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [gameTitle, gameSeries, gameStudio, gameGenre, gameDescription, gameUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding game:", err);
    res.status(500).json({ error: "Failed to add game" });
  }
});

// Delete a game
app.delete("/games/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const result = await db.query(
      "DELETE FROM gamedb WHERE id = $1 RETURNING *",
      [gameId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json({ message: "Game deleted successfully", game: result.rows[0] });
  } catch (err) {
    console.error("Error deleting game:", err);
    res.status(500).json({ error: "Failed to delete game" });
  }
});

// Start server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
