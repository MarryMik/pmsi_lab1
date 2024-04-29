import express from "express";
import { createFile, deleteFile, getFiles, updateFile } from "../controllers/files.js";
const router = express.Router();
router.get("/:id", getFiles);
router.put("/api/:id", updateFile);
router.delete("/:id", deleteFile);
router.post("/new",createFile);
  
export default router;