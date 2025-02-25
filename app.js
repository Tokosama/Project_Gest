const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
dotenv.config();

const app = express();
app.use(bodyParser.json()); // Pour parser le corps des requêtes JSON

// Connexion à la base de données MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Base de données connectée'))
  .catch((err) => console.log('Erreur de connexion à la base de données', err));

// Synchronisation des modèles Sequelize avec la base de données
sequelize.sync();

// Utilisation des routes pour les utilisateurs
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
