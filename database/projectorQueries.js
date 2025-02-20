const db = require("../config/database");

// Ajouter un projecteur
const addProjector = (name, callback) => {
  const query = `
    INSERT INTO projectors (name)
    VALUES (?);
  `;
  db.run(query, [name], function (err) {
    callback(err, this.lastID);
  });
};

// Mettre à jour l'état d'un projecteur
const updateProjectorStatus = (id, status, reservationStart, reservationEnd, callback) => {
  const query = `
    UPDATE projectors SET status = ?, reservation_start = ?, reservation_end = ?
    WHERE id = ?;
  `;
  db.run(query, [status, reservationStart, reservationEnd, id], function (err) {
    callback(err, this.changes);
  });
};

// Récupérer un projecteur par son ID
const getProjectorById = (id, callback) => {
  const query = `
    SELECT * FROM projectors WHERE id = ?;
  `;
  db.get(query, [id], (err, row) => {
    callback(err, row);
  });
};

// Récupérer tous les projecteurs
const getAllProjectors = (callback) => {
  const query = `
    SELECT * FROM projectors;
  `;
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
};

// Supprimer un projecteur
const deleteProjector = (id, callback) => {
  const query = `
    DELETE FROM projectors WHERE id = ?;
  `;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};

module.exports = { addProjector, updateProjectorStatus, getProjectorById, getAllProjectors, deleteProjector };
