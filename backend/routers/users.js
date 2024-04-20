import express from "express"
import{
    updateUser,
    deleteUser,
    getUsers,
    getUser,
    createUser,
    checkQueshions
} from "../controllers/users.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"
const router = express.Router();
router.get("/", verifyAdmin, getUsers);
router.get("/:id", verifyUser, getUser);
router.delete("/:id", verifyAdmin, deleteUser);
router.put("/api/:id", verifyUser, updateUser);
router.post("/new", verifyUser, createUser);
router.get("/questions/:id", checkQueshions);
export default router;