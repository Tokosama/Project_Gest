const db = require("../config/database");

const addReservation = (
  userId,
  projectorId,
  reservationStart,
  reservationEnd,
  callback
) => {
  const query1 = `
      INSERT INTO reservations (user_id, projector_id, reservation_start, reservation_end)
      VALUES (?, ?, ?, ?);
    `;
    const query2 = `
     UPDATE projectors SET  disponible = 'non'
    WHERE id = ?;
    `
  db.run(
    query1,
    [userId, projectorId, reservationStart, reservationEnd],
    function (err) {
      callback(err, this.lastID); // Renvoie l'ID de la réservation ajoutée
    }
  );
  // Met la disponibilite a non quand un projecteur est reserve
  db.run(query2,[projectorId],);

};

const getAllReservations = (callback) => {
  const query = `
      SELECT * FROM reservations;
    `;
  db.all(query, [], (err, rows) => {
    callback(err, rows); // Renvoie toutes les réservations
  });
};

const deleteReservation = (id, callback) => {
    // Récupérer l'ID du projecteur associé à la réservation
    const getGetProjectorId = `
      SELECT projector_id FROM reservations WHERE id = ?;
    `;
  
    db.get(getGetProjectorId, [id], (err, row) => {
      if (err) {
        callback(err, null);
        return;
      }
  
      if (!row) {
        callback(null, 0); // Aucune réservation trouvée
        return;
      }
  
      const projectorId = row.projector_id;
  
      // Supprimer la reservation
      const queryDeleteReservation = `
        DELETE FROM reservations WHERE id = ?;
      `;
  
      db.run(queryDeleteReservation, [id], function (err) {
        if (err) {
          callback(err, null);
          return;
        }
  
        // restaurer la disponibilite du projecteur
        const queryUpdateProjector = `
          UPDATE projectors SET disponible = 'oui' WHERE id = ?;
        `;
  
        db.run(queryUpdateProjector, [projectorId]);
      });
    });
  };
 
module.exports = { addReservation, getAllReservations, deleteReservation };
