import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import getUsersForSidebar from "../controllers/userController.js";

// import { getMessages, sendMessage } from "../controllers/messageController.js";
const router=express.Router()
router.get("/",protectRoute,getUsersForSidebar)

// router.post("/send/:id",sendMessage)
export default router