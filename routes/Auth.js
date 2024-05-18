import express from "express";
import { register, login, logout, getUser } from "../controllers/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:id",getUser);
export default router;