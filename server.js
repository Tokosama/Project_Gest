const db = require("./config/database");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//import route
const authRouter = require('./routes/auth')
const projectorsRouter = require('./routes/projectors')
const reservationRouter = require('./routes/reservation')
const profileRouter = require('./routes/profile')
const usersRouter = require('./routes/users');
//import middleware
const { authMiddleware } = require("./middleware/authentication");
// Middleware pour traiter les données JSON
app.use(express.json());







//(Veuillez lire le readme pour plus dinformation)




//routes 
app.use('/auth',authRouter);
app.use('/projectors',projectorsRouter);
app.use('/reservation',reservationRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/users', authMiddleware, usersRouter); 



app.get("/", (req, res) => {
  res.send("Bienvenue sur notre API de gestion de Projecteur");
});
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});