import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

import mainLogo from '../../assets/VedikCare-removebg-preview.png';
import smallLogo from '../../assets/vc-removebg-preview.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Story', path: '/about' },
    { name: 'Shop', path: '/shop' }
  ];

  return (
    <motion.header 
      className={`minimal-navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="nav-container container">
        
        {/* Left Links */}
        <nav className="nav-links left-links">
          {navLinks.slice(0, 2).map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <Link to="/" className="minimal-logo">
          <img src={mainLogo} alt="VedikCare" className="nav-logo-image desktop-logo" />
          <img src={smallLogo} alt="VC" className="nav-logo-image mobile-logo" />
        </Link>
        
        {/* Right Actions */}
        <div className="nav-actions right-links">
          {navLinks.slice(2).map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/cart" className="minimal-action-btn">
            Cart ({getCartCount()})
          </Link>
          
          <Link to="/login" className="minimal-action-icon">
            <User size={20} />
          </Link>

          <div className="hamburger" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="close-menu" onClick={() => setMobileMenuOpen(false)}>
          <X size={32} />
        </div>
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="mobile-menu-actions">
          <Link to="/login" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;