import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "../css/Addmenu.css"; // Import external CSS file

const Addmenu = () => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    foodImg: "",
  });
  const [userName, setUserName] = useState(""); // State to hold the user's name

  const navigate = useNavigate(); // Hook to navigate programmatically
  const restaurantId = localStorage.getItem("id"); // Get restaurant ID from localStorage

  // Set logged-in user's name when the component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // Assuming userName is stored in localStorage
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleChange = (event) => {
    setMenuItem({ ...menuItem, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/signup/updatemenuitems/${restaurantId}`,
        menuItem
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id"); // Remove user ID
    localStorage.removeItem("userName"); // Remove user name
    localStorage.removeItem("token"); // Remove token (if used)
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div>
      {/* Header section */}
      <div className="headermenu">
        <span className="welcome-message">Welcome, {userName}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Form section */}
      <div className="containermenu">
      <form className="menu-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label className="label">Name:</label>
    <input
      type="text"
      name="name"
      className="input-field"
      value={menuItem.name}
      onChange={handleChange}
    />
  </div>
  
  <div className="form-group">
    <label className="label">Description:</label>
    <input
      type="text"
      name="description"
      className="input-field"
      value={menuItem.description}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label className="label">Price:</label>
    <input
      type="number"
      name="price"
      className="input-field"
      value={menuItem.price}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label className="label">Food Image:</label>
    <input
      type="text"
      name="foodImg"
      className="input-field"
      value={menuItem.foodImg}
      onChange={handleChange}
    />
  </div>

  <button type="submit" className="submit-button">Update Menu Item</button>
</form>
      </div>
    </div>
  );
};

export default Addmenu;
