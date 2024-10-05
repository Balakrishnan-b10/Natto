import express from "express";
import SignupController from "../controller/Signupcontroller.js";
import { submitContactForm } from "../controller/contactController.js";
import { getAllContacts } from "../controller/contactController.js";

const router = express.Router();

router.post("/register", SignupController.register);
router.post("/login", SignupController.login);
router.post("/verify", SignupController.verifyUser);
router.get("/user/:id", SignupController.getUser);
router.put("/updaterestaurant/:id", SignupController.updateRestaurant);
router.put("/updatemenuitems/:id", SignupController.updateMenuItems);
router.get("/getall", SignupController.getAllRestaurants);

// Contact Routes
// POST: Submit the contact form
router.post("/submit", submitContactForm);

// GET: Retrieve all contact form submissions for the admin dashboard
router.get("/all", getAllContacts);

export default router;
