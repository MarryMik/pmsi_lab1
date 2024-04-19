import express from "express";
import { getLogs } from "../controllers/logs";
const router = express.Router();
router.get("/logginglog", getLogs);
export default router;