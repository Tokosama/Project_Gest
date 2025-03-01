const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');  // Utilisation du controller pour getAllUsers et deleteUser
const { authMiddleware, isAdmin } = require('../middleware/authentication');

const router = express.Router();

// Récupérer tous les utilisateurs (accessible uniquement aux admins)
router.get('/', authMiddleware, isAdmin, getAllUsers);  // Appeler la fonction directement

// Supprimer un utilisateur (accessible uniquement aux admins)
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
