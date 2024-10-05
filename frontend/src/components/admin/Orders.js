import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingFoods, setPendingFoods] = useState([]);

  useEffect(() => {
    const fetchPendingFoods = async () => {
      try {
        const response = await axios.get('/api/admin/food/pending');
        setPendingFoods(response.data);
      } catch (error) {
        console.error('Error fetching pending food', error);
      }
    };
    fetchPendingFoods();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await axios.put(`/api/admin/food/${id}`, { status });
      setPendingFoods(pendingFoods.filter(food => food._id !== id));
    } catch (error) {
      console.error('Error approving/rejecting food', error);
    }
  };

  return (
    <div>
      <h2>Pending Food Items</h2>
      <ul>
        {pendingFoods.map((food) => (
          <li key={food._id}>
            <p>Name: {food.name}</p>
            <p>Description: {food.description}</p>
            <p>Price: {food.price}</p>
            <p>Hotel: {food.hotelId.name}</p>
            <button onClick={() => handleApproval(food._id, 'Approved')}>Approve</button>
            <button onClick={() => handleApproval(food._id, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
