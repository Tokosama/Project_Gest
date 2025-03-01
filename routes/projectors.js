const express = require("express");
const { addProjector, getProjectorById, getAllProjectors, getAllDispoProjectors, updateProjectorStatus, deleteProjector } = require("../controllers/projectorController");
const { isAdmin, authMiddleware } = require("../middleware/authentication"); // Import du middleware

const router = express.Router();

// Protéger les routes sensibles avec isAdmin

// Ajouter un projecteur (réservé aux admins)
router.post("/", authMiddleware, isAdmin, addProjector);

// Récupérer tous les projecteurs (accessible par tous)
router.get("/", getAllProjectors);

// Récupérer tous les projecteurs disponibles (accessible par tous)
router.get("/disponibles", getAllDispoProjectors);

// Récupérer un projecteur par ID (accessible par tous)
router.get("/:id", getProjectorById);

// Mettre à jour un projecteur (réservé aux admins)
router.patch("/:id",authMiddleware, isAdmin, updateProjectorStatus);

// Supprimer un projecteur (réservé aux admins)
router.delete("/:id",authMiddleware, isAdmin, deleteProjector);

module.exports = router;
