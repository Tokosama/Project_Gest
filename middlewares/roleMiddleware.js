const roleMiddleware = (role) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role || req.user.role !== role) {
        return res.status(403).json({ message: 'Accès interdit. Vous n\'avez pas les droits nécessaires' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  