import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../css/Contact.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Row, Col } from "antd";
import Cimg1 from "../../images/user/support-icon.png";
import Cimg2 from "../../images/user/folder-icon.png";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

function Contactus() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      delay: "300",
    });
  }, []);

  const [formData, setFormData] = useState({
    help: "",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post(
        "http://localhost:5000/contact/submit",
        formData
      );
      toast.success("Contact form submitted successfully!");
      console.log(response.data.message);
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      console.error(
        "Error submitting form:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="contact-pg">
        <div className="center-home-one-about" data-aos="fade-up">
          {" "}
          Home <MdKeyboardArrowRight /> &nbsp;Contact
        </div>
        <div className="center-home-two-about" data-aos="fade-up">
          Contact Us
        </div>
      </div>

      <div>
        <h2
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          We would love to hear from you!
        </h2>
        <Row>
          <Col lg={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
              data-aos="fade-up"
            >
              <img src={Cimg1} alt="" />
              <h3>By Email</h3>
              <p style={{ fontSize: "15px" }}>support@natto.com</p>
            </div>
          </Col>
          <Col lg={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
              data-aos="fade-up"
            >
              <img src={Cimg2} alt="" />
              <h3>Locate me</h3>
              <p style={{ fontSize: "15px" }}>
                NO 92, RAJIV GANDHI SALAI (OMR) <br /> NAVALUR, CHENNAI-600130
              </p>
            </div>
          </Col>
        </Row>
      </div>
<div style={{height:'100vh'}}>
      <Row>
        <Col lg={14}>
          <div className="contact-us" data-aos="fade-up">
            <h2>Get in touch</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <select
                  name="help"
                  value={formData.help}
                  onChange={handleChange}
                  required
                >
                  <option value="">How can we help you?</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Feedback">Feedback</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Submit Feedback
              </button>
            </form>
          </div>
        </Col>
        <Col lg={10}>
          <Row style={{padding:'25px', gap:'100px'}}>
            <Col className="report-tab " data-aos="fade-up">
              <h3>Report a Safety Emergency</h3>
              <p>
                We are committed to the safety of<br></br> everyone using
                Natto.
              </p>
            </Col>
            <Col className="report-tab" data-aos="fade-up">
              <h3>Issue with your live order?</h3>
              <p>
                Click on the 'Support' or 'Online <br></br>ordering help' section in your
                app to <br></br>connect to our customer support <br></br>team.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* ToastContainer to show popup notifications */}
      <ToastContainer position="top-center" autoClose={3000} /></div>
      <Footer/>
    </div>
  );
}

export default Contactus;
