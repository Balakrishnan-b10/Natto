import bcrypt from "bcrypt";
import Signup from "../model/Signupmodel.js";
import Restaurant from "../model/Restaurant.js";
import { getAllRestaurants, updateRestaurant } from "./restaurantController.js";
const SignupController = {
  async register(req, res) {
    console.log("req.body", req.body);

    try {
      const { name, email, mobileNumber, password, role } = req.body;

      // Validate input data
      // Validate input data
      if (!name || !email || !mobileNumber || !password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "All fields are required" }] });
      }

      // Check if user already exists
      const existingUser = await Signup.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the common HotelUserProfile collection

      // Save the user details in the respective collection
      // if (role === "user") {
      // console.log("userProfile", userProfile);
      const userDetails = new Signup({
        name,
        email,
        mobileNumber,
        password: hashedPassword,
        role,
      });
      await userDetails.save();
      // } else if (role === "hotel") {
      //   const hotelDetails = new Restaurant({
      //     name,
      //     email,
      //     mobileNumber,
      //     password: hashedPassword,
      //     loginId: userProfile._id, // Store the _id of the HotelUserProfile
      //   });
      //   await hotelDetails.save();
      // }

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error.message);
      res.status(500).json({
        errors: [{ msg: "Server error occurred", details: error.message }],
      });
    }
  },

  async login(req, res) {
    console.log("req.body", req.body);
    try {
      const { email, password } = req.body;

      // Validate input data
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Step 1: Find user or hotel from the common login collection
      const user = await Signup.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email not found" });
      }

      // Step 2: Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password Mismatch" });
      }

      // Step 3: Based on userType (hotel or user), fetch their details from the respective collection
      let details;
      let isRestaurantExist = true;

      console.log("user", user);

      details = await Signup.findOne({ _id: user._id }); // Fetch from User collection
      // } else if (user.role === "hotel") {
      //   details = await Restaurant.findOne({ _id: user._id }); // Fetch from Hotel collection
      // }
      console.log("details", details);
      if (!details) {
        return res
          .status(404)
          .json({ message: "Details not found for the user/hotel" });
      }

      if (user.role === "hotel") {
        const restaurantFind = await Restaurant.findOne({ email: user.email });
        console.log("restaurantFind", restaurantFind);

        if (!restaurantFind) {
          isRestaurantExist = false;
        }
      }
      // Step 4: Send response with the _id from the User/Hotel collection
      res.status(200).json({
        message: "Login successful",
        userType: {
          ...(user.role === "hotel" && { isRestaurantExist }),
          role: user.role,
        },
        userId: details._id, // Send the user/hotel _id (from respective collection)
        details: details, // Optionally, you can send more details if needed
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error occurred" });
    }
  },

  async verifyUser(req, res) {
    try {
      const { email } = req.body;
      const user = await Signup.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.verified = true; // Ensure this field exists in your schema
      await user.save();
      res.status(200).json({ message: "User verified successfully" });
    } catch (error) {
      console.error("Error during verification:", error.message);
      res
        .status(500)
        .json({ message: "Server error occurred", details: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await Signup.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      res
        .status(500)
        .json({ message: "Server error occurred", details: error.message });
    }
  },

  async updateRestaurant(req, res) {
    const { id } = req.params;
    const restaurantData = req.body;
    try {
      const user = await Signup.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User  not found" });
      }

      // Update the restaurant field in the user document
      user.restaurant = { ...user.restaurant, ...restaurantData };

      // Log the user data before saving
      console.log("Updated User:", user);

      // Save the updated user document
      await user.save();

      res.status(200).json(user.restaurant); // Send back the updated info
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error updating Area of Interest info",
          error: error.message,
        });
    }
  },

  async updateMenuItems(req, res) {
    const { id } = req.params;
    const newMenuItem = req.body; // The new menu item data

    try {
      const updatedRestaurant = await Signup.findOneAndUpdate(
        { _id: id },
        // Find the restaurant by ID
        { $push: { menuItems: newMenuItem } }, // Push the new menu item to the menuItems array
        { new: true } // Return the updated document
      );

      if (!updatedRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      res.json(updatedRestaurant); // Respond with the updated restaurant data
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
  async getAllRestaurants(req, res) {
    try {
      const restaurants = await Signup.find();
      res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({
        message: "Server error occurred while fetching restaurants",
        error: error.message,
      });
    }
  },
};

export default SignupController;
