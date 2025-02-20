const db = require("./config/database");
const express = require("express");
const app = express();
const dotenv = require("dotenv");


dotenv.config();

// Middleware pour traiter les données JSON
app.use(express.json());

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
