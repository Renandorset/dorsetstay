import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addId } from '../Redux/slice';
import { MdDescription, MdLocationOn, MdAttachMoney, MdCheckCircle } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';

export default function CompleteBooking() {
  const email = useSelector((state) => state.slice.email);
  const password = useSelector((state) => state.slice.password);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [completedBookings, setCompletedBookings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Container styles
  const containerStyles = {
    padding: '30px',
    backgroundColor: '#f8f9fa',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  
    minHeight: '80vh',
  };
  
  const headingStyles = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: '#333',
    fontWeight: '600',
    position: 'relative',
    paddingBottom: '10px',
  };
  
  const headingAfterStyles = {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '3px',
    backgroundColor: '#4f7df3',
  };
  
  const bookingsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px',
    justifyContent: 'center',
  };
  
  const bookingCardStyles = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
  };
  
  const bookingImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };
  
  const bookingInfoStyles = {
    padding: '20px',
  };
  
  const bookingNameStyles = {
    margin: '0 0 15px',
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50',
  };
  
  const bookingDetailStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    margin: '12px 0',
    fontSize: '15px',
    color: '#555',
  };
  
  const iconStyles = {
    marginRight: '10px',
    color: '#4f7df3',
    marginTop: '3px',
  };
  
  const completedBadgeStyles = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };
  
  const loadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '18px',
    color: '#666',
  };
  
  const emptyStateStyles = {
    textAlign: 'center',
    padding: '50px 20px',
    color: '#666',
  };
  
  const emptyStateTextStyles = {
    fontSize: '18px',
    marginBottom: '20px',
  };

  // Fetch bookings data
  const fetchBookings = async () => { 
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/propertylistings");
      const data = await response.json();
      setCompletedBookings(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setIsLoading(false);
      return [];
    }
  };
  
  useEffect(() => {
    fetchBookings();
  }, []);

  // Get filtered completed bookings
  const getFilteredBookings = () => {
    if (!completedBookings) return [];
    return completedBookings.filter(
      booking => booking.confirmation === true && booking.customer === email
    );
  };

  return (
    <div style={containerStyles}>
      <h2 style={headingStyles}>
        Completed Bookings
        <div style={headingAfterStyles}></div>
      </h2>
      
      {isLoading ? (
        <div style={loadingStyles}>
          Loading your completed bookings...
        </div>
      ) : (
        <>
          {getFilteredBookings().length === 0 ? (
            <div style={emptyStateStyles}>
              <p style={emptyStateTextStyles}>You don't have any completed bookings yet.</p>
            </div>
          ) : (
            <div style={bookingsGridStyles}>
              {getFilteredBookings().map((booking) => (
                <div
                  key={booking.id}
                  style={bookingCardStyles}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={completedBadgeStyles}>
                    <MdCheckCircle size={16} style={{ marginRight: '5px' }} />
                    Completed
                  </div>
                  
                  <img
                    src={
                      booking.url ||
                      "https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=1024x1024&w=is&k=20&c=sblj5Fh1RL45NxXJEwTdoSLrexewg6uFbdg_NWvrXXw="
                    }
                    alt={booking.name}
                    style={bookingImageStyles}
                  />
                  
                  <div style={bookingInfoStyles}>
                    <h3 style={bookingNameStyles}>
                      <FaBuilding size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      {booking.name}
                    </h3>
                    
                    <div style={bookingDetailStyles}>
                      <MdDescription size={18} style={iconStyles} />
                      <div>
                        <strong>Description:</strong> {booking.description || "No description available"}
                      </div>
                    </div>
                    
                    <div style={bookingDetailStyles}>
                      <MdLocationOn size={18} style={iconStyles} />
                      <div>
                        <strong>Location:</strong> {booking.location || "Location not specified"}
                      </div>
                    </div>
                    
                    <div style={bookingDetailStyles}>
                      <MdAttachMoney size={18} style={iconStyles} />
                      <div>
                        <strong>Price:</strong> {booking.charges || "Price not specified"}
                      </div>
                    </div>
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