import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>RentACar</h3>
          <p>Your trusted partner for premium car rental services. We make your journey comfortable and memorable.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/fleet">Our Fleet</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Daily Rentals</Link></li>
            <li><Link to="/services">Weekly Rentals</Link></li>
            <li><Link to="/services">Airport Transfer</Link></li>
            <li><Link to="/services">Corporate Packages</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>📞 +94 11 234 5678</li>
            <li>✉️ info@rentacar.lk</li>
            <li>📍 Maharagama, Western Province</li>
            <li>🕒 24/7 Service</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 RentACar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;