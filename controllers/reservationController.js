const reservationQueries = require("../database/reservationQueries");

const addReservation = (req, res) => {
  const { userId, projectorId, reservationStart, reservationEnd } = req.body; // Récupérer les données de la requête
  reservationQueries.addReservation(userId, projectorId, reservationStart, reservationEnd, (err, reservationId) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de l'ajout de la réservation." });
    } else {
      res.status(201).json({ message: "Réservation ajoutée avec succès", reservationId });
    }
  });
};

const getAllReservations = (req, res) => {
  reservationQueries.getAllReservations((err, reservations) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des réservations." });
    } else {
      res.status(200).json(reservations);
    }
  });
};

const deleteReservation = (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la réservation à supprimer
  reservationQueries.deleteReservation(id, (err, changes) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la suppression de la réservation." });
    } else if (changes === 0) {
      res.status(404).json({ error: "Réservation non trouvée." });
    } else {
      res.status(200).json({ message: "Réservation supprimée avec succès." });
    }
  });
};

module.exports = {
  addReservation,
  getAllReservations,
  deleteReservation,
};
