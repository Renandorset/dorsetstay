import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaMapMarkerAlt, FaPhone, FaUser, FaInfoCircle, FaDollarSign } from "react-icons/fa";

export default function RentalRequest() {
  const email = useSelector((state) => state.slice.email);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/api/propertylistings/?search=${email}`
      );
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [email]);

  const getServiceById = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/propertylistings/${id}/`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching service details:", error);
      throw error;
    }
  };

  const updateService = async (id, data) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/propertylistings/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  };

  const handleConfirm = async (id) => {
    try {
      const serviceData = await getServiceById(id);
      
      const updatedData = {
        ...serviceData,
        confirmation: true,
        booking: true,
        availability: false
      };
      
      await updateService(id, updatedData);
      
      alert("Transaction Confirmed");
      
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, confirmation: true } : service
        )
      );
    } catch (error) {
      alert("Failed to confirm transaction. Please try again.");
    }
  };

  const requestedServices = services.filter(
    (service) => service.customer !== null && service.confirmation !== true
  );

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    },
    header: {
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "30px",
      borderBottom: "2px solid #3498db",
      paddingBottom: "10px"
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px"
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      transition: "transform 0.3s ease",
      border: "1px solid #e0e0e0"
    },
    cardHover: {
      transform: "translateY(-5px)"
    },
    cardTitle: {
      color: "#3498db",
      fontSize: "20px",
      marginBottom: "15px",
      borderBottom: "1px solid #eee",
      paddingBottom: "10px"
    },
    infoItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      fontSize: "14px"
    },
    icon: {
      marginRight: "10px",
      color: "#3498db"
    },
    button: {
      backgroundColor: "#2ecc71",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginTop: "15px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease"
    },
    buttonHover: {
      backgroundColor: "#27ae60"
    },
    loadingText: {
      textAlign: "center",
      fontSize: "18px",
      color: "#7f8c8d",
      margin: "40px 0"
    },
    noServiceText: {
      textAlign: "center",
      fontSize: "18px",
      color: "#7f8c8d",
      margin: "40px 0"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Requested Properties</h2>
      
      {loading ? (
        <p style={styles.loadingText}>Loading requested properties...</p>
      ) : requestedServices.length === 0 ? (
        <p style={styles.noServiceText}>No property requests found.</p>
      ) : (
        <div style={styles.cardsContainer}>
          {requestedServices.map((service) => (
            <div 
              key={service.id} 
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 style={styles.cardTitle}>{service.name}</h3>
              
              <div style={styles.infoItem}>
                <FaDollarSign style={styles.icon} />
                <strong>Charges:</strong> {service.charges}
              </div>
              
              <div style={styles.infoItem}>
                <FaPhone style={styles.icon} />
                <strong>Contact:</strong> {service.contact}
              </div>
              
              <div style={styles.infoItem}>
                <FaUser style={styles.icon} />
                <strong>Customer:</strong> {service.customer}
              </div>
              
              <div style={styles.infoItem}>
                <FaInfoCircle style={styles.icon} />
                <strong>Description:</strong> {service.description}
              </div>
              
              <div style={styles.infoItem}>
                <FaMapMarkerAlt style={styles.icon} />
                <strong>Location:</strong> {service.location}
              </div>
              
              <button
                style={styles.button}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#27ae60";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#2ecc71";
                }}
                onClick={() => handleConfirm(service.id)}
              >
                <FaCheckCircle style={{ marginRight: "8px" }} />
                Confirm Transaction
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}