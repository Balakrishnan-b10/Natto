// server.js
import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import signupRoutes from './route/Signuproute.js';
import loginRoutes from './route/Signuproute.js';
import contactRoutes from './route/Signuproute.js';
import adminRoutes from './route/adminRoutes.js';
import restaurantRoutes from './route/restaurantRoutes.js';
import menuRoutes from "./route/menuRoutes.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Define __dirname for ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup for file handling (e.g., 'logo' field)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsPath = path.join(__dirname, 'uploads');
    cb(null, uploadsPath);  // Save files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Create unique filenames
  }
});

const upload = multer({ storage });

// Admin Routes
app.use('/admin', adminRoutes);

// Signup Routes
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);

// Contact Routes
app.use('/contact', contactRoutes);

// Use the restaurant routes
app.use('/restaurant', upload.single('logo'), restaurantRoutes);

// Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/menu", menuRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/natto')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
