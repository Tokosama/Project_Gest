const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const { returnUser } = require("../controllers/profileController");

// "" car "/profile" est deja present dans le server.js
router.get("", returnUser);

module.exports = router;
