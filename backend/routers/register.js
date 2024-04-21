import express from "express";
import { getRegisters } from "../controllers/register.js";
const router = express.Router();
router.get("/registerlog", getRegisters);
export default router;