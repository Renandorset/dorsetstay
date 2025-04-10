import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addId } from '../Redux/slice';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaMapMarkerAlt, FaStar, FaDollarSign, FaSearch } from 'react-icons/fa';
import Carousel from '../Components/Carousel';

export default function MainStarter() {
  const email = useSelector((state) => state.slice.email);
  const password = useSelector((state) => state.slice.password);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Main container styles - fixed the marginTop issue
  const containerStyles = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
 
  };
  
  // Page wrapper - ensures proper spacing
  const pageWrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };
  
  // Header section styles
  const headerSectionStyles = {
    marginBottom: '30px',
  };
  
  // Heading styles
  const headingStyles = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '30px 0 10px',
    textAlign: 'center',
    color: '#333',
  };
  
  // Subheading styles
  const subheadingStyles = {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  };
  
  // Search bar styles
  const searchBarStyles = {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto 30px',
    backgroundColor: '#fff',
    borderRadius: '30px',
    padding: '10px 20px',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
  };
  
  // Search input styles
  const searchInputStyles = {
    flex: '1',
    border: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    outline: 'none',
  };
  
  // Search icon styles
  const searchIconStyles = {
    color: '#FF385C',
    marginRight: '10px',
  };
  
  // Loading container styles
  const loadingContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  };
  
  // Loading spinner styles with keyframes animation
  const loadingSpinnerStyles = {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #FF385C',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
    marginBottom: '20px',
  };
  
  // Properties grid styles
  const propertiesGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '20px',
  };
  
  // Property card styles with hover effect
  const propertyCardStyles = {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#fff',
    cursor: 'pointer',
  };
  
  // Image container styles
  const imageContainerStyles = {
    position: 'relative',
    height: '200px',
  };
  
  // Image styles
  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
  
  // Favorite button styles
  const favoriteButtonStyles = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    zIndex: '1',
  };
  
  // Featured tag styles
  const featuredTagStyles = {
    position: 'absolute',
    top: '15px',
    left: '15px',
    backgroundColor: '#FF385C',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: '1',
  };
  
  // Info container styles
  const infoContainerStyles = {
    padding: '20px',
  };
  
  // Header styles
  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  };
  
  // Title styles
  const titleStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
    color: '#333',
  };
  
  // Rating styles
  const ratingStyles = {
    display: 'flex',
    alignItems: 'center',
    color: '#FF385C',
  };
  
  // Location styles
  const locationStyles = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#555',
    marginBottom: '12px',
  };
  
  // Description styles
  const descriptionStyles = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.5',
  };
  
  // Footer styles
  const footerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  };
  
  // Price styles
  const priceStyles = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '16px',
  };
  
  // View button styles
  const viewButtonStyles = {
    backgroundColor: '#FF385C',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };
  
  // No results styles
  const noResultsStyles = {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666',
    fontSize: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    margin: '30px 0',
  };

  // Fetch property data
  const getData = async () => { 
    try {
      let result = await fetch("http://127.0.0.1:8000/api/propertylistings");
      let data = await result.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  
  useEffect(() => {
    setLoading(true);
    getData().then((data) => {
      console.log(data);
      setProperties(data);
      setLoading(false);
    });
  }, []);

  // Handle property details view
  const handleViewDetails = (id) => {
    dispatch(addId({id: id}));
    navigate("/main/property/");
  };

  // Toggle favorite status
  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Filter properties based on search term
  const filteredProperties = properties
    ? properties
        .filter((property) => 
          property.availability === true && 
          property.confirmation === false &&
          (searchTerm === '' || 
           property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           property.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    : [];

  return (
    <div style={pageWrapperStyles}>
      <div style={containerStyles}>    
        <div style={headerSectionStyles}>
          <Carousel />
          <h2 style={headingStyles}>Find Your Perfect Property</h2>
          <p style={subheadingStyles}>
            Discover the best properties in your area with our extensive listings
          </p>
          
          <div style={searchBarStyles}>
            <FaSearch style={searchIconStyles} />
            <input 
              type="text" 
              placeholder="Search by name, location, or description..." 
              style={searchInputStyles}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div style={loadingContainerStyles}>
            <div style={loadingSpinnerStyles}></div>
            <p>Finding available properties...</p>
          </div>
        ) : (
          <div style={propertiesGridStyles}>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div 
                  key={property.id} 
                  style={propertyCardStyles}
                  onClick={() => handleViewDetails(property.id)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={imageContainerStyles}>
                    <img 
                      src={property.url || "https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=1024x1024&w=is&k=20&c=sblj5Fh1RL45NxXJEwTdoSLrexewg6uFbdg_NWvrXXw="} 
                      alt={property.name} 
                      style={imageStyles}
                    />
                    <button 
                      style={favoriteButtonStyles}
                      onClick={(e) => toggleFavorite(e, property.id)}
                      aria-label="Add to favorites"
                    >
                      {favorites.includes(property.id) ? (
                        <AiFillHeart size={20} color="#FF385C" />
                      ) : (
                        <AiOutlineHeart size={20} color="#555" />
                      )}
                    </button>
                    
                    {property.featured && (
                      <span style={featuredTagStyles}>Featured</span>
                    )}
                  </div>
                  
                  <div style={infoContainerStyles}>
                    <div style={headerStyles}>
                      <h3 style={titleStyles}>{property.name}</h3>
                      <div style={ratingStyles}>
                        <FaStar size={16} style={{ marginRight: '4px' }} />
                        <span>{property.rating || "4.8"}</span>
                      </div>
                    </div>
                    
                    <p style={locationStyles}>
                      <FaMapMarkerAlt size={14} style={{ marginRight: '4px' }} />
                      {property.location || "Location not specified"}
                    </p>
                    
                    <p style={descriptionStyles}>
                      {property.description 
                        ? (property.description.length > 100 
                            ? `${property.description.substring(0, 100)}...` 
                            : property.description)
                        : "No description available"}
                    </p>
                    
                    <div style={footerStyles}>
                      <p style={priceStyles}>
                        <FaDollarSign size={16} style={{ marginRight: '4px' }} />
                        <strong>{property.charges || "Price not specified"}</strong>
                      </p>
                      
                      <button
                        style={viewButtonStyles}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(property.id);
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#e03151';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#FF385C';
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={noResultsStyles}>
                <p>No properties match your search criteria. Please try different search terms or check back later.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}