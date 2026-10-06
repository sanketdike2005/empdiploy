import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getDashboardStats,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/stats", getDashboardStats);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);

router.post("/", authorize("admin", "manager"), upload.single("profileImage"), createEmployee);
router.put("/:id", authorize("admin", "manager"), upload.single("profileImage"), updateEmployee);
router.delete("/:id", authorize("admin"), deleteEmployee);

export default router;
