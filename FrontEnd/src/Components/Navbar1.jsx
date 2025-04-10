import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaList, 
  FaEye, 
  FaClipboardList, 
  FaCheckCircle, 
  FaInfoCircle, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

export default function Navbar1() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navbarStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    transition: 'width 0.3s ease',
    width: isCollapsed ? '60px' : '240px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  };

  const brandStyle = {
    padding: '20px 15px',
    borderBottom: '1px solid #34495e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
  };

  const brandTextStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    display: isCollapsed ? 'none' : 'block',
  };

  const navItemsStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  };

  const navLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    color: '#ecf0f1',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
    borderLeft: '4px solid transparent',
  };

  const navLinkHoverStyle = {
    backgroundColor: '#34495e',
    borderLeft: '4px solid #3498db',
  };

  const iconStyle = {
    marginRight: isCollapsed ? '0' : '15px',
    fontSize: '20px',
    minWidth: '20px',
  };

  const linkTextStyle = {
    display: isCollapsed ? 'none' : 'block',
    whiteSpace: 'nowrap',
  };

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#ecf0f1',
    fontSize: '20px',
    cursor: 'pointer',
    padding: 0,
  };

  const logoutContainerStyle = {
    marginTop: 'auto',
    borderTop: '1px solid #34495e',
  };

  return (
    <nav style={navbarStyle}>
      <div style={brandStyle}>
        <span style={brandTextStyle}>DorestBnB</span>
        <button 
          style={toggleButtonStyle} 
          onClick={toggleNavbar}
        >
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      <div style={navItemsStyle}>
        <NavLink to="/service/create" icon={<FaList />} text="Create Properties Listing" isCollapsed={isCollapsed} />
        <NavLink to="/service/show" icon={<FaEye />} text="Show Properties" isCollapsed={isCollapsed} />
        <NavLink to="/service/request" icon={<FaClipboardList />} text="Rental Request" isCollapsed={isCollapsed} />
        <NavLink to="/service/complete" icon={<FaCheckCircle />} text="Rent Complete" isCollapsed={isCollapsed} />
        <NavLink to="/service/about" icon={<FaInfoCircle />} text="About Us" isCollapsed={isCollapsed} />
      </div>

      <div style={logoutContainerStyle}>
        <NavLink to="/login" icon={<FaSignOutAlt />} text="Log Out" isCollapsed={isCollapsed} />
      </div>
    </nav>
  );
}

// Helper component for consistent navbar links
function NavLink({ to, icon, text, isCollapsed }) {
  const [hover, setHover] = useState(false);
  
  const navLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    color: '#ecf0f1',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
    borderLeft: '4px solid transparent',
    backgroundColor: hover ? '#34495e' : 'transparent',
    borderLeftColor: hover ? '#3498db' : 'transparent',
  };

  const iconStyle = {
    marginRight: isCollapsed ? '0' : '15px',
    fontSize: '20px',
    minWidth: '20px',
  };

  const linkTextStyle = {
    display: isCollapsed ? 'none' : 'block',
    whiteSpace: 'nowrap',
  };

  return (
    <Link 
      to={to} 
      style={navLinkStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={iconStyle}>{icon}</span>
      <span style={linkTextStyle}>{text}</span>
    </Link>
  );
}