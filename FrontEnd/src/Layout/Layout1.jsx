import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Layout1.css";
import Footer from "../Components/Footer";
import Chatbot from "../Components/Chatbot";
const Layout1 = () => {
  return (
    <div className="layout1">
      <Navbar />

      <Outlet />

      <Chatbot />
      <Footer />
    </div>
  );
};

export default Layout1;
