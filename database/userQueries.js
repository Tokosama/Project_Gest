const db = require("../config/database");


// Fonction pour ajouter un utilisateur
const addUser = (username, hashedPassword, role = "etudiant", email, callback) => {
  const query = `INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)`;
  db.run(query, [username, hashedPassword, role, email], function (err) {
      if (err) {
          return callback(err, null);
      }
      callback(null, this.lastID);
  });
};


// Trouver un utilisateur par son nom d'utilisateur
const getUserByEmail = (email, callback) => {
  const query = `
    SELECT * FROM users WHERE email = ?;
  `;
  db.get(query, [email], (err, row) => {
    callback(err, row);
  });
};

// Mettre à jour un utilisateur
const updateUser = (id, username, password, role, email, userRole, callback) => {
  if (userRole !== "administrateur") {
      return callback(new Error("Seuls les administrateurs peuvent modifier les rôles"), null);
  }

  const query = `
      UPDATE users SET username = ?, password = ?, role = ?, email = ?
      WHERE id = ?;
  `;
  db.run(query, [username, password, role, email, id], function (err) {
      callback(err, this.changes);
  });
};



// Supprimer un utilisateur
const deleteUser = (id, callback) => {
  const query = `
    DELETE FROM users WHERE id = ?;
  `;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};

// Récupérer tous les utilisateurs
const getAllUsers = (callback) => {
  const query = `
    SELECT * FROM users;
  `;
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
};


module.exports = {  addUser, getUserByEmail, updateUser, deleteUser, getAllUsers };
