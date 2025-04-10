import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Support Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Support</h3>
          <ul className="footer-list">
            <li>FAQs</li>
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Booking Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Bookings</h3>
          <ul className="footer-list">
            <li>Book a Flat</li>
            <li>Reserve a Table</li>
            <li>Special Offers</li>
            <li>Corporate Bookings</li>
          </ul>
        </div>

        {/* Connect Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Connect</h3>
          <ul className="footer-list">
            <li>Email: support@example.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Follow us on:</li>
            <div className="footer-social">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
