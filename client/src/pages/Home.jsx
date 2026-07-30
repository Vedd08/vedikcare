import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Leaf, Zap, Sparkles, Sprout } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCard from '../components/Product/ProductCard';
import './Home.css';


const mockProducts = [
  {
    _id: "1",
    name: 'Diabetic Protein Powder',
    category: 'Diabetic Care',
    description: 'Ayurvedic plant protein enriched with Jamun Seed, Karela, Vijaysar & Gudmar to support healthy blood sugar levels and daily strength.',
    image: '/image/chocolate_diabetic_protein.png',
    badge: 'Coming Soon',
    ingredients: 'Pea Protein, Jamun Seed, Karela, Vijaysar, Gudmar, Cinnamon, Stevia',
    benefits: 'Controls glucose spikes, builds strength, 100% plant-based, zero added sugar.',
    isComingSoon: true
  }
];

// Minimalist smooth reveal animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }
};

const textReveal = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const Home = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="home-page minimal-theme" ref={containerRef}>
      {/* Minimal Hero Section with Background Video */}
      <section className="minimal-hero">
        
        {/* Fullscreen Video Background */}
        <motion.div 
          className="hero-bg-wrapper"
          style={{ y: heroY, scale: imageScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="hero-bg-video"
            poster="/image/vc.jpeg"
          >
            <source src="/video/vedicCare.MP4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark gradient overlay to make text pop */}
          <div className="video-overlay"></div>
        </motion.div>

        {/* Hero Content Overlay */}
        <div className="container hero-content-container">
          <motion.div 
            className="hero-content-centered"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="minimal-title">
                Pure Energy.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="minimal-title indent-right">
                Zero <span className="text-gold">Compromise.</span>
              </motion.h1>
            </div>
            
            <motion.div variants={fadeUp} className="hero-text-minimal">
              <p>
                Elevating wellness through ancient Ayurvedic wisdom. Discover our Diabetic Care Protein Powder, specially crafted for holistic health & sugar balance.
              </p>
              <Link to="/shop" className="minimal-btn">
                Explore Products <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── Divider ── */}
      <div className="section-divider">
        <div className="divider-line" />
        <Leaf size={18} className="divider-leaf" />
        <div className="divider-line" />
      </div>

      {/* ── Features Row ── */}
      <motion.section
        className="features-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        <div className="container">
          <div className="features-grid">
            {[
              { icon: <Leaf size={28} />,        label: '100% Organic',        sub: 'Certified raw ingredients' },
              { icon: <Sparkles size={28} />,    label: 'Ayurvedic Essentials', sub: 'Holistic health formulas' },
              { icon: <Sprout size={28} />,      label: 'Deep Rooted',         sub: 'Grounded in tradition' },
              { icon: <Zap size={28} />,         label: 'No Added Sugar',        sub: 'Pure natural sweetness' },
            ].map((f, i) => (
              <motion.div key={i} className="feature-tile" variants={fadeUp}>
                <div className="feature-icon">{f.icon}</div>
                <strong className="feature-label">{f.label}</strong>
                <span className="feature-sub">{f.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products - Clean Grid */}
      <section className="featured-minimal">
        <div className="container">
          <motion.div 
            className="minimal-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp}>Curated Selection.</motion.h2>
            <motion.p variants={fadeUp}>
              Formulated to support healthy blood sugar levels and daily strength.
            </motion.p>
          </motion.div>

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>


      {/* Minimal Story Split */}
      <section className="minimal-story">
        <div className="container">
          <div className="story-clean-layout">
            <motion.div 
              className="story-image-clean"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <img src="/image/vc.jpeg" alt="Pouring juice" />
            </motion.div>
            <motion.div 
              className="story-text-clean"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="overflow-hidden">
                <motion.h2 variants={textReveal}>The Ritual</motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2 variants={textReveal} className="text-gold">of Health.</motion.h2>
              </div>
              <motion.p variants={fadeUp}>We believe that true health is not just about what you consume, but the intention behind it. Every bottle of VedikCare is a testament to uncompromising quality and deep respect for the earth.</motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/about" className="minimal-link">Discover Our Roots <ArrowRight size={16}/></Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
