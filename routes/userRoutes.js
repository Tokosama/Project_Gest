const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Route protégée : obtenir le profil de l'utilisateur
router.get('/profile', authMiddleware, (req, res) => {
  // Ici, req.user a déjà les informations de l'utilisateur
  res.json({ user: req.user });
});

// Route protégée : réservée aux administrateurs
router.get('/admin', authMiddleware, roleMiddleware('administrateur'), (req, res) => {
  res.json({ message: 'Bienvenue administrateur!' });
});

// Route pour la connexion et l'émission du token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await user.comparePassword(password)) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  const token = jwt.sign({ user: { id: user._id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
