import express from "express";
import {login, register, logout, passwordCheck, passwordUpdate} from "../controllers/auth.js"
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout);
router.put("/newpassword/:id", passwordUpdate);
router.get("/password/:id", passwordCheck);
export default router