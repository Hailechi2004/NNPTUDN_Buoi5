require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/database");
const User = require("./models/User");
const Role = require("./models/Role");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "User & Role Management API is running" });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

const PORT = process.env.PORT || 5000;

// Khởi động server
const startServer = async () => {
  try {
    // Tạo database trước
    await connectDB();

    // Sau đó sync models
    await sequelize.sync();
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
