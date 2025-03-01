const express = require("express");
const router = express.Router();
const { addReservation, getAllReservations, deleteReservation } = require("../controllers/reservationController");

router.route("/").post(addReservation).get(getAllReservations);
router.route("/:id").delete(deleteReservation);

module.exports = router;
