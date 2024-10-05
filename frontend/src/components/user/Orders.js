import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Input, Rate, Checkbox } from "antd"; // Ant Design components
import { useNavigate } from "react-router-dom"; // React Router hook
import { CartContext } from "../../utils/CartContext"; // Your Cart Context
import Footer from "./Footer"; // Your Footer component
import Header from "./Header"; // Your Header component
import axios from "axios";

const { Meta } = Card; // Destructuring Meta from Card component
const { Search } = Input; // Destructuring Search from Input component

const Orders = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants); // Initially filtered to show all

  // Fetch restaurants and their menu items
  const getRestaurant = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/signup/getall`); // Adjust the URL to your backend route
      setRestaurants(response.data);
      setFilteredRestaurants(response.data); // Set initially filtered data to all restaurants
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  const [filters, setFilters] = useState({
    search: "",
    veg: false,
    nonVeg: false,
  });

  // Handle search and filters (as before)
  const handleSearch = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  useEffect(() => {
    let filteredData = restaurants;

    // Filter by search keyword
    if (filters.search) {
      filteredData = filteredData.filter((restaurant) =>
        restaurant.restaurant.restaurantName
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    // Filter by Veg and Non-Veg options
    if (filters.veg && !filters.nonVeg) {
      filteredData = filteredData.filter(
        (restaurant) => restaurant.restaurant.cuisineType === "Veg"
      );
    } else if (filters.nonVeg && !filters.veg) {
      filteredData = filteredData.filter(
        (restaurant) => restaurant.restaurant.cuisineType === "Non-Veg"
      );
    } else if (filters.veg && filters.nonVeg) {
      filteredData = filteredData.filter(
        (restaurant) => restaurant.restaurant.cuisineType === "Both"
      );
    }

    // Filter by role (hotel)
    filteredData = filteredData.filter(
      (restaurant) => restaurant.role === "hotel"
    );

    setFilteredRestaurants(filteredData);
  }, [filters, restaurants]);

  return (
    <div>
      <Header />
      <div style={{ padding: "20px", marginTop: "100px" }}>
        <h2>Restaurant Listings</h2>

        {/* Search and Filter Options */}
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} md={12}>
            <Search
              placeholder="Search restaurant by name"
              enterButton="Search"
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={24} md={12}>
            <Checkbox
              name="veg"
              checked={filters.veg}
              onChange={handleFilterChange}
              style={{ marginRight: "15px" }}
            >
              Veg
            </Checkbox>
            <Checkbox
              name="nonVeg"
              checked={filters.nonVeg}
              onChange={handleFilterChange}
            >
              Non-Veg
            </Checkbox>
          </Col>
        </Row>

        {/* Restaurant Cards */}
        <Row gutter={[16, 16]}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Col key={restaurant._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={restaurant.restaurant.restaurantName}
                      src={restaurant.restaurant.logo || "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600"} // Add a default image if no logo is present
                    />
                  }
                  onClick={() => {
                    clearCart();
                    navigate(`/orders/${restaurant.restaurant.restaurantName}`);
                  }}
                >
                  <Meta
                    title={restaurant.restaurant.restaurantName}
                    description={restaurant.restaurant.location}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <Rate value={restaurant.restaurant.rating} disabled />
                    <span style={{ marginLeft: "10px" }}>
                      {restaurant.restaurant.rating || 0} / 5
                    </span>
                  </div>

                  {/* Display menu items for restaurants with role "hotel" */}
                  {restaurant.menuItems && restaurant.menuItems.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                      <h4>Menu Items:</h4>
                      <ul>
                        {restaurant.menuItems.map((item, index) => (
                          <li key={index}>
                            <strong>{item.name}</strong> - {item.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <h4>No restaurants found</h4>
            </Col>
          )}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
