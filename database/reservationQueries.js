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
  const getProjectorIdQuery = `
    SELECT projector_id FROM reservations WHERE id = ?;
  `;

  db.get(getProjectorIdQuery, [id], (err, row) => {
    if (err) {
      return callback(err, null);
    }

    if (!row) {
      return callback(null, 0); // Aucune réservation trouvée
    }

    const projectorId = row.projector_id;

    // Supprimer la réservation
    const deleteReservationQuery = `
      DELETE FROM reservations WHERE id = ?;
    `;

    db.run(deleteReservationQuery, [id], function (err) {
      if (err) {
        return callback(err, null);
      }

      // Restaurer la disponibilité du projecteur
      const updateProjectorQuery = `
        UPDATE projectors SET disponible = 'oui' WHERE id = ?;
      `;

      db.run(updateProjectorQuery, [projectorId], function (err) {
        if (err) {
          return callback(err, null);
        }

        // Terminer la requête en appelant le callback
        callback(null, this.changes);
      });
    });
  });
};


  const getProjectorAvailability = (projectorId, callback) => {
    const query = `
      SELECT disponible FROM projectors 
      WHERE id = ?;
    `;

    console.log("Avant l'exécution de la requête");

    db.get(query, [projectorId], (err, row) => {
        if (err) {
            return callback(err, null);
        }
        
        console.log("Résultat SQL :", row); // Pour voir le résultat retourné
        
        // Si `row` existe et `disponible` est "oui", alors le projecteur est disponible
        const isAvailable = row && row.disponible === "oui";
        callback(null, isAvailable);
    });

    console.log("Après l'exécution de la requête (attention, c'est asynchrone)");
};
  
  module.exports = { getProjectorAvailability, addReservation, getAllReservations, deleteReservation };
  
 