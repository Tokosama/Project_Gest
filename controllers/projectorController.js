const projectorQueries = require("../database/projectorQueries");
const { isAdmin } = require("../middleware/authentication"); 

// Ajouter un projecteur (accessible uniquement aux admins)
const addProjector = [isAdmin, (req, res) => {
  const { name } = req.body;
  projectorQueries.addProjector(name, (err, projectorId) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de l'ajout du projecteur." });
    } else {
      res.status(201).json({ message: "Projecteur ajouté avec succès", projectorId });
    }
  });
}];

// Récupérer un projecteur par ID
const getProjectorById = (req, res) => {
  const { id } = req.params;
  projectorQueries.getProjectorById(id, (err, projector) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du projecteur." });
    } else if (!projector) {
      res.status(404).json({ error: "Projecteur non trouvé." });
    } else {
      res.status(200).json(projector);
    }
  });
};

// Récupérer tous les projecteurs
const getAllProjectors = (req, res) => {
  projectorQueries.getAllProjectors((err, projectors) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des projecteurs." });
    } else {
      res.status(200).json(projectors);
    }
  });
};

// Récupérer tous les projecteurs disponibles
const getAllDispoProjectors = (req, res) => {
  projectorQueries.getAllDispoProjectors((err, projectors) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des projecteurs." });
    } else {
      res.status(200).json(projectors);
    }
  });
};

// Mettre à jour le statut d'un projecteur (fonctionnel ou non)
const updateProjectorStatus = (req, res) => {
  const { id } = req.params;
  const { fonctionnel } = req.body;
  projectorQueries.updateProjectorStatus(id, fonctionnel, (err, changes) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du projecteur." });
    } else if (changes === 0) {
      res.status(404).json({ error: "Projecteur non trouvé." });
    } else {
      res.status(200).json({ message: "Projecteur mis à jour avec succès." });
    }
  });
};

// Supprimer un projecteur (accessible uniquement aux admins)
const deleteProjector = [isAdmin, (req, res) => {
  const { id } = req.params;
  projectorQueries.deleteProjector(id, (err, changes) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la suppression du projecteur." });
    } else if (changes === 0) {
      res.status(404).json({ error: "Projecteur non trouvé." });
    } else {
      res.status(200).json({ message: "Projecteur supprimé avec succès." });
    }
  });
}];

module.exports = { 
  addProjector, 
  getProjectorById, 
  getAllProjectors, 
  getAllDispoProjectors, 
  updateProjectorStatus, 
  deleteProjector 
};

