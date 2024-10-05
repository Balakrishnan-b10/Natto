import mongoose from "mongoose";

// Define the MenuItem schema
const MenuItemSchema = new mongoose.Schema(
  {
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
  },
  { _id: false }
);

// Define the Restaurant schema
const RestaurantSchema = new mongoose.Schema(
  {
    ownername: {
      type: String,
      // required: true,
    },
    restaurantName: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
    },
    address: {
      type: String,
      // required: true,
    },
    pincode: {
      type: String,
      // required: true,
    },
    logo: {
      type: String, // Assuming logo is stored as a URL or filename
    },
    category: {
      type: String,
      // required: true,
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
      // required: true,
    },
    hotelType: {
      type: String,
      enum: ["Standard", "Premium", "Luxury"],
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
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    // Embed MenuItemSchema here
  },
  { _id: false }
);

// Define the updated Signup schema
const SignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "hotel"], // Valid roles
    required: true,
  },
  restaurant: RestaurantSchema,
  menuItems: [MenuItemSchema], // Embed RestaurantSchema here
});

// Create the Signup model
const Signup = mongoose.model("Signup", SignupSchema);
export default Signup;
