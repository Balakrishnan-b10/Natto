import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MdKeyboardArrowRight } from "react-icons/md";
import "../css/Blogs.css";
import { Card, Col, Row } from 'react-bootstrap';
import AOS from 'aos';
import { Pagination } from 'antd';

function Blogs() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
    });
  }, []);

  // Updated items array without 'last' and 'content'
  const items = [
    [
      {
        id: 1, titleh: 'Little Italy',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: 2, titleh: 'Best Hotel near Beach in Hawaii',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: 3, titleh: 'Best Hotel near Beach in Hawaii',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: 1, titleh: 'Little Italy',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: 2, titleh: 'Best Hotel near Beach in Hawaii',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: 3, titleh: 'Best Hotel near Beach in Hawaii',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=600'
      },{
        id: 1, titleh: 'Little Italy',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: 2, titleh: 'Best Hotel near Beach in Hawaii',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        id: 3, titleh: 'Best Hotel near Beach in Hawaii',
        description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      // Additional items...
    ],
    // Additional pages...
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className="blogs-pg">
        <div className="center-home-one-about">
          Home
          <MdKeyboardArrowRight />
          &nbsp;Blog
        </div>
        <div className="center-home-two-about">Blogs</div>
      </div>
    <Row style={{ marginTop: "10vh" }}>
        {items[currentPage - 1].map(item => (
          <Col key={item.id} lg={4}>
            <Card className='card-blog-box' data-aos="fade-up">
              <Card.Body>
                <img src={item.image} style={{ width: "100%", height: "37vh" }} alt={item.titleh} />
                <Card.Title className='title-blog'>{item.titleh}</Card.Title>
                <Card.Text className='des-blog'>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={1}
        total={items.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: "10vh", marginBottom: "10vh", textAlign: 'center' }}
      />

      <Footer />
    </div>
  );
}

export default Blogs;
