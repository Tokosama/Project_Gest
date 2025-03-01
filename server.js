const db = require("./config/database");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
//import route
const authRouter = require('./routes/auth')
const projectorsRouter = require('./routes/projectors')
const reservationRouter = require('./routes/reservation')
const profileRouter = require('./routes/profile')
//import middleware
const authenticateUser = require("./middleware/authentication");



dotenv.config();

// Middleware pour traiter les données JSON
app.use(express.json());

//routes 
app.use('/auth',authRouter)
app.use('/projectors',projectorsRouter)
app.use('/reservation',reservationRouter)
app.use('/profile', authenticateUser,profileRouter)



app.get("/", (req, res) => {
  res.send("jobs api");
});
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});