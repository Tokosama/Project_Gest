const express = require("express");
const router = express.Router();
const { addProjector, getAllProjectors,getAllDispoProjectors, updateProjectorStatus, deleteProjector } = require("../controllers/projectorController");

router.route("/").post(addProjector).get(getAllDispoProjectors);
router.route("/:id").patch(updateProjectorStatus).delete(deleteProjector);

module.exports = router;
