
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé, permissions insuffisantes" });
        }
        next();
    };
};

module.exports = { checkRole };
