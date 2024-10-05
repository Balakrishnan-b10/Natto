import React from "react";
import { Col, Row } from "react-bootstrap";
import "../css/Footer.css";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <div style={{overflow:'hidden'}}>
      <Row className="back-bg" >
        <Col lg={3}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={9}>
              <b style={{color:"#a12626", fontSize:'30px'}}>Natto</b>
              <p>Order Online</p>
              <p style={{ color: "black" }}>
                Stay home and order to your doorstep
              </p>
              <FaTwitter className="icon-box" />
              <FaFacebookF className="icon-box1" />
              <FaInstagramSquare className="icon-box1" />
            </Col>
          </Row>
        </Col>

        <Col lg={2}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={9}>
              <b>About Natto</b>

              <h6 className="service-cont">
                {" "}
                <MdKeyboardArrowRight />
                Who we are
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Easy Booking
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Partner With Us
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Apps For You
              </h6>
            </Col>
          </Row>
        </Col>
        <Col lg={2}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={9}>
              <b>For Whom</b>

              <h6 className="service-cont">
                {" "}
                <MdKeyboardArrowRight />
                Cafes
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Street Food
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Food Trucks
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Dessert Shops
              </h6>
            </Col>
          </Row>
        </Col>
        <Col lg={2}>
          <Row>
            <Col lg={3}></Col>
            <Col lg={9}>
              <b>Learn More</b>

              <h6 className="service-cont">
                {" "}
                <MdKeyboardArrowRight />
                Privacy</h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Security
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Terms
              </h6>
              <h6 className="service-cont-serve">
                {" "}
                <MdKeyboardArrowRight />
                Sitemap
              </h6>
            </Col>
          </Row>
        </Col>
        <Col lg={3}>
          <Row>
            <Col lg={1}></Col>
            <Col lg={11}>
              <b>Have a Question?</b>
<div style={{marginTop:'3vh'}}>
              <div style={{ display:'flex', flexDirection:'row' }} className="service-cont-serve">
                <FaAddressBook style={{ color: "#a12626" }} /><p>NO 92, RAJIV GANDHI SALAI (OMR),<br></br>
                NAVALUR, CHENNAI-600130,</p></div>
              <div style={{ display:'flex', flexDirection:'row' }} className="service-cont-serve">
                <FaPhone style={{ color: "#a12626" }} /><p> +2 392 3929 210
              </p></div>
              <div style={{ display:'flex', flexDirection:'row' }} className="service-cont-serve">
                <IoIosMail style={{ color: "#a12626" }} /><p>
                support@natto.com
              </p></div></div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ backgroundColor: "black" }}>
        <Col lg={12} className="final-foot">
          Copyright ©2024 All rights reserved | This template is made with
          &nbsp;{" "}
          <FaHeart
            style={{ color: "gray", fontSize: "14px", display: "flex" }}
          />
          &nbsp; by &nbsp;
          <b style={{ color: "rgb(201, 203, 169)" }}>Natto</b>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
