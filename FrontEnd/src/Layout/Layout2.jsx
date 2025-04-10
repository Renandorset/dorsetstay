import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar1 from '../Components/Navbar1';
import './Layout2.css'; // Import the CSS file for styling
import Chatbot from '../Components/Chatbot';

export default function Layout2() {
  return (
    <div className="layout2">
      <Navbar1 />
      <Chatbot/>
      <Outlet />
    </div>
  );
}