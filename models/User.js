const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Role = require("./Role");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    avatarUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://i.sstatic.net/l60Hf.png",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
      allowNull: true,
    },
    loginCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "users",
  },
);

// Liên kết với Role
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

// Scope tự động loại trừ bản ghi bị xóa mềm
User.addScope("active", {
  where: { isDeleted: false },
  include: [{ model: Role, as: "role" }],
});

// Mặc định sử dụng scope active
User.addScope(
  "defaultScope",
  {
    where: { isDeleted: false },
  },
  { override: true },
);

module.exports = User;
