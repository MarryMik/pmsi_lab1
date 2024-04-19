import express from "express";
import { getRegisters } from "../controllers/register";
const router = express.Router();
router.get("/registerlog", getRegisters);
export default router;