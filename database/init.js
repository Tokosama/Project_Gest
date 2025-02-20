const db = require("../config/database");

const createTables = () => {
  // Table des utilisateurs
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('etudiant', 'enseignant', 'administrateur')),
      email TEXT NOT NULL UNIQUE
    );
  `;

  // Table des projecteurs
  const createProjectorsTable = `
    CREATE TABLE IF NOT EXISTS projectors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      status TEXT CHECK(status IN ('disponible', 'réservé', 'en maintenance')) DEFAULT 'disponible',
      reservation_start DATETIME,
      reservation_end DATETIME
    );
  `;

  // Exécuter les requêtes SQL pour créer les tables
  db.serialize(() => {
    db.run(createUsersTable, (err) => {
      if (err) {
        console.error("Erreur lors de la création de la table des utilisateurs :", err.message);
      } else {
        console.log("Table des utilisateurs créée avec succès !");
      }
    });

    db.run(createProjectorsTable, (err) => {
      if (err) {
        console.error("Erreur lors de la création de la table des projecteurs :", err.message);
      } else {
        console.log("Table des projecteurs créée avec succès !");
      }
    });
  });
};

// Appeler la fonction pour créer les tables
createTables();
