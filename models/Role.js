const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "roles",
  },
);

// Scope tự động loại trừ bản ghi bị xóa mềm
Role.addScope("active", {
  where: { isDeleted: false },
});

// Mặc định sử dụng scope active
Role.addScope(
  "defaultScope",
  {
    where: { isDeleted: false },
  },
  { override: true },
);

module.exports = Role;
