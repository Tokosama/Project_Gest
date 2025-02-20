const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require('dotenv').config();  // Assurez-vous que dotenv est bien importé pour charger le .env

// Vérifier si DATABASE_URL est défini dans .env
const dbPath = process.env.DATABASE_URL ? path.resolve(__dirname, "../", process.env.DATABASE_URL) : "database/projecteurs.db";

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur lors de la connexion à SQLite :", err.message);
  } else {
    console.log("Connexion à SQLite réussie !");
  }
});

module.exports = db;
