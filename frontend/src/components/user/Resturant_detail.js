import React, { useState, useContext } from "react";
import { Card, Row, Col, Radio, Button, InputNumber } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import "./OrdersPage.css";
import { CartContext } from "../../utils/CartContext";
import Header from "./Header";
import { Link } from "react-router-dom";

const { Meta } = Card;

// Sample data for orders
const ordersData = [
  {
    id: 1,
    foodImg: "https://b.zmtcdn.com/data/dish_photos/30b/6b886645840a9252b1b5d4d51ac0930b.jpg?fit=around|130:130&crop=130:130;*,*",
    name: "Paneer Butter Masala",
    description: "Delicious paneer cooked in butter with rich gravy.",
    category: "veg",
    price: 250,
  },
  {
    id: 2,
    foodImg: "https://b.zmtcdn.com/data/dish_photos/719/a9d333d1c9d05b3348526d676c38f719.jpg?fit=around|130:130&crop=130:130;*,*",
    name: "Chicken Biryani",
    description: "Authentic chicken biryani made with aromatic spices.",
    category: "non-veg",
    price: 350,
  },
  // Add more items...
];

const ResturantPage = () => {
  const [filterCategory, setFilterCategory] = useState("all");
  const { cart, updateCart } = useContext(CartContext); // Use Cart Context to update quantities

  // Handle quantity change for food item
  const handleQuantityChange = (foodItem, value) => {
    console.log('sss', foodItem, value);
    console.log('sss', cart);
    console.log('sss', cart.find((item) => item.id === 1)?.quantity === undefined);
    
    updateCart({ ...foodItem, quantity: value });
  };

  // Filtered orders based on category (Veg/Non-Veg)
  const filteredOrders = ordersData.filter((order) => {
    if (filterCategory === "all") return true;
    return order.category === filterCategory;
  });

  return (
    <>
    <Header/>
    <div style={{ padding: "20px" }}>
      {/* Filter Options */}
      <div style={{ marginBottom: "20px", textAlign: "center", marginTop:'100px' }}>
        <Radio.Group
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
          buttonStyle="solid"
        >
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="veg">Veg</Radio.Button>
          <Radio.Button value="non-veg">Non-Veg</Radio.Button>
        </Radio.Group>
        <Button type="default" icon={<FilterOutlined />} style={{ marginLeft: "10px" }}>
          Apply Filters
        </Button>
      </div>

      {/* Orders Listing */}
      <Row gutter={[16, 16]}>
        {filteredOrders.map((order) => (
          <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
            <Card
              hoverable
              cover={<img alt={order.name} src={order.foodImg} />}
              actions={[
                (cart.find((item) => item.id === order.id)?.quantity === undefined ? <Button onClick={() => handleQuantityChange(order, cart.find((item) => item.id === order.id)?.quantity || 1)}>Add +</Button> : null),
                (cart.find((item) => item.id === order.id)?.quantity > 0  ? <InputNumber
                  min={1}
                  max={99}
                  value={
                    cart.find((item) => item.id === order.id)?.quantity || 1
                  } // Display current quantity from the cart
                  onChange={(value) => handleQuantityChange(order, value)} // Update quantity in the context
                />
                : null)
              ]}
            >
              <Meta
                title={`${order.name} - ₹${order.price}`}
                description={order.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/ordersummary" className="nav-link">
                ordersummary
              </Link>
    </div>
    </>
  );
};

export default ResturantPage;
