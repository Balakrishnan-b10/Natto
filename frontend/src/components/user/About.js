import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/About.css";
import { Row, Col } from "antd";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import Abtimg1 from "../../images/user/1chef.jpg";
import Abtimg2 from "../../images/user/2chef.jpg";
import Abtimg3 from "../../images/user/3owner.jpg";
import Abtimg4 from "../../images/user/pexels-viridianaor-28097405.jpg";
import Abtimg5 from "../../images/user/pexels-polina-tankilevitch-4109069.jpg";
import Abtimg6 from "../../images/user/pexels-anna-guerrero-788383-1956974.jpg";
import Abtimg7 from "../../images/user/pexels-norma-mortenson-4393668.jpg";
import Abtvideo from "../../images/user/3135954-hd_1920_1080_30fps.mp4";
import Abtimg8 from "../../images/user/1.png";
import Abtimg9 from "../../images/user/2.png";
import Abtimg10 from "../../images/user/3.png";
import Abtimg11 from "../../images/user/4.png";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      delay: "300",
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="about-pg">
        <div className="center-home-one-about">
          {" "}
          Home
          <MdKeyboardArrowRight />
          &nbsp;About
        </div>
        <div className="center-home-two-about"> About Us</div>
      </div>
      <Row style={{ backgroundColor: "#cd853f", height: "400px" }}>
        <Col lg={2}></Col>
        <Col lg={5} data-aos="fade-up">
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height:'400px',
            }}
          >
            <Col>
              <img src={Abtimg8} alt="" />
            </Col>
            <br></br>
            <Col >
            <b style={{fontSize:'50px'}}>260</b>
            </Col>
            <br></br>
            <Col>
              <h3>Events served</h3>
            </Col>
          </Row>
        </Col>
        <Col lg={5} data-aos="fade-up">
          <Row style={{ display: "flex", flexDirection: "column",justifyContent: "center",
              alignItems: "center",
              height:'400px', }}>
            <Col>
              <img src={Abtimg9} alt="" />
            </Col>
            <br></br>
            <Col>
            <b style={{fontSize:'50px'}}>40</b>
            </Col>
            <br></br>
            <Col>
              <h3>qualified Staff</h3>
            </Col>
          </Row>
        </Col>
        <Col lg={5} data-aos="fade-up">
          <Row style={{ display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center",
              height:'400px', }}>
            <Col>
              <img src={Abtimg10} alt="" />
            </Col>
            <br></br>
            <Col>
            <b style={{fontSize:'50px'}}>20</b>
            </Col><br></br>
            <Col>
              <h3>Expert Chefs</h3>
            </Col>
          </Row>
        </Col>
        <Col lg={5} data-aos="fade-up">
          <Row style={{ display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center",
              height:'400px', }}>
            <Col>
              <img src={Abtimg11} alt="" />
            </Col><br></br>
            <Col>
              <b style={{fontSize:'50px'}}>100</b>
            </Col><br></br>
            <Col>
              <h3>Delicious Dishes</h3>
            </Col>
          </Row>
        </Col>
        <Col lg={2}></Col>
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh", // Full viewport height for vertical centering
          textAlign: "center", // Center text horizontally
        }}
      >
        <b style={{ fontSize: "40px", marginTop: "100px" }}>Our Team</b>
        <h4 style={{ fontSize: "20px", marginTop: "20px" }}>
          We aim to revolutionize the food ordering experience by connecting
          <br></br>
          customers with the best local restaurants, ensuring quick and seamless
          <br></br>
          service with a focus on quality and customer satisfaction.
        </h4>
        <Row style={{ marginTop: "70px" }} data-aos="fade-up">
          <Col lg={2}></Col>
          <Col lg={6}>
            <Card>
              <Card.Img src={Abtimg1} alt="Benjamin Cunningham" />
              <Card.Body>
                <Card.Title>Benjamin Cunningham</Card.Title>
                <Card.Text>Chef</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={1}></Col>
          <Col lg={6}>
            <Card>
              <Card.Img src={Abtimg2} alt="Julie Nelson" />
              <Card.Body>
                <Card.Title>Julie Nelson</Card.Title>
                <Card.Text>Chef</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={1}></Col>
          <Col lg={6}>
            <Card>
              <Card.Img src={Abtimg3} alt="Brandon Lynch" />
              <Card.Body>
                <Card.Title>Brandon Lynch</Card.Title>
                <Card.Text>Owner</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "69vh", // Full viewport height for vertical centering
          textAlign: "center", // Center text horizontally
        }}
      >
        <Row>
          <Col lg={14}>
            <Row>
              <Col lg={4}></Col>
              <Col lg={19}>
                <div className="video-container">
                  <video
                    width="80%"
                    height="400px"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  >
                    <source src={Abtvideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </Col>
          <Col lg={10}>
            <Row>
              <Col lg={1}></Col>
              <Col lg={18} data-aos="fade-up">
                <h3 style={{ textAlign: "left", marginTop: "50px" }}>
                  Natto - Free Food Ordering Solution
                </h3>
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "left",
                    paddingTop: "20px",
                  }}
                >
                  Natto is an online and mobile food ordering system which we
                  have developed for restaurant owners and food lovers. Through
                  Foodchow we are helping customers to discover the best
                  restaurants in city. If you are restaurant owner, you can
                  easily register your restaurant and upload restaurant menu to
                  start receiving online orders through this fast growing portal
                  without any cost.
                </p>
              </Col>
              <Col lg={5}></Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh", // Full viewport height for vertical centering
          textAlign: "center", // Center text horizontally
          marginTop: "100px",
        }}
      >
        <h2>
          Natto has introduced three different methods in ordering the food.
        </h2>
        <p>
          Customer of Natto can select any method for food ordering.<br></br>
          FoodChow is also providing facility to offer all there or any of them
          ordering method to restaurant owner.
        </p>
        <Row style={{ marginTop: "50px" }}>
          <Col lg={2}></Col>
          <Col lg={6}>
            <div className="image-container">
              <img
                src={Abtimg5}
                alt="Description of img"
                className="hover-image"
              />
              <div className="overlay">
                <p>Take Away</p>
              </div>
            </div>
          </Col>
          <Col lg={1}></Col>
          <Col lg={6}>
            <div className="image-container">
              <img
                src={Abtimg6}
                alt="Description of img"
                className="hover-image"
              />
              <div className="overlay">
                <p>Dine In</p>
              </div>
            </div>
          </Col>
          <Col lg={1}></Col>
          <Col lg={6}>
            <div className="image-container">
              <img
                src={Abtimg7}
                alt="Description of img"
                className="hover-image"
              />
              <div className="overlay">
                <p>Delivery</p>
              </div>
            </div>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </div>
      <Row style={{ backgroundColor: "#ffdead", marginBottom: "100px" }}>
        <Col lg={7}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={18}>
              <h3 style={{ marginTop: "40px" }}>Vission</h3>
              <br></br>
              <p style={{ fontSize: "18px" }}>
                For food lovers who want to order food from local restaurants
                online, the Food Ordering System will be an Internet-based
                application that will accept individual or group meal orders,
                process payments, and trigger delivery of the prepared meals to
                a designated location. For Restaurant owner who wants to take
                and grow their business online, with low budget can start their
                online restaurant business and get orders from many more
                customers. Restaurant owner can make more visibility over
                internet without any technical knowledge.
              </p>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Col>
        <Col lg={10}>
          <img
            src={Abtimg4}
            alt="Description of img"
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col lg={7}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={18}>
              <h3 style={{ marginTop: "40px" }}>Mission</h3>
              <br></br>
              <p style={{ fontSize: "18px" }}>
                We are fast growing online food ordering portal. We aim that
                even small restaurant business can take their business online
                without any cost. Thousands of restaurants are registered with
                Foodchow and many more will be registered soon, which ensure
                that every customer of Foodchow will get wide range of food and
                can choose favourite food from nearby restaurant. In one year
                Foodchow has reached to 5+ countries.
              </p>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Col>
      </Row><Footer/>
    </div>
  );
}

export default About;
