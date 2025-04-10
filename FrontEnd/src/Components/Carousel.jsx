import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FaHome, FaBuilding, FaWarehouse } from "react-icons/fa";

const images = [
  {
    url: "https://images.pexels.com/photos/31391053/pexels-photo-31391053/free-photo-of-modern-open-kitchen-and-dining-interior.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Modern Living Spaces",
    description: "Discover contemporary homes designed for modern lifestyles"
  },
  {
    url: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Luxury Properties",
    description: "Explore exclusive high-end properties in prime locations"
  },
  {
    url: "https://images.pexels.com/photos/31391066/pexels-photo-31391066/free-photo-of-cozy-living-room-with-fireplace-and-bookshelves.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Cozy Home Interiors",
    description: "Find comfortable spaces that feel like home from day one"
  },
];

const Carousel = () => {
  // Main container styles
  const carouselContainerStyles = {
    width: '100%',
    marginBottom: '40px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    position: 'relative',
  };
  
  // Slide content overlay styles
  const slideOverlayStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
    color: 'white',
    padding: '30px 20px 20px',
    textAlign: 'left',
    width: '100%',
  };
  
  // Title styles
  const slideTitleStyles = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  };
  
  // Description styles
  const slideDescriptionStyles = {
    fontSize: '16px',
    opacity: '0.9',
    maxWidth: '80%',
  };
  
  // Icon styles
  const iconStyles = {
    marginRight: '10px',
    color: '#FF385C',
  };
  
  // Custom navigation button styles
  const navigationStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#333',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  };
  
  // Pagination bullet styles (applied via CSS class overrides)
  const paginationStyles = {
    position: 'absolute',
    bottom: '10px',
    zIndex: '10',
  };
  
  // Image styles
  const imageStyles = {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    display: 'block',
  };

  // Get appropriate icon for each slide
  const getSlideIcon = (index) => {
    switch(index) {
      case 0:
        return <FaHome size={24} style={iconStyles} />;
      case 1:
        return <FaBuilding size={24} style={iconStyles} />;
      case 2:
        return <FaWarehouse size={24} style={iconStyles} />;
      default:
        return <FaHome size={24} style={iconStyles} />;
    }
  };

  return (
    <div style={carouselContainerStyles}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
          bulletClass: 'swiper-pagination-bullet',
        }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false 
        }}
        effect="fade"
        loop={true}
        speed={800}
        style={{ 
          width: '100%', 
          height: '500px',
        }}
      >
        {images.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.url}
              alt={`Property ${index + 1}`}
              style={imageStyles}
            />
            <div style={slideOverlayStyles}>
              <h2 style={slideTitleStyles}>
                {getSlideIcon(index)}
                {slide.title}
              </h2>
              <p style={slideDescriptionStyles}>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
        
        <div className="swiper-button-next" style={{
          ...navigationStyles,
          right: '20px',
        }}></div>
        
        <div className="swiper-button-prev" style={{
          ...navigationStyles,
          left: '20px',
        }}></div>
        
        <div className="swiper-pagination" style={paginationStyles}></div>
      </Swiper>
    </div>
  );
};

export default Carousel;