import React from "react";
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <p>Film Shop</p>
          <p>Замовляйте фільми з нами.</p>
        </div>
        <div className="footer-logo"><span>LOGO</span></div>
        <div className="footer-social">
          <span className="social-icon">f</span>
          <span className="social-icon">t</span>
          <span className="social-icon">in</span>
          <span className="social-icon">g+</span>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2025 IoT © все працює</p>
      </div>
    </footer>
  );
}

