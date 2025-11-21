import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>Grand Hotel & Resort</h4>
          <p className="muted">
            Luxury hotel management system providing world-class hospitality
            services and exceptional guest experiences.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <nav className="footer-links">
            <a href="/">Home</a>
            <a href="/search">Search Rooms</a>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <address className="footer-contact">
            123 Luxury Avenue<br />
            Hotel District, City 10001<br />
            <a href="mailto:info@grandhotel.com">info@grandhotel.com</a><br />
            <a href="tel:+15551234567">(555) 123-4567</a>
          </address>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="socials">
            <a className="social" href="#" aria-label="Facebook">📘</a>
            <a className="social" href="#" aria-label="Twitter">🐦</a>
            <a className="social" href="#" aria-label="Instagram">📸</a>
            <a className="social" href="#" aria-label="LinkedIn">🔗</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="muted">© {new Date().getFullYear()} Grand Hotel & Resort. All rights reserved.</p>
        <a href="/admin-login" className="staff-link">Staff</a>
      </div>
    </footer>
  );
};

export default Footer;
