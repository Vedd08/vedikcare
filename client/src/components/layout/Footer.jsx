import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';
import logoImage from '../../assets/VedikCare-removebg-preview.png';

const Footer = () => {
  return (
    <footer className="mega-footer">
      <div className="footer-gold-divider"></div>
      <div className="container">
        
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <h2 className="footer-logo-text">VedikCare</h2>
            </Link>
            <p className="footer-desc">
              Elevating wellness through ancient Ayurvedic wisdom and uncompromising premium organic sourcing for diabetic care.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/shop">Diabetic Protein Powder</Link></li>
              <li><Link to="/shop">Wellness Combos</Link></li>
              <li><Link to="/shop">Gift Packs</Link></li>
              <li><Link to="/shop">Subscriptions</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Support</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/track">Track Order</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p className="footer-desc">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-flex">
            <p>&copy; {new Date().getFullYear()} VedikCare. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
          <p className="footer-disclaimer">
            Disclaimer: These statements have not been evaluated by the FDA or Ayush. This product is not intended to diagnose, treat, cure, or prevent any disease. Please consult your physician before use.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
