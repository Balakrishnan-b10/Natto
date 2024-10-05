import MenuItem from "../model/Menuitems.js";

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, restaurantId } = req.body;

    console.log("req.body", req.body);
    console.log("req.file:", req.file);
    const newItem = new MenuItem({
      name,
      description,
      price,
      foodImg: `/uploads/${req.file.originalname}`,
      restaurantId,
    });
    console.log(req.body);

    await newItem
      .save()
      .then((savedItem) => {
        console.log("Item saved:", savedItem); // Log saved item
      })
      .catch((error) => {
        console.error("Error saving item:", error); // Log the error
      });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating menu item" });
  }
};

// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items" });
  }
};

// Get a menu item by ID
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu item" });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, restaurantid } = req.body;

    const updateData = {
      name,
      description,
      price,
      restaurantid,
    };

    if (req.file) {
      updateData.foodImg = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item" });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item" });
  }
};
