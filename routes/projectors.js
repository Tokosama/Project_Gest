const express = require("express");
const router = express.Router();
const { addProjector, getAllProjectors, updateProjectorStatus, deleteProjector } = require("../controllers/projectorController");

router.route("/").post(addProjector).get(getAllProjectors);
router.route("/:id").patch(updateProjectorStatus).delete(deleteProjector);

module.exports = router;
