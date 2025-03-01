const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');  // Utilisation du controller pour getAllUsers et deleteUser
const { authMiddleware, isAdmin } = require('../middleware/authentication');

const router = express.Router();

// Récupérer tous les utilisateurs (accessible uniquement aux admins)
router.get('/', authMiddleware, isAdmin, getAllUsers);  // Appeler la fonction directement

// Supprimer un utilisateur (accessible uniquement aux admins)
router.delete('/:id', authMiddleware, isAdmin, (req, res) => {
    const { id } = req.params;
    deleteUser(id, (err, changes) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
        if (changes === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    });
});

module.exports = router;
