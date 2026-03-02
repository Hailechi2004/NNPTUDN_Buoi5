const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CREATE - POST /api/users
router.post("/", userController.createUser);

// READ - GET /api/users
router.get("/", userController.getAllUsers);

// READ - GET /api/users/:id
router.get("/:id", userController.getUserById);

// UPDATE - PUT /api/users/:id
router.put("/:id", userController.updateUser);

// DELETE - DELETE /api/users/:id (soft delete)
router.delete("/:id", userController.deleteUser);

// POST - /api/users/enable (enable user)
router.post("/enable", userController.enableUser);

// POST - /api/users/disable (disable user)
router.post("/disable", userController.disableUser);

module.exports = router;
