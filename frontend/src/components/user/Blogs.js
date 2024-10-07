import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MdKeyboardArrowRight } from "react-icons/md";
import "../css/Blogs.css";
import { Card, Col, Row } from 'react-bootstrap';
import AOS from 'aos';


function Blogs() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
    });
  }, []);

  // Updated items array
  const items = [
    {
      id: 1, titleh: 'Private Party',
      description: 'Enjoy an intimate gathering with close friends and family in a cozy, private setting. We offer a wide range of South Indian delicacies that will elevate your party experience.',
      image: 'https://iamosahan.com/wrapbootstrap-pillarix/catring/img/ocasion/ocasion-image-1.png'
    },
    {
      id: 2, titleh: 'Wedding Recepction',
      description: 'Make your special day unforgettable with our exquisite Indian cuisine. We provide a lavish spread that complements the grandeur of your wedding reception.',
      image: 'https://iamosahan.com/wrapbootstrap-pillarix/catring/img/ocasion/ocasion-image-2.png'
    },
    {
      id: 3, titleh: 'Corporate Event',
      description: 'Host a professional and well-organized corporate event with our top-notch catering services. We offer a variety of cuisine options to suit all your business needs.',
      image: 'https://iamosahan.com/wrapbootstrap-pillarix/catring/img/ocasion/ocasion-image-3.png'
    },
    {
      id: 4, titleh: 'Birthday Party',
      description: 'Celebrate your birthday with a customized menu that suits all age groups. Our party packages include a range of delightful dishes for a memorable experience.',
      image: 'https://iamosahan.com/wrapbootstrap-pillarix/catring/img/ocasion/ocasion-image-4.png'
    },
    // Additional items...
  ];

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
        {items.map(item => (
          <Col key={item.id} lg={6}>
            <Card className='card-blog-box' data-aos="fade-up">
              <Card.Body>
                <img src={item.image} style={{ width: "100%", height: "65vh" }} alt={item.titleh} />
                <Card.Title className='title-blog'>{item.titleh}</Card.Title>
                <Card.Text className='des-blog'>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
}

export default Blogs;
