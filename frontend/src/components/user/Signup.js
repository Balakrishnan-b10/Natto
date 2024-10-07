import React, { useState } from "react";
import "../css/Signup.css";
import { MdPerson } from "react-icons/md";
import { IoMdMail, IoIosCall } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom'


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  console.log("useLocation", pathname);
  const role = pathname === "/restaurantsignup" ? 'hotel' : 'user';


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/signup/register", { name, email, mobileNumber, password, role: role })
      .then((result) => {
        console.log("result", result);
        
        if (result.data.errors) {
          result.data.errors.forEach((error) => {
            toast.error(error.msg || "An error occurred");
          });
        } else {
          toast.success("Registered Successfully", {
            onClose: () => navigate("/userlogin"),
          });
        }
      })
      .catch((err) => {
        toast.error("User already registered");
        console.log(err); // For debugging
      });
  };

  return (
    <div className="top-container3">
      <ToastContainer />
      <div className="container-signup">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <MdPerson className="icon" />
              <input
                type="text"
                placeholder=" User Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input">
            <IoMdMail className="icon" />
            <input
              type="email"
              placeholder="Email Id"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="input">
  <IoIosCall className="icon" />
  <input
    type="tel"
    placeholder="Mobile Number"
    name="mobileNumber"
    value={mobileNumber}
    onChange={(e) => setmobileNumber(e.target.value)}
    required
    pattern="[0-9]{10}" // Ensures that only 10 digits are allowed
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
              autoComplete="current-password"
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="switch-action">
          Already have an account?{" "}
          <span onClick={() => navigate("/userlogin")}>Login Here</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
