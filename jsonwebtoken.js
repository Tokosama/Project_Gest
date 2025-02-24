const jwt = require('jsonwebtoken');

// Récupérer la clé secrète du fichier .env
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

// Token signé que vous voulez vérifier
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzQwNDA0MjA3LCJleHAiOjE3NDA0MDc4MDd9.QeXoMkOV1b4iL3jGChjDHa7W9lC3yaCRCFAxHZlstlk';

// Vérifier le token
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.log('Le token n\'est pas valide:', err.message);
  } else {
    console.log('Le token est valide. Payload décodé:', decoded);
  }
});
