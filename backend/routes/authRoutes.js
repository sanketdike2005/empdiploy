import express from "express";
import { login, me, register } from "../controllers/authController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, me);
router.post("/register", protect, authorize("admin"), register);

export default router;
