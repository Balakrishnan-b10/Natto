import React from 'react';
import { Row, Col, Carousel, Form, Input, Button } from 'antd';
import '../css/HotelLogin.css';
import hotelimg1 from '../../images/hotel/frame1.png';
import hotelimg2 from '../../images/hotel/frame2.png';
import hotelimg3 from '../../images/hotel/frame3.png';

function HotelLogin() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div className="hotel-login-container">
      <Row gutter={16}>
        {/* First column with the image carousel */}
        <Col lg={12} className="carousel-column">
          <Carousel autoplay className="carousel">
            <div>
              <img
                src={hotelimg1}
                alt="Hotel 1"
                className="carousel-image"
              />
            </div>
            <div>
              <img
                src={hotelimg2}
                alt="Hotel 2"
                className="carousel-image"
              />
            </div>
            <div>
              <img
                src={hotelimg3}
                alt="Hotel 3"
                className="carousel-image"
              />
            </div>
          </Carousel>
        </Col>

        {/* Second column for login form */}
        <Col lg={12} className="login-form-column">
          <Form
            name="hotel_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className="login-header">
              <h1>Welcome To Natto</h1>
            </div>

            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <label htmlFor="username">Username</label>
              <Input placeholder="Username" />
              
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            ><label htmlFor="password">Password</label>
              <Input.Password placeholder="Password" />
              
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

            <div className="signup-link">
              Don’t have an account? <a href="/signup">Sign up</a>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default HotelLogin;
