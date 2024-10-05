import React, { useState } from "react";
import "../css/Signup.css"; // You can use the same CSS file if the styles are similar
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/signup/login", { email, password })
      .then((response) => {
        const data = response.data; // Assuming this is the user ID
        const userId = data.details._id; // Assuming this is the user ID
        const userName = data.details.name; // Assuming the name is returned from the response
        if (userId) { 
          // Store the user ID and name in localStorage
          localStorage.setItem("id", userId);
          localStorage.setItem("userName", userName);
          localStorage.setItem("email", data.details.email);

          toast.success("Login Successful", {
            onClose: () => {
              if (data.userType.role === 'user') {
                navigate("/homepages");
              } else {
                if (!data.userType?.isRestaurantExist) {
                  navigate("/addhotel");
                } else {
                  navigate("/addmenu");
                }
              }
            }, // Navigate to the home page after login
          });
        } else {
          toast.error("Login failed, please try again.");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(
          error.response?.data?.message || "An error occurred during login."
        );
      });
  };
  // Inside the login function (probably in your login component)
  // Example of storing user name

  return (
    <div className="top-container4">
      <ToastContainer />
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <IoMdMail className="icon" />
            <input
              type="email"
              placeholder="Email Id"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <RiLockPasswordFill className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="visible-icon" />
              ) : (
                <AiOutlineEye className="visible-icon" />
              )}
            </span>
          </div>
          <div className="forget-password">
            Forget password? <span>Click Here!</span>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              Login
            </button>
          </div>
        </form>
        <div className="switch-action">
          New to Natto? Create{" "}
          <span onClick={() => navigate("/usersignup")}>user account </span> / 
          <span onClick={() => navigate("/restaurantsignup")}> restaurant account</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
