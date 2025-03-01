const express = require('express');
const router = express.Router();


// Contrôleurs d'authentification
const { register, login } = require('../controllers/userController');

// Route pour l'inscription
// Ajout de la gestion du rôle dans la création
router.post('/register', register);

// Route pour la connexion (login)
router.post('/login', login);


module.exports = router;
