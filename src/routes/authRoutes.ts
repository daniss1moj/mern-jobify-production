import express from "express";

const router = express.Router();
import rateLimit from "express-rate-limit";
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 15,
	message: "Too many request from this IP, please try again after 15 minutes",
});

import { register, login, updateUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authMiddleware, testUser, updateUser);

export default router;
