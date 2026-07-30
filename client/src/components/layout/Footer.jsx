import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';
import logoImage from '../../assets/VedikCare-removebg-preview.png';

const Footer = () => {
  return (
    <footer className="mega-footer">
      <div className="container">
        {/* Massive Call to Action */}
        <div className="footer-massive-cta">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="footer-big-text"
          >
            STAY<br/><span className="indent-gold">ORGANIC.</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="footer-cta-btn"
          >
            <Link to="/shop" className="circle-btn">
              Shop<br/>Now
            </Link>
          </motion.div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src={logoImage} alt="VedikCare" className="footer-logo-image" />
            </Link>
            <p className="footer-desc">
              Elevating wellness through ancient Ayurvedic wisdom and uncompromising premium organic sourcing.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Our Philosophy</Link></li>
              <li><Link to="/shop">Shop Diabetic Care</Link></li>
              <li><Link to="/benefits">Health Benefits</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Customer Care</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/track">Track Order</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Say Hello</h3>
            <ul>
              <li><MapPin size={18} /> 123 Wellness Ave, Mumbai</li>
              <li><Phone size={18} /> +91 98765 43210</li>
              <li><Mail size={18} /> hello@vedikcare.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VedikCare. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
