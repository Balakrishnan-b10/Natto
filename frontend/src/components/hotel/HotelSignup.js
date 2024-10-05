import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import '../css/Hotelsignup.css';

function RestaurantModal({ showModal, setShowModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [restaurantDetails, setRestaurantDetails] = useState({
    name: '',
    lastName: '',
    email: '',
    restaurantName: '',
    mobileNumber: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails({
      ...restaurantDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    axios.post("http://localhost:5000/restaurant/register", restaurantDetails)
      .then((response) => {
        toast.success("Restaurant form submitted successfully!");
        // Handle successful submission
        console.log('Restaurant registered successfully:', response.data);
        setShowModal(false); // Close the modal after submission
      })
      .catch((error) => {
        toast.error("Error submitting form. Please try again.");
        // Handle errors
        console.error('Error registering restaurant:', error);
      });
  };

  return (
    <div>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Register Your Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={restaurantDetails.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={restaurantDetails.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email Address"
              required
            />
          </Form.Group>

          <Form.Group controlId="restaurantName">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              type="text"
              name="restaurantName"
              value={restaurantDetails.restaurantName}
              onChange={handleInputChange}
              placeholder="Enter Restaurant Name"
              required
            />
          </Form.Group>

          <Form.Group controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={restaurantDetails.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              required
            />
          </Form.Group>

          <Form.Group controlId="password" style={{ position: 'relative' }}>
  <Form.Label>Password</Form.Label>
  <Form.Control
    type={showPassword ? "text" : "password"}
    name="password"
    value={restaurantDetails.password}
    onChange={handleInputChange}
    placeholder="Enter Password"
    required
  />
  <span className="password-toggle" onClick={togglePasswordVisibility}>
    {showPassword ? (
      <AiOutlineEyeInvisible className="visible-icon" />
    ) : (
      <AiOutlineEye className="visible-icon" />
    )}
  </span>
</Form.Group>


          <Form.Group controlId="terms">
            <Form.Check
              type="checkbox"
              label="I allow Natto to contact and email me to help me grow my business online."
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="text-center mt-3">
          Already have an account? <Link to="/hotellogin">Login here</Link>
        </div>
      </Modal.Body>
    </Modal>
    <ToastContainer position="top-center" autoClose={3000} /></div> 
  );
}

export default RestaurantModal;
