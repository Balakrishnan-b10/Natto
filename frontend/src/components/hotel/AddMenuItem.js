import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Upload } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMenuItem = ({ onAddMenuItem }) => {
  const [menuItems, setMenuItems] = useState([]);

  const handleAddItem = () => {
    setMenuItems([...menuItems, { foodImg: null, name: '', description: '' }]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...menuItems];
    newItems[index] = { ...newItems[index], [name]: value };
    setMenuItems(newItems);
  };

  const handleImageChange = (index, file) => {
    const newItems = [...menuItems];
    newItems[index].foodImg = file;
    setMenuItems(newItems);
  };

  const handleSubmit = () => {
    console.log('menuItems', menuItems);
    
    if (menuItems.length === 0) {
      toast.error("Please add at least one menu item.");
      return;
    }

    const formData = new FormData();
    menuItems.forEach((item, index) => {
      formData.append(`menu[${index}].foodImg`, item.foodImg);
      formData.append(`menu[${index}].name`, item.name);
      formData.append(`menu[${index}].description`, item.description);
    });

    onAddMenuItem(formData);
  };

  return (
    <div className="add-menu-item-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>Add Menu Items</h2>
      <Button type="primary" onClick={handleAddItem}>
        Add Menu Item
      </Button>

      {menuItems.map((item, index) => (
        <Row gutter={[30, 30]} justify="center" key={index}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Food Image">
              <Upload
                beforeUpload={(file) => {
                  handleImageChange(index, file);
                  return false;
                }}
              >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Name" required>
              <Input
                name="name"
                value={item.name}
                onChange={(e) => handleChange(index, e)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Description">
              <Input.TextArea
                name="description"
                value={item.description}
                onChange={(e) => handleChange(index, e)}
                rows={3}
              />
            </Form.Item>
          </Col>
        </Row>
      ))}

      <Row gutter={[30, 30]} justify="center">
        <Col>
          <Button type="primary" onClick={handleSubmit}>
            Submit Menu Items
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddMenuItem;
