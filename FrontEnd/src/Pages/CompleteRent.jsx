import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaDollarSign, FaInfoCircle, FaUser, FaCheckCircle } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

export default function CompleteRent() {
  const email1 = useSelector((state) => state.slice.email);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerStyle = {
    padding: '30px',
    marginLeft: '240px', // Space for expanded vertical navbar
    transition: 'margin-left 0.3s ease',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    marginTop: '30vh',
  };

  const headerStyle = {
    fontSize: '28px',
    color: '#1a1a1a',
    marginBottom: '25px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid #e1e4e8',
    position: 'relative',
  };

  const completedBadgeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const cardContentStyle = {
    padding: '20px',
  };

  const cardTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#1a1a1a',
    paddingRight: '80px', // Make room for the badge
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '12px',
    fontSize: '15px',
    color: '#333333',
  };

  const iconStyle = {
    marginRight: '10px',
    color: '#2980b9',
    minWidth: '16px',
    marginTop: '3px',
  };

  const infoTextStyle = {
    lineHeight: '1.4',
    flex: '1',
  };

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    fontSize: '24px',
    color: '#2980b9',
  };

  const errorStyle = {
    color: '#c0392b',
    textAlign: 'center',
    padding: '20px',
    fontSize: '16px',
    backgroundColor: '#fadbd8',
    borderRadius: '8px',
    margin: '20px 0',
    border: '1px solid #e74c3c',
  };

  const noCompletedStyle = {
    textAlign: 'center',
    padding: '30px',
    fontSize: '18px',
    color: '#34495e',
    backgroundColor: '#eaecee',
    borderRadius: '8px',
    margin: '20px 0',
    border: '1px solid #bdc3c7',
  };

  // Add spinner animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .spinner {
        animation: spin 1s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Card component for completed requests
  const CompletedRequestCard = ({ service }) => {
    return (
      <div style={cardStyle}>
        <div style={completedBadgeStyle}>
          <FaCheckCircle />
          <span>Completed</span>
        </div>
        <div style={cardContentStyle}>
          <h3 style={cardTitleStyle}>{service.name}</h3>
          
          <div style={infoRowStyle}>
            <FaInfoCircle style={iconStyle} />
            <div style={infoTextStyle}>{service.description}</div>
          </div>
          
          <div style={infoRowStyle}>
            <FaMapMarkerAlt style={iconStyle} />
            <div style={infoTextStyle}>{service.location}</div>
          </div>
          
          <div style={infoRowStyle}>
            <FaDollarSign style={iconStyle} />
            <div style={infoTextStyle}>{service.charges}</div>
          </div>
          
          <div style={infoRowStyle}>
            <FaPhoneAlt style={iconStyle} />
            <div style={infoTextStyle}>{service.contact}</div>
          </div>
          
          <div style={infoRowStyle}>
            <FaClock style={iconStyle} />
            <div style={infoTextStyle}>{service.timing}</div>
          </div>

          <div style={infoRowStyle}>
            <FaUser style={iconStyle} />
            <div style={infoTextStyle}>{service.customer}</div>
          </div>
        </div>
      </div>
    );
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(
        `http://127.0.0.1:8000/api/propertylistings/?search=${email1}`
      );
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      const data1 = await result.json();
      setServices(data1);
      setError(null);
    } catch (err) {
      console.error("Error fetching service listings:", err);
      setError("Failed to load completed requests. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [email1]);

  // Function to render content based on loading and error states
  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={loaderStyle}>
          <BiLoaderAlt className="spinner" style={{ fontSize: '40px', marginRight: '10px' }} />
          <span>Loading completed requests...</span>
        </div>
      );
    }

    if (error) {
      return <div style={errorStyle}>{error}</div>;
    }

    const completedServices = services.filter(service => service.confirmation === true);
    
    if (completedServices.length === 0) {
      return <div style={noCompletedStyle}>No completed requests found.</div>;
    }

    return (
      <div style={cardsContainerStyle}>
        {completedServices.map(service => (
          <CompletedRequestCard key={service.id} service={service} />
        ))}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Rent Completed</h2>
      {renderContent()}
    </div>
  );
}