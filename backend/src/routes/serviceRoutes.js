const router = require("express").Router();
const { authRequired, adminOnly } = require("../middleware/auth");
const { createService, getServices, updateService, deleteService } = require("../controllers/serviceController");

router.get("/", getServices);

// admin
router.post("/", authRequired, adminOnly, createService);
router.put("/:id", authRequired, adminOnly, updateService);
router.delete("/:id", authRequired, adminOnly, deleteService);

module.exports = router;
