import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

export default function ShowProperties() {
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
  };

  const headerStyle = {
    fontSize: '28px',
    color: '#1a1a1a', // Darker color for better visibility
    marginBottom: '25px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '0 1px 2px rgba(0,0,0,0.05)', // Subtle text shadow for depth
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
    cursor: 'pointer',
    border: '1px solid #e1e4e8', // Add border for better definition
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderBottom: '1px solid #e1e4e8',
  };

  const cardContentStyle = {
    padding: '20px',
  };

  const cardTitleStyle = {
    fontSize: '20px', // Slightly larger
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#1a1a1a', // Darker for better contrast
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'flex-start', // Changed to flex-start for better alignment with multi-line text
    marginBottom: '12px',
    fontSize: '15px', // Increased font size
    color: '#333333', // Darker text for better visibility
  };

  const iconStyle = {
    marginRight: '10px',
    color: '#2980b9', // Slightly darker blue
    minWidth: '16px',
    marginTop: '3px', // Better alignment with text
  };

  const infoTextStyle = {
    lineHeight: '1.4', // Better line height for readability
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

  const spinAnimation = {
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  // Since CSS keyframes can't be easily defined inline, we'll add this to the document
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

  const errorStyle = {
    color: '#c0392b', // Darker red
    textAlign: 'center',
    padding: '20px',
    fontSize: '16px',
    backgroundColor: '#fadbd8', // Light red background
    borderRadius: '8px',
    margin: '20px 0',
    border: '1px solid #e74c3c',
  };

  const noPropertiesStyle = {
    textAlign: 'center',
    padding: '30px',
    fontSize: '18px',
    color: '#34495e',
    backgroundColor: '#eaecee',
    borderRadius: '8px',
    margin: '20px 0',
    border: '1px solid #bdc3c7',
  };

  // Card component with hover state
  const PropertyCard = ({ service }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        style={{
          ...cardStyle,
          ...(isHovered ? cardHoverStyle : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={service.url || "https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=1024x1024&w=is&k=20&c=sblj5Fh1RL45NxXJEwTdoSLrexewg6uFbdg_NWvrXXw="} 
          alt="Property" 
          style={imageStyle} 
        />
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
        </div>
      </div>
    );
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(`http://127.0.0.1:8000/api/propertylistings/?search=${email1}`);
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      const data1 = await result.json();
      setServices(data1);
      setError(null);
    } catch (err) {
      console.error("Error fetching service listings:", err);
      setError("Failed to load property listings. Please try again later.");
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
          <span>Loading properties...</span>
        </div>
      );
    }

    if (error) {
      return <div style={errorStyle}>{error}</div>;
    }

    const availableServices = services.filter(service => service.customer === null);
    
    if (availableServices.length === 0) {
      return <div style={noPropertiesStyle}>No available properties found.</div>;
    }

    return (
      <div style={cardsContainerStyle}>
        {availableServices.map(service => (
          <PropertyCard key={service.id} service={service} />
        ))}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Available Properties</h2>
      {renderContent()}
    </div>
  );
}