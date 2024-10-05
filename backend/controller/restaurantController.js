import Restaurant from "../model/Restaurant.js";
import mongoose from "mongoose";

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    const {
      ownername,
      restaurantName,
      location,
      address,
      pincode,
      logo,
      category,
      cuisineType,
      hotelType,
      paymentOptions,
      orderProcessInstructions,
      about,
      menuItems,
      restaurantId, // Expecting an array of menu items
    } = req.body;

    const newRestaurant = new Restaurant({
      ownername,
      restaurantName,
      location,
      address,
      pincode,
      logo,
      category,
      cuisineType,
      hotelType,
      paymentOptions,
      orderProcessInstructions,
      about,
      restaurantId,
      menuItems, // Save the menu items along with the restaurant
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res
      .status(500)
      .json({ message: "Server error occurred", error: error.message });
  }
};

export const addMenuItemToRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params; // The ID of the restaurant
    const { name, description, price } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Add new menu item to the restaurant's menuItems array
    restaurant.menuItems.push({
      name,
      description,
      price,
      foodImg: `/uploads/${req.file.originalname}`,
    });

    const updatedRestaurant = await restaurant.save();
    res.status(200).json({
      message: "Menu item added successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding menu item", error: error.message });
  }
};

export const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant.menuItems); // Return the menu items array
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu items", error: error.message });
  }
};

export const updateMenuItemInRestaurant = async (req, res) => {
  try {
    const { restaurantId, menuItemId } = req.params;
    const { name, description, price } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Find the menu item in the menuItems array
    const menuItem = restaurant.menuItems.id(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Update menu item fields
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    if (req.file) {
      menuItem.foodImg = `/uploads/${req.file.filename}`;
    }

    const updatedRestaurant = await restaurant.save();
    res.status(200).json({
      message: "Menu item updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating menu item", error: error.message });
  }
};

export const deleteMenuItemFromRestaurant = async (req, res) => {
  try {
    const { restaurantId, menuItemId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Remove the menu item from the array
    restaurant.menuItems = restaurant.menuItems.filter(
      (item) => item._id.toString() !== menuItemId
    );

    const updatedRestaurant = await restaurant.save();
    res.status(200).json({
      message: "Menu item deleted successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting menu item", error: error.message });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({
      message: "Server error occurred while fetching restaurants",
      error: error.message,
    });
  }
};

// Get a single restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Optional: Remove ObjectId validation if restaurantId is a custom ID
    // Or you can add a custom validation if required

    const restaurant = await Restaurant.findOne({ restaurantId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    res.status(500).json({
      message: "Server error occurred while fetching restaurant",
      error: error.message,
    });
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({
      message: "Server error occurred while updating restaurant",
      error: error.message,
    });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({
      message: "Server error occurred while deleting restaurant",
      error: error.message,
    });
  }
};
