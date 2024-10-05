import express from "express";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addMenuItemToRestaurant,
  getMenuItemsByRestaurant,
  updateMenuItemInRestaurant,
  deleteMenuItemFromRestaurant,
} from "../controller/restaurantController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Route for restaurant registration
router.post("/restaurants", createRestaurant);
router.get("/restaurants", getAllRestaurants);
router.get("/restaurants/:id", getRestaurantById);
router.put("/restaurants/:id", updateRestaurant);
router.delete("/restaurants/:id", deleteRestaurant);

// Menu item routes
router.post("/createmenu", addMenuItemToRestaurant);
router.get("/getmenu/:id", getMenuItemsByRestaurant);
router.put("/updatemenu/:id", updateMenuItemInRestaurant);
router.delete("/deletemenu/:id", deleteMenuItemFromRestaurant);

// PUT request to update a restaurant by ID
router.put("/restaurants/:id", upload.single("logo"), updateRestaurant);

export default router;
