import express from "express";
import { getLogs } from "../controllers/logs.js";
const router = express.Router();
router.get("/logginglog", getLogs);
export default router;