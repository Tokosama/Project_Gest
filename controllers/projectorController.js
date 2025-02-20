const projectorQueries = require("../database/projectorQueries");

const addProjector = (req, res) => {
  const { name } = req.body;
  projectorQueries.addProjector(name, (err, projectorId) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de l'ajout du projecteur." });
    } else {
      res.status(201).json({ message: "Projecteur ajouté avec succès", projectorId });
    }
  });
};

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

const getAllProjectors = (req, res) => {
  projectorQueries.getAllProjectors((err, projectors) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des projecteurs." });
    } else {
      res.status(200).json(projectors);
    }
  });
};

const updateProjectorStatus = (req, res) => {
  const { id } = req.params;
  const { status, reservationStart, reservationEnd } = req.body;
  projectorQueries.updateProjectorStatus(id, status, reservationStart, reservationEnd, (err, changes) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du projecteur." });
    } else if (changes === 0) {
      res.status(404).json({ error: "Projecteur non trouvé." });
    } else {
      res.status(200).json({ message: "Projecteur mis à jour avec succès." });
    }
  });
};

const deleteProjector = (req, res) => {
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
};

module.exports = { addProjector, getProjectorById, getAllProjectors, updateProjectorStatus, deleteProjector };
