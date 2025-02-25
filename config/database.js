const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false // Ajoutez d'autres options globales ici si nécessaire
  }
});



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à MySQL :', err.message);
  } else {
    console.log('Connexion à MySQL réussie !');
  }
});

module.exports = sequelize;
