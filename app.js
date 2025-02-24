const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
dotenv.config();

// Middleware pour vérifier l'authentification
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;




const app = express();
app.use(bodyParser.json()); // Pour parser le corps des requêtes JSON

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Base de données connectée'))
  .catch((err) => console.log('Erreur de connexion à la base de données', err));

// Utilisation des routes pour les utilisateurs
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
