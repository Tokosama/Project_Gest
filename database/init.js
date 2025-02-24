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

  // Nouvelle table des projecteurs sans reservation_start et reservation_end
  const createProjectorsTable = `
    CREATE TABLE IF NOT EXISTS projectors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      disponible TEXT CHECK(disponible IN ('oui', 'non')) DEFAULT 'oui',
      fonctionnel TEXT CHECK(fonctionnel IN ('oui', 'non')) DEFAULT 'oui'

    );
  `;

  // Nouvelle table des réservations
  const createReservationsTable = `
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      projector_id INTEGER NOT NULL,
      reservation_start DATETIME NOT NULL,
      reservation_end DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (projector_id) REFERENCES projectors(id)
    );
  `;

  // Exécuter les requêtes SQL pour créer les tables
  db.serialize(() => {
    // Créer la table des utilisateurs
    db.run(createUsersTable, (err) => {
      if (err) {
        console.error("Erreur lors de la création de la table des utilisateurs :", err.message);
      } else {
        console.log("Table des utilisateurs créée avec succès !");
      }
    });

    // Créer la nouvelle table des projecteurs
    db.run(createProjectorsTable, (err) => {
      if (err) {
        console.error("Erreur lors de la création de la table des projecteurs :", err.message);
      } else {
        console.log("Table des projecteurs créée avec succès !");
      }
    });

    // Créer la table des réservations
    db.run(createReservationsTable, (err) => {
      if (err) {
        console.error("Erreur lors de la création de la table des réservations :", err.message);
      } else {
        console.log("Table des réservations créée avec succès !");
      }
    });
  });
};

// Appeler la fonction pour créer les tables
createTables();
