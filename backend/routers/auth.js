import express from "express";
import {login, register, logout, passwordCheck, passwordUpdate, doYouHavePassw, checkRestriction} from "../controllers/auth.js"
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout);
router.put("/newpassword", passwordUpdate);
router.get("/password/:id", passwordCheck);
router.get("/password",doYouHavePassw);
router.get("/restriction", checkRestriction);
export default router