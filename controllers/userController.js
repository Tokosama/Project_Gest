const userQueries = require("../database/userQueries");

const addUser = (req, res) => {
  const { username, password, role, email } = req.body;
  userQueries.addUser(username, password, role, email, (err, userId) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur." });
    } else {
      res.status(201).json({ message: "Utilisateur ajouté avec succès", userId });
    }
  });
};

const getUserByUsername = (req, res) => {
  const { username } = req.params;
  userQueries.getUserByUsername(username, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur." });
    } else if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    } else {
      res.status(200).json(user);
    }
  });
};

const getAllUsers = (req, res) => {
  userQueries.getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
    } else {
      res.status(200).json(users);
    }
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password, role, email } = req.body;
  userQueries.updateUser(id, username, password, role, email, (err, changes) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
    } else if (changes === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    } else {
      res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    }
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userQueries.deleteUser(id, (err, changes) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    } else if (changes === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    } else {
      res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    }
  });
};

module.exports = { addUser, getUserByUsername, getAllUsers, updateUser, deleteUser };
