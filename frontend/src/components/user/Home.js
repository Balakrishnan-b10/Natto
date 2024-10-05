import React, { useEffect } from "react";
import "../css/Home.css";
// import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoIosArrowRoundForward } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { Row, Col } from "antd";
import Image1 from "../../images/user/bg-new-1.png";
import Image2 from "../../images/user/1-complete-online-solution.png";
import Image3 from "../../images/user/2-win-win-business-model.png";
import Image4 from "../../images/user/3-worldwide-support.png";
import Image5 from "../../images/user/4-single-and-multiple-outlets.png";
// import Video1 from "../../images/user/";
import { Card } from "react-bootstrap";
import Footer from "./Footer";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      delay: "300",
    });
  }, []);

  const sections = [
    {
      items: [
        {
          id: 1,
          title: "Greek Salad",
          description: "A fresh and healthy salad",
          image:
            "https://iamosahan.com/wrapbootstrap-pillarix/catring/img/choose-menu/menu-1.png", // Replace with actual image path
          button: "Get Menu",
        },
        {
          id: 2,
          title: "Fish & Meat",
          description: "Delicious grilled salmon with lemon butter",
          image:
            "https://iamosahan.com/wrapbootstrap-pillarix/catring/img/choose-menu/menu-2.png",
          button: "Get Menu",
        },
        {
          id: 3,
          title: "Desserts",
          description: "Juicy steak with garlic herb butter",
          image:
            "https://iamosahan.com/wrapbootstrap-pillarix/catring/img/choose-menu/menu-3.png",
          button: "Get Menu",
        },
      ],
    },
  ];
  return (
    <div>
      <Header />
      <div className="home-pg">
        <div className="home-pg1" data-aos="fade-up">
          Delicious Food <br></br>for any Event
        </div>
        <div className="home-pg2" data-aos="fade-up">
          Discover the best food & drinks in Chennai
        </div>
        <div className="home-pg-btn" data-aos="fade-up">
          <Button
            variant="outline-light"
            style={{
              backgroundColor: "rgb(240, 203, 153)",
              padding: "15px 50px 15px 50px",
            }}
          >
            Get Started{" "}
            <IoIosArrowRoundForward
              style={{ color: "white", fontSize: "3vh", marginLeft: "2px" }}
            />
          </Button>
          <Button
            variant="outline-light"
            style={{ padding: "15px 50px 15px 50px", marginLeft: "2vh" }}
          >
            Learn More{" "}
            <IoIosArrowRoundForward
              style={{
                color: "rgb(240, 203, 153)",
                fontSize: "3vh",
                marginLeft: "2px",
              }}
            />
          </Button>
        </div>
      </div>
      <Row style={{ height: "89vh" }}>
        <Col lg={12}>
          <Row>
            <Col>
              <Row>
                <Col lg={3}></Col>
                <Col
                  lg={16}
                  data-aos="fade-right"
                  style={{ fontSize: "45px", marginTop: "100px" }}
                >
                  <b>
                    Order In-Store, Pre-Order, or Pick Up and Find Great
                    Discounts at nearby restaurants!
                  </b>
                </Col>
                <Col lg={5}></Col>
              </Row>
            </Col>
            <Col data-aos="fade-left">
              <div className="search-container">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search..."
                />
                <input
                  type="text"
                  className="location-box"
                  placeholder="Location..."
                />
                <button class="search-btn">Search</button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={12} style={{ marginTop: "100px" }}>
          <img
            src={Image1}
            alt="Description of img"
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "150vh", // Full viewport height for vertical centering
          textAlign: "center", // Center text horizontally
          backgroundColor: "#FFEBCD",
        }}
      >
        <b style={{ fontSize: "40px", marginTop: "80px" }}>Choose Your Menu</b>
        <h4 style={{ fontSize: "20px", marginTop: "50px" }}>
          Donec convallis, elit vitae ornare cursus, libero purus facilisis
          felisa volutpat metus tortor<br></br>
          bibendum elit. Integer nec mi eleifend, fermentum lorem vitae, finibus
          neque.
        </h4>
        {sections.map((section, index) => (
          <div key={index} style={{ marginBottom: "40px" }}>
            <Row>
              {section.items.map((item) => (
                <Col
                  lg={8}
                  key={item.id}
                  style={{ padding: "40px", marginTop: "50px" }}
                >
                  <Card
                    style={{ width: "100%", height: "700px" }}
                    data-aos="fade-up"
                  >
                    <Card.Img variant="top" src={item.image} alt={item.title} />
                    <Card.Body>
                      <Card.Title className="card-title">
                        {item.title}
                      </Card.Title>
                      <Card.Text className="card-text">
                        {item.description}
                      </Card.Text>
                      <Button className="card-button" variant="primary">
                        {item.button}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
      <Row style={{ height: "100vh" }}>
        <Col lg={12}>
          <video
            width="100%"
            height="400px"
            autoPlay
            loop
            muted
            playsInline // Ensures autoplay works on mobile devices
            style={{ marginTop: "100px" }} // Adjust video fit if needed
          >
            <source
              src="https://www.foodchow.com/Images/home/foodchow-order-online.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Col>
        <Col lg={12}>
          <Row>
            <Col style={{ marginTop: "40px" }}>
              <h2>Why FoodChow?</h2>
            </Col>
            <Col style={{ marginTop: "10px" }}>
              <Row style={{ paddingTop: "10px" }}>
                <Col lg={2}>
                  <img
                    src={Image2}
                    alt="Description of img"
                    style={{ width: "70%", height: "auto" }}
                  />
                </Col>
                <Col lg={13}>
                  <h4>Complete Online Solution</h4>
                  <p>
                    Our Online Ordering Solution allows you to take orders
                    through Your own Website, Your Own Mobile App, And through
                    FoodChow website and Mobile App.
                  </p>
                </Col>
                <Col lg={9}></Col>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <Col lg={2}>
                  <img
                    src={Image3}
                    alt="Description of img"
                    style={{ width: "70%", height: "auto" }}
                  />
                </Col>
                <Col lg={13}>
                  <h4>Win Win Business Model</h4>
                  <p>
                    From Quick Setup to Instant Order Notifications, Dynamic
                    Pricing, Instant Payment and Social Media Marketing, We have
                    you covered.
                  </p>
                </Col>
                <Col lg={9}></Col>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <Col lg={2}>
                  <img
                    src={Image4}
                    alt="Description of img"
                    style={{ width: "70%", height: "auto" }}
                  />
                </Col>
                <Col lg={13}>
                  <h4>Worldwide Support</h4>
                  <p>
                    FoodChow support is available worldwide. Contact our support
                    team and we'll connect you to an expert to get your issue
                    resolved within 24 Business hours.
                  </p>
                </Col>
                <Col lg={9}></Col>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <Col lg={2}>
                  <img
                    src={Image5}
                    alt="Description of img"
                    style={{ width: "70%", height: "auto" }}
                  />
                </Col>
                <Col lg={13}>
                  <h4>Single & Mutliple Oultets</h4>
                  <p>
                    Do you have your restaurant in multiple locations? FoodChow
                    Multi-outlet food ordering solution will help you manage all
                    these outlets with Super Admin functionality.
                  </p>
                </Col>
                <Col lg={9}></Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer/>
    </div>
  );
}

export default Home;
