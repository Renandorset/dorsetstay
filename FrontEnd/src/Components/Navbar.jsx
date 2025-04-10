import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { FaHome, FaCheckCircle, FaCalendarCheck } from "react-icons/fa";
import Logo from "./logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      height: '70px',
      backgroundColor: 'transparent',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: '0',
      zIndex: '1000',
      fontFamily: 'Arial, sans-serif'
    },
    navbarLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    logo: {
      height: '50px',
      width: '75px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    navbarMiddle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '1'
    },
    navbarLink: {
      color: '#333',
      textDecoration: 'none',
      margin: '0 15px',
      padding: '8px 12px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      transition: 'all 0.3s ease'
    },
    navLinkActive: {
      backgroundColor: '#f0f8ff',
      color: '#3498db'
    },
    navbarRight: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontWeight: 'bold',
      color: '#e74c3c'
    },
    icon: {
      marginRight: '8px',
      fontSize: '18px'
    },
    logoutIcon: {
      marginLeft: '8px',
      fontSize: '20px'
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/main');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      {/* Left Section */}
      <div style={styles.navbarLeft}>
        <img 
          src={Logo} 
          alt="Logo"
          style={styles.logo}
          onClick={handleLogoClick}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* Middle Section */}
      <div style={styles.navbarMiddle}>
        <Link 
          to="/main" 
          style={styles.navbarLink}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f8ff';
            e.currentTarget.style.color = '#3498db';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#333';
          }}
        >
          <FaHome style={styles.icon} />
          Home
        </Link>
        
        <Link 
          to="/main/booked" 
          style={styles.navbarLink}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f8ff';
            e.currentTarget.style.color = '#3498db';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#333';
          }}
        >
          <FaCalendarCheck style={styles.icon} />
          Booked Services
        </Link>
        
        <Link 
          to="/main/complete" 
          style={styles.navbarLink}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f8ff';
            e.currentTarget.style.color = '#3498db';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#333';
          }}
        >
          <FaCheckCircle style={styles.icon} />
          Booking Complete
        </Link>
      </div>

      {/* Right Section */}
      <div 
        style={styles.navbarRight}
        onClick={handleLogout}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        Log Out
        <CiLogout style={styles.logoutIcon} />
      </div>
    </nav>
  );
}