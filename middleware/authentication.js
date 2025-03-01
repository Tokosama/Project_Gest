const jwt = require("jsonwebtoken");
const db = require("../config/database"); // Assure-toi que c'est bien la connexion à ta BDD
require("dotenv").config(); // Charge les variables d'environnement


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Récupère le header Authorization qui contient le token

    if (!authHeader || !authHeader.startsWith("Bearer ")) {//Bearer est une convention dans ce genre de cas
        return res.status(401).json({ error: "Accès non autorisé, token manquant" });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
        req.user = payload; // Attache les infos de l'utilisateur au `req.user`
        next(); 
    } catch (err) {
        res.status(403).json({ error: "Token invalide" });
    }
};

// Middleware pour vérifier si l'utilisateur est un administrateur avant de permettre l'inscription avec ce rôle
// authMiddleware.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') { // Supposons que tu as un utilisateur avec un champ `role`
      return next(); // L'utilisateur est un administrateur, autoriser l'accès
    } else {
      return res.status(403).json({ error: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
  };
  


module.exports = { authMiddleware, isAdmin };
