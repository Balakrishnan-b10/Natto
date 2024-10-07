// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin.js";
import Signup from "./components/user/Signup.js";
import Login from "./components/user/Login.js";
import Home from "./components/user/Home.js";
import About from "./components/user/About.js";
import Orders from "./components/user/Orders.js";
import Blogs from "./components/user/Blogs.js";
import Contactus from "./components/user/Contactus.js";
import AdminDashboard from "./components/admin/Admindashboard.js";
import HotelSignup from "./components/hotel/HotelSignup.js";
import HotelLogin from "./components/hotel/HotelLogin.js";
import Addhotel from "./components/hotel/Addhotel.js";
import Addmenu from "./components/hotel/Addmenu.js";
import OrderSummary from "./components/user/OrderSummary.js";
import ResturantPage from "./components/user/Resturant_detail.js";
import { AuthProvider } from "./utils/AuthContext.js";
import ProtectedRoute from "./components/user/ProtectedRoute.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/usersignup" element={<Signup />} />
          <Route path="/restaurantsignup" element={<Signup />} />
          <Route path="/userlogin" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:ResturantName" element={<ResturantPage />} />
          <Route
            path="/ordersummary"
            element={
              <ProtectedRoute>
                {" "}
                <OrderSummary />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/hotelsignup" element={<HotelSignup />} />
          <Route path="/hotellogin" element={<HotelLogin />} />
          <Route path="/addhotel" element={<Addhotel />} />
          <Route path="/addmenu" element={<Addmenu />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
