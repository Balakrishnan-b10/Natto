import mongoose from "mongoose";
const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  foodImg: {
    type: String,
    required: true,
  },
});
// Define the schema for the restaurant
const restaurantSchema = new mongoose.Schema({
  ownername: {
    type: String,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  logo: {
    type: String, // Assuming logo is stored as a URL or filename
  },

  category: {
    type: String,
    required: true,
  },
  operatingHours: {
    open: {
      type: String,
    },
    close: {
      type: String,
    },
  },
  cuisineType: {
    type: String,
    required: true,
  },
  hotelType: {
    type: String,
    enum: ["Standard", "Premium", "Luxury"], // Example options
    default: "Standard",
  },

  paymentOptions: {
    type: [String],
  },
  orderProcessInstructions: {
    type: String,
  },
  about: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"], // Example options
    default: "Pending",
  },

  menuItems: [MenuItemSchema],
});

// Create a model based on the schema
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
