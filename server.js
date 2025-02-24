const db = require("./config/database");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRouter = require('./routes/auth')
const projectorsRouter = require('./routes/projectors')
const reservationRouter = require('./routes/reservation')

dotenv.config();

// Middleware pour traiter les données JSON
app.use(express.json());
//routes 
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/projectors',projectorsRouter)
app.use('/api/v1/reservation',reservationRouter)


app.get("/", (req, res) => {
  res.send("jobs api");
});
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});