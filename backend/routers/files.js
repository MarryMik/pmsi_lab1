import express from "express";
import { createFile, deleteFile, getFiles, getFile, updateFile } from "../controllers/files";
const router = express.Router();
router.get("/", getFiles);
router.get("/:id", getFile);
router.put("/api/:id", updateFile);
router.delete("/:id", deleteFile);
router.post("/new",createFile);
  
export default router;