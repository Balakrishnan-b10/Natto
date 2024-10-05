import express from "express";
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controller/menuController.js";
import multer from "multer";
import path from "path";

// Set up router
const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Menu item routes
router.post("/create", upload.single("foodImg"), createMenuItem);
router.get("/get", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.put("/:id", upload.single("foodImg"), updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
