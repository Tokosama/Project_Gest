const userQueries = require("../database/userQueries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//controller de register
const register = async (req, res) => {
  console.log("📩 Données reçues :", req.body); // Ajout du log

  const { username, role, email } = req.body;
  let { password } = req.body;

  // Vérifier si les données sont bien reçues
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Hashage du mot de passe
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  // Enregistrement de l'utilisateur
  userQueries.addUser(username, password, role, email, (err, userId) => {
    if (err) {
      console.error("Erreur lors de l'ajout :", err); // Ajout du log d'erreur
      res
        .status(500)
        .json({ error: "Erreur lors de l'ajout de l'utilisateur." });
    } else {
      res
        .status(201)
        .json({ message: "Utilisateur ajouté avec succès", userId });
    }
  });
};
function createJWT(id, name, email, role) {
  return jwt.sign(
    { userId: id, email: email, userName: name, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
}

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.headers);
  try {
    if (!email || !password) {
      throw new Error("Email et mot de passe requis.");
    }

    userQueries.getUserByEmail(email, async (err, user) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'utilisateur." });
      } else if (!user) {
        //non existance de l'utilisateur
        res.status(404).json({ error: "Utilisateur non trouvé." });
      } else {
        //verification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        //creation du token
        const token = createJWT(user.id, user.username, user.email, user.role);
        res.json({ user: { username: user.username }, token });
      }
    });
  } catch (err) {
    console.error("Erreur :", err.message);

    let statusCode = 500; // Par défaut, erreur serveur
    if (err.message === "Utilisateur non trouvé.") statusCode = 404;
    if (err.message === "Mot de passe incorrect.") statusCode = 401;

    res.status(statusCode).json({ error: err.message });
  }
};
const getUserByUsername = (req, res) => {
  const { username } = req.params;
  userQueries.getUserByUsername(username, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'utilisateur." });
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
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des utilisateurs." });
    } else {
      res.status(200).json(users);
    }
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password, role, email } = req.body;
  userQueries.updateUser(
    id,
    username,
    password,
    role,
    email,
    (err, changes) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
      } else if (changes === 0) {
        res.status(404).json({ error: "Utilisateur non trouvé." });
      } else {
        res
          .status(200)
          .json({ message: "Utilisateur mis à jour avec succès." });
      }
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userQueries.deleteUser(id, (err, changes) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'utilisateur." });
    } else if (changes === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    } else {
      res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    }
  });
};

module.exports = {
  register,
  login,
  getUserByUsername,
  getAllUsers,
  updateUser,
  deleteUser,
};
