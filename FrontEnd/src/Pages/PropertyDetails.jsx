import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DateRangePicker from '../Components/DatePickerManual';
import { FaHome, FaMapMarkerAlt, FaDollarSign, FaPhone, FaCheckCircle, FaCalendarAlt, FaInfoCircle, FaCreditCard } from 'react-icons/fa';

export default function PropertyDetails() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.slice.id);
  const email = useSelector((state) => state.slice.email);

  const [price1, setPrice1] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/propertylistings/${id}/`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setProperty(data);
    } catch (err) {
      console.error("Error fetching property data:", err);
      setError("Failed to load property information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  const updateProperty = async () => {
    try {
      const updatedProperty = {
        ...property,
        booking: true,
        availability: false,
        customer: email
      };
      
      const response = await fetch(`http://127.0.0.1:8000/api/propertylistings/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProperty)
      });
      
      if (!response.ok) {
        throw new Error(`Update failed with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      console.error("Error updating property:", err);
      throw err;
    }
  };

  const handleBookNow = async () => {
    try {
      if (!price1) {
        alert("Please select dates to calculate the total price first.");
        return;
      }
      
      await updateProperty();
      alert(`You have successfully booked this property: ${property.name}`);
      navigate('/stripe', { state: { email: email, price: price1 } });
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    }
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '30px 20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
   
      },
    header: {
      color: '#2c3e50',
      fontSize: '28px',
      textAlign: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px'
    },
    propertyTitle: {
      fontSize: '24px',
      color: '#3498db',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center'
    },
    propertyImage: {
      width: '100%',
      height: 'auto',
      maxHeight: '400px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    infoCard: {
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
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      padding: '14px 28px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px auto 0',
      transition: 'background-color 0.3s ease',
      width: '200px'
    },
    loadingText: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#7f8c8d',
      padding: '40px 20px'
    },
    errorText: {
      textAlign: 'center',
      color: '#e74c3c',
      padding: '20px',
      backgroundColor: '#fadbd8',
      borderRadius: '5px'
    },
    priceHighlight: {
      backgroundColor: '#e8f4fc',
      padding: '15px',
      borderRadius: '5px',
      marginTop: '20px',
      borderLeft: '4px solid #3498db',
      display: 'flex',
      alignItems: 'center'
    },
    datePickerContainer: {
      marginTop: '20px',
      marginBottom: '20px',
      border: '1px solid #e0e0e0',
      padding: '15px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Property Details</h1>
        <p style={styles.loadingText}>Loading property information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Property Details</h1>
        <p style={styles.errorText}>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Property Details</h1>
      
      {property && (
        <>
          <h2 style={styles.propertyTitle}>
            <FaHome style={{ ...styles.icon, fontSize: '24px' }} /> 
            {property.name}
          </h2>
          
          <img 
            src={property.url || "https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=1024x1024&w=is&k=20&c=sblj5Fh1RL45NxXJEwTdoSLrexewg6uFbdg_NWvrXXw="} 
            alt={property.name} 
            style={styles.propertyImage}
          />
          
          <div style={styles.infoCard}>
            <div style={styles.infoItem}>
              <FaInfoCircle style={styles.icon} />
              <span style={styles.label}>Description:</span>
              <span style={styles.value}>{property.description || "No description available"}</span>
            </div>
            
            <div style={styles.infoItem}>
              <FaMapMarkerAlt style={styles.icon} />
              <span style={styles.label}>Location:</span>
              <span style={styles.value}>{property.location || "Location not specified"}</span>
            </div>
            
            <div style={styles.infoItem}>
              <FaDollarSign style={styles.icon} />
              <span style={styles.label}>Price:</span>
              <span style={styles.value}>{property.charges || "Price not specified"}</span>
            </div>
            
            <div style={styles.infoItem}>
              <FaPhone style={styles.icon} />
              <span style={styles.label}>Contact:</span>
              <span style={styles.value}>{property.contact || "Contact not provided"}</span>
            </div>
            
            <div style={styles.infoItem}>
              <FaCheckCircle style={styles.icon} />
              <span style={styles.label}>Availability:</span>
              <span style={styles.value}>Available</span>
            </div>
          </div>
          
          <div style={styles.datePickerContainer}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <FaCalendarAlt style={{ ...styles.icon, color: '#3498db' }} />
              <h3 style={{ margin: 0 }}>Select Your Stay Dates</h3>
            </div>
            <DateRangePicker setPrice1={setPrice1} charges={property.charges} />
          </div>
          
          {price1 && (
            <div style={styles.priceHighlight}>
              <FaDollarSign style={{ ...styles.icon, fontSize: '20px' }} />
              <span style={styles.label}>Total Price:</span>
              <span style={{ ...styles.value, fontWeight: 'bold', fontSize: '18px' }}>${price1}</span>
            </div>
          )}
          
          <button 
            style={styles.button}
            onClick={handleBookNow}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#219653'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
          >
            <FaCreditCard style={{ marginRight: '10px' }} />
            Book Now
          </button>
        </>
      )}
    </div>
  );
}