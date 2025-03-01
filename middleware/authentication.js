const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Récupère le header Authorization qui contient le token

    if (!authHeader || !authHeader.startsWith("Bearer ")) {//Bearer est une convention dans ce genre de cas
        return res.status(401).json({ error: "Accès non autorisé, token manquant" });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
        req.user = payload; 
        next(); 
    } catch (err) {
        res.status(403).json({ error: "Token invalide" });
    }
};


module.exports = authMiddleware;
