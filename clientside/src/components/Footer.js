import React from 'react';
import './Footer.css'; // You can create a separate CSS file for styling
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <a href='https://www.techloyce.com/' target='_blank' rel="noopener noreferrer">About Us</a>
            <div>
                <h3>Contact Us:</h3>
                <p>Email: <a href="mailto:info@techloyce.com">info@techloyce.com</a></p>
                <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
            </div>
          </div>
          <p>&copy; 2023 Techloyce. All rights reserved.</p>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/Techloyce" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Ftechloyce" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.linkedin.com/company/techloyce" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
