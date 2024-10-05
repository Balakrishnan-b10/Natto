import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurants from the API
    const fetchPendingRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/signup/getall`);
        console.log(response.data);

        // Filter restaurants to show only those with "hotel" role and "Pending" status
        const pendingRestaurants = response.data.filter(
          (restaurant) =>
            restaurant.role === "hotel" &&
            restaurant.restaurant && // Ensure restaurant field exists
            restaurant.restaurant.status === "Pending"
        );

        setRestaurants(pendingRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants", error);
      }
    };

    fetchPendingRestaurants();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      // Update the status of the selected restaurant
      await axios.put(`http://localhost:5000/signup/updaterestaurant/${id}`, {
        status,
      });

      // Remove the restaurant with the updated status from the list
      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
    } catch (error) {
      console.error("Error updating restaurant status", error);
    }
  };

  return (
    <div>
      <h1>Pending Restaurant Approvals</h1>
      <ul>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <li key={restaurant._id}>
              {/* Display the additional information */}
              <h3>Restaurant Name: {restaurant.restaurant.restaurantName}</h3>
              <p>Owner Name: {restaurant.restaurant.ownername}</p>
              <p>Location: {restaurant.restaurant.location}</p>
              <p>Status: {restaurant.restaurant.status}</p>

              {/* Approve/Reject buttons */}
              <button
                onClick={() => handleStatusUpdate(restaurant._id, "Approved")}
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(restaurant._id, "Rejected")}
              >
                Reject
              </button>
            </li>
          ))
        ) : (
          <p>No pending restaurants</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPage;
