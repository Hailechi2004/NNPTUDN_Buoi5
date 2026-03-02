const { Sequelize } = require("sequelize");

// Kết nối tạm thời để tạo database
const tempSequelize = new Sequelize(
  "mysql",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  },
);

// Kết nối chính
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  },
);

const connectDB = async () => {
  try {
    // Tạo database nếu chưa tồn tại
    await tempSequelize.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
    );
    console.log(`Database '${process.env.DB_NAME}' created or already exists`);

    await tempSequelize.close();

    // Kết nối đến database chính
    await sequelize.authenticate();
    console.log("MySQL connected successfully");
  } catch (error) {
    console.error("MySQL connection error:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
