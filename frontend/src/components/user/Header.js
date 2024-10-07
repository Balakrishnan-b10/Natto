import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Row, Col } from "react-bootstrap";
import "../css/Header.css"; // Import your CSS
import RestaurantModal from "../hotel/HotelSignup";
import { CartContext } from "../../utils/CartContext";
import { Badge } from "antd";
import { CiShoppingCart } from "react-icons/ci";

function Header() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [userName, setUserName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    setUserName("");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar className={`navbar ${isScrolled ? "scrolled" : ""}`} fixed="top">
        <Row className="align-items-center w-100 nav-row">
          <Col lg={2} className="d-flex align-items-center">
            <Navbar.Brand className="nav-brand">
              <b className="nav-logo">Natto</b>
            </Navbar.Brand>
          </Col>
          <Col lg={7}>
            <Nav className="nav_items justify-content-center">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
              <Link to="/blogs" className="nav-link">
                Blogs
              </Link>
              <Link to="/contactus" className="nav-link">
                Contact Us
              </Link>
            </Nav>
          </Col>
          {/* Show "Add Your Restaurant" link only if user is not logged in */}
          {!userName && (
            <Col
              lg={1}
              className="d-flex justify-content-end align-items-center"
            >
              <Link to="/restaurantsignup">Add Your Restaurant</Link>
            </Col>
          )}
          <Col
            lg={2}
            className="d-flex justify-content-end align-items-center user-actions"
          >
            {userName ? (
              <>
                <span className="user-greeting">Hello, {userName}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/userlogin" className="login-btn">
                Login
              </Link>
            )}
          </Col>
        </Row>
      </Navbar>

      {/* Render the RestaurantModal and pass necessary props */}
      <RestaurantModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Header;
