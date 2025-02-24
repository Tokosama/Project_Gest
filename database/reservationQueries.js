const db = require("../config/database");

const addReservation = (
  userId,
  projectorId,
  reservationStart,
  reservationEnd,
  callback
) => {
  const query = `
      INSERT INTO reservations (user_id, projector_id, reservation_start, reservation_end)
      VALUES (?, ?, ?, ?);
    `;
  db.run(
    query,
    [userId, projectorId, reservationStart, reservationEnd],
    function (err) {
      callback(err, this.lastID); // Renvoie l'ID de la réservation ajoutée
    }
  );
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
  const query = `
      DELETE FROM reservations WHERE id = ?;
    `;
  db.run(query, [id], function (err) {
    callback(err, this.changes); // Renvoie le nombre de lignes supprimées
  });
};

const checkDispo = (id, callback) => {
  const query = `
        SELECT * FROM reservations WHERE projector_id = ?;
      `;
  db.get(query, [id], (err, row) => {
    callback(err, row);
  });
};

// checkDispo(1, (err, reservations) => {
//   if (!reservations) {
//     console.log("ras")
//   } else {
//     console.log(reservations)
//   }
// });
module.exports = {checkDispo, addReservation, getAllReservations, deleteReservation };
