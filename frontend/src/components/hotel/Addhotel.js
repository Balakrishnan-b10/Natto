import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Form,
  TimePicker,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../css/Addhotel.css"; // Import the CSS file for styling
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const Addhotel = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const restaurantId = localStorage.getItem("id");
  const username = localStorage.getItem("userName"); // Retrieve the logged-in user's name
  const [isApproved, setIsApproved] = useState(false); // For rendering "Add Menu" button if approved
  const [statusMessage, setStatusMessage] = useState(""); // To show the status message
  const [operatingHours, setOperatingHours] = useState({
    open: null,
    close: null,
  });

  // Fetch restaurant data to check the status
  useEffect(() => {
    const fetchRestaurantStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/signup/user/${restaurantId}`
        );
        if (response.data) {
          const restaurant = response.data.restaurant;
          console.log(restaurant);
          if (restaurant.status === "Approved") {
            setIsApproved(true);
          } else {
            setStatusMessage("Your restaurant is currently pending approval.");
          }
        }
      } catch (error) {
        console.error("Error fetching restaurant status", error);
      }
    };
    fetchRestaurantStatus();
  }, [restaurantId]);

  const handleSubmit = async (values) => {
    const restaurantData = {
      ...values,
      operatingHours: {
        open: moment(operatingHours.open).format("HH:mm"),
        close: moment(operatingHours.close).format("HH:mm"),
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/signup/updaterestaurant/${restaurantId}`,
        restaurantData
      );
      toast.success("Hotel updated successfully!");
      // Check the status after updating
      if (response.data.status === "Approved") {
        navigate("/addmenu");
      } else {
        setStatusMessage("Your restaurant is still pending approval.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error(error.response.data.message);
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        console.error(error.message || "An unknown error occurred");
        toast.error("An unknown error occurred while updating the hotel.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("restaurantid");
    localStorage.removeItem("username"); // Remove the username when logging out
    navigate("/login");
  };

  return (
    <div className="add-hotel-container">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Logout Button on Top Right */}
      <div className="logout-container">
      <span className="username">Welcome, {username}</span> {/* Display the username */}
        <Button type="primary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </Button>
      </div>

      <h2>Add New Hotel</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="form-container"
      >
        <Form.Item
          label="Owner Name"
          name="ownername"
          rules={[{ required: true, message: "Please enter owner name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Restaurant Name"
          name="restaurantName"
          rules={[{ required: true, message: "Please enter restaurant name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pincode"
          name="pincode"
          rules={[{ required: true, message: "Please enter pincode" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Logo" name="logo">
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category">
            <Option value="Starters">Starters</Option>
            <Option value="Main Course">Main Course</Option>
            {/* More options here... */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Payment Options"
          name="paymentOptions"
          rules={[
            { required: true, message: "Please select a payment option" },
          ]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Add payment options"
          >
            <Option value="Cash">Cash</Option>
            {/* More options here... */}
          </Select>
        </Form.Item>

        {/* Operating Hours */}
        <div className="form-row">
          <label>Operating Hours:</label>

          <TimePicker
            value={
              operatingHours.open ? moment(operatingHours.open, "HH:mm") : null
            }
            format="HH:mm"
            placeholder="Open Time"
            onChange={(time) =>
              setOperatingHours({ ...operatingHours, open: time })
            }
          />

          <TimePicker
            value={
              operatingHours.close
                ? moment(operatingHours.close, "HH:mm")
                : null
            }
            format="HH:mm"
            placeholder="Close Time"
            onChange={(time) =>
              setOperatingHours({ ...operatingHours, close: time })
            }
          />
        </div>

        <Form.Item
          label="Cuisine Type"
          name="cuisineType"
          rules={[{ required: true, message: "Please select a cuisine type" }]}
        >
          <Select placeholder="Select a cuisine type">
            <Option value="Italian">Italian</Option>
            {/* More options here... */}
          </Select>
        </Form.Item>

        <Form.Item label="Hotel Type" name="hotelType" initialValue="Standard">
          <Select>
            <Option value="Standard">Standard</Option>
            <Option value="Premium">Premium</Option>
            <Option value="Luxury">Luxury</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Order Process Instructions"
          name="orderProcessInstructions"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="About" name="about">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update Restaurant
        </Button>
      </Form>

      {/* Show status message if not approved */}
      {statusMessage && (
        <Row justify="center">
          <Col>
            <p style={{ color: "red" }}>{statusMessage}</p>
          </Col>
        </Row>
      )}

      {/* Conditionally render the "Add Menu" button if hotel is approved */}
      {isApproved && (
        <Row justify="center">
          <Col>
            <Button type="primary" onClick={() => navigate("/addmenu")}>
              Add Menu
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Addhotel;
