import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser, FaIdCard, FaEnvelope, FaLock, FaEdit } from 'react-icons/fa';

export default function AboutUs() {
  const navigate = useNavigate();
  
  const email1 = useSelector((state) => state.slice.email);
  const password1 = useSelector((state) => state.slice.password);
  
  const [email] = useState(email1);
  const [password] = useState(password1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const endpoint = `http://127.0.0.1:8000/api/usersProfiles/?email=${email}&password=${password}`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email, password]);

  const handleUpdateClick = () => {
    navigate('/service/updateabout');
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px 20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      color: '#2c3e50',
      fontSize: '28px',
      textAlign: 'center',
      marginBottom: '30px',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px'
    },
    detailsContainer: {
      backgroundColor: '#ffffff',
      padding: '25px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '20px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      padding: '10px',
      borderBottom: '1px solid #f1f1f1'
    },
    icon: {
      color: '#3498db',
      marginRight: '15px',
      minWidth: '24px'
    },
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
      color: '#555'
    },
    value: {
      color: '#333',
      flexGrow: 1
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#2980b9'
    },
    loadingText: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#7f8c8d',
      padding: '20px'
    },
    errorText: {
      textAlign: 'center',
      color: '#e74c3c',
      padding: '20px',
      backgroundColor: '#fadbd8',
      borderRadius: '5px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>About Us</h2>
      
      {loading ? (
        <p style={styles.loadingText}>Loading user information...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : userData ? (
        <div style={styles.detailsContainer}>
          <div style={styles.infoItem}>
            <FaEnvelope style={styles.icon} />
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{userData.email}</span>
          </div>
          
          <div style={styles.infoItem}>
            <FaUser style={styles.icon} />
            <span style={styles.label}>Username:</span>
            <span style={styles.value}>{userData.username}</span>
          </div>
          
          <div style={styles.infoItem}>
            <FaLock style={styles.icon} />
            <span style={styles.label}>Password:</span>
            <span style={styles.value}>{userData.password}</span>
          </div>
          
          <div style={styles.infoItem}>
            <FaIdCard style={styles.icon} />
            <span style={styles.label}>ID:</span>
            <span style={styles.value}>{userData.id}</span>
          </div>
        </div>
      ) : (
        <p style={styles.loadingText}>No user information available.</p>
      )}
      
      <button 
        style={styles.button}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
        onClick={handleUpdateClick}
      >
        <FaEdit style={{ marginRight: '10px' }} />
        Update About Us
      </button>
    </div>
  );
}