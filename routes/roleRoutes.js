const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

// CREATE - POST /api/roles
router.post("/", roleController.createRole);

// READ - GET /api/roles
router.get("/", roleController.getAllRoles);

// READ - GET /api/roles/:id
router.get("/:id", roleController.getRoleById);

// UPDATE - PUT /api/roles/:id
router.put("/:id", roleController.updateRole);

// DELETE - DELETE /api/roles/:id (soft delete)
router.delete("/:id", roleController.deleteRole);

module.exports = router;
