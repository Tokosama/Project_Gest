const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware pour vérifier l'authentification
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
