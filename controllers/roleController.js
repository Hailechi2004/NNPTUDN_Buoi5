const Role = require("../models/Role");

// CREATE - Tạo role mới
exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingRole = await Role.findOne({
      where: { name, isDeleted: false },
    });
    if (existingRole) {
      return res.status(400).json({ message: "Role name already exists" });
    }

    const newRole = await Role.create({
      name,
      description: description || "",
    });

    res.status(201).json({
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating role", error: error.message });
  }
};

// READ - Lấy tất cả role
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      where: { isDeleted: false },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      message: "Roles retrieved successfully",
      count: roles.length,
      roles: roles,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: error.message });
  }
};

// READ - Lấy role theo ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findOne({ where: { id, isDeleted: false } });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role retrieved successfully",
      role: role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching role", error: error.message });
  }
};

// UPDATE - Cập nhật role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findOne({ where: { id, isDeleted: false } });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (name && name !== role.name) {
      const existingRole = await Role.findOne({
        where: { name, isDeleted: false },
      });
      if (existingRole) {
        return res.status(400).json({ message: "Role name already exists" });
      }
      role.name = name;
    }

    if (description !== undefined) {
      role.description = description;
    }

    await role.save();

    res.status(200).json({
      message: "Role updated successfully",
      role: role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating role", error: error.message });
  }
};

// DELETE - Xóa mềm role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findOne({ where: { id, isDeleted: false } });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.isDeleted = true;
    await role.save();

    res.status(200).json({
      message: "Role deleted successfully (soft delete)",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: error.message });
  }
};
