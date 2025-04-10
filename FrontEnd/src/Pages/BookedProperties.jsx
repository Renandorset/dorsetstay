import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addId } from '../Redux/slice';
import { MdLocationOn, MdDescription, MdAttachMoney, MdCancel } from 'react-icons/md';

export default function BookedProperties() {
  const email = useSelector((state) => state.slice.email);
  const password = useSelector((state) => state.slice.password);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookedServices, setBookedServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Container styles
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
  
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const serviceGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  };

  const serviceCardStyles = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  const serviceInfoStyles = {
    padding: '16px',
    flex: '1',
  };

  const serviceNameStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
  };

  const infoRowStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#555',
  };

  const iconStyles = {
    marginRight: '8px',
    marginTop: '2px',
    color: '#555',
  };

  const actionContainerStyles = {
    padding: '12px 16px',
    borderTop: '1px solid #eee',
    backgroundColor: '#f9f9f9',
  };

  const removeButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const noBookingsStyles = {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666',
    fontSize: '16px',
  };

  const loadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
    color: '#666',
  };

  // Fetch service data
  const fetchServices = async () => { 
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/propertylistings");
      const data = await response.json();
      setBookedServices(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      setIsLoading(false);
      return [];
    }
  };
  
  useEffect(() => {
    fetchServices();
  }, []);

  // Get service details by ID
  const getServiceById = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/propertylistings/${id}/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching service with ID ${id}:`, error);
      return null;
    }
  };

  // Update service details
  const updateService = async (id, data) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/propertylistings/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating service with ID ${id}:`, error);
      return null;
    }
  };

  // Handle removing booking
  const handleRemoveBooking = async (id) => {
    try {
      const serviceData = await getServiceById(id);
      if (serviceData) {
        const updatedData = {
          ...serviceData,
          booking: false,
          availability: true,
          customer: null
        };
        
        const result = await updateService(id, updatedData);
        if (result) {
          // Refresh the list after successful update
          fetchServices();
          
          // Optionally navigate
          navigate("/main");
        }
      }
    } catch (error) {
      console.error("Error removing booking:", error);
    }
  };

  return (
    <div style={containerStyles}>
      <h2 style={headingStyles}>Booked Properties</h2>
      
      {isLoading ? (
        <div style={loadingStyles}>Loading your bookings...</div>
      ) : (
        <>
          {bookedServices && bookedServices.filter(
            (service) => service.availability === false && 
                      service.confirmation === false && 
                      service.customer === email
          ).length === 0 ? (
            <div style={noBookingsStyles}>
              <p>You don't have any booked services at the moment.</p>
            </div>
          ) : (
            <div style={serviceGridStyles}>
              {bookedServices &&
                bookedServices
                  .filter((service) => 
                    service.availability === false && 
                    service.confirmation === false && 
                    service.customer === email
                  )
                  .map((service) => (
                    <div key={service.id} style={serviceCardStyles}>
                      <div style={serviceInfoStyles}>
                        <h3 style={serviceNameStyles}>{service.name}</h3>
                        
                        <div style={infoRowStyles}>
                          <MdDescription size={18} style={iconStyles} />
                          <span>
                            <strong>Description:</strong> {service.description || "No description available"}
                          </span>
                        </div>
                        
                        <div style={infoRowStyles}>
                          <MdLocationOn size={18} style={iconStyles} />
                          <span>
                            <strong>Location:</strong> {service.location || "Location not specified"}
                          </span>
                        </div>
                        
                        <div style={infoRowStyles}>
                          <MdAttachMoney size={18} style={iconStyles} />
                          <span>
                            <strong>Price:</strong> {service.charges || "Price not specified"}
                          </span>
                        </div>
                      </div>
                      
                      <div style={actionContainerStyles}>
                        <button
                          style={removeButtonStyles}
                          onClick={() => handleRemoveBooking(service.id)}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff7875'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4d4f'}
                        >
                          <MdCancel size={18} style={{ marginRight: '8px' }} />
                          Remove Booking
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}