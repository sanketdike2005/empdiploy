import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import sequelize from "./config/db.js";
import { User } from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.json({ message: "Employee Management API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.use(notFound);
app.use(errorHandler);

const createDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const existing = await User.findOne({ where: { email } });

  if (!existing) {
    const password = process.env.ADMIN_PASSWORD || "Admin@123";
    await User.create({
      name: process.env.ADMIN_NAME || "System Admin",
      email,
      password: await bcrypt.hash(password, 10),
      role: "admin",
    });
    console.log(`Default admin created: ${email}`);
  }
};

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");

    await sequelize.sync({ alter: true });
    console.log("Database tables synced");

    await createDefaultAdmin();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

start();
