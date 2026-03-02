const User = require("../models/User");
const Role = require("../models/Role");

// CREATE - Tạo user mới
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, roleId } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Username, password, and email are required",
      });
    }

    const existingUsername = await User.findOne({
      where: { username, isDeleted: false },
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({
      where: { email, isDeleted: false },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      username,
      password,
      email,
      fullName: fullName || "",
      avatarUrl: avatarUrl || "https://i.sstatic.net/l60Hf.png",
      roleId: roleId || null,
      status: false,
      loginCount: 0,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// READ - Lấy tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isDeleted: false },
      include: [{ model: Role, as: "role" }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      users: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// READ - Lấy user theo ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id, isDeleted: false },
      include: [{ model: Role, as: "role" }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// UPDATE - Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, fullName, avatarUrl, roleId } = req.body;

    const user = await User.findOne({ where: { id, isDeleted: false } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({
        where: { username, isDeleted: false },
      });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({
        where: { email, isDeleted: false },
      });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (password) user.password = password;
    if (fullName !== undefined) user.fullName = fullName;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
    if (roleId !== undefined) user.roleId = roleId;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// DELETE - Xóa mềm user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, isDeleted: false } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isDeleted = true;
    await user.save();

    res.status(200).json({
      message: "User deleted successfully (soft delete)",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// POST - Enable user (set status = true)
exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        message: "Email and username are required",
      });
    }

    const user = await User.findOne({
      where: { email, username, isDeleted: false },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found or invalid credentials",
      });
    }

    user.status = true;
    await user.save();

    res.status(200).json({
      message: "User enabled successfully",
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error enabling user", error: error.message });
  }
};

// POST - Disable user (set status = false)
exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        message: "Email and username are required",
      });
    }

    const user = await User.findOne({
      where: { email, username, isDeleted: false },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found or invalid credentials",
      });
    }

    user.status = false;
    await user.save();

    res.status(200).json({
      message: "User disabled successfully",
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error disabling user", error: error.message });
  }
};
