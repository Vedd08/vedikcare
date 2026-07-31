import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Leaf, Zap, ShieldCheck, Sprout, Star } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import ProductCard from '../components/Product/ProductCard';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const Home = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [expandedBenefit, setExpandedBenefit] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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

  return (
    <div className="home-page heritage-theme" ref={containerRef}>
      
      {/* ── Hero Section ── */}
      <section className="heritage-hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: 1000 }}>
        <div className="container">
          <div className="hero-grid">
            <motion.div 
              className="hero-content"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 variants={fadeUp}>Heritage Wellness,<br/>Modern Care.</motion.h1>
              <motion.p variants={fadeUp} className="text-lg">
                Ayurvedic diabetic protein powder crafted with Jamun Seed, Karela, and Vijaysar to support healthy blood sugar levels and daily strength.
              </motion.p>
              <motion.div variants={fadeUp} className="hero-actions">
                <Link to="/shop" className="btn btn-primary">
                  Shop Protein
                </Link>
                <Link to="/about" className="btn btn-tertiary">
                  Discover Our Story
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="hero-image-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              style={{ y: heroY, rotateX, rotateY }}
            >
              <img src="/image/chocolate_diabetic_protein.png" alt="VedikCare Diabetic Protein Powder" className="hero-product-img" />
              <div className="hero-image-backdrop"></div>
              {/* Unique Rotating Stamp */}
              <div className="coming-soon-stamp" style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '130px',
                height: '130px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
              }}>
                <style>
                  {`
                    @keyframes spin-stamp {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `}
                </style>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', animation: 'spin-stamp 15s linear infinite' }}>
                  <defs>
                    <path id="textCircle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  </defs>
                  <text fontSize="12" fontWeight="700" fill="var(--primary)" letterSpacing="1">
                    <textPath href="#textCircle" startOffset="0%">
                      • COMING SOON • VEDIKCARE • COMING SOON • VEDIKCARE 
                    </textPath>
                  </text>
                </svg>
                <div style={{ position: 'absolute', color: 'var(--accent)', fontSize: '24px' }}>
                  ✦
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Row ── */}
      <motion.section
        className="heritage-features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container">
          <div className="features-grid">
            {[
              { icon: <Zap size={24} />, label: 'Zero Sugar' },
              { icon: <ShieldCheck size={24} />, label: 'Low GI' },
              { icon: <Leaf size={24} />, label: 'Ayurvedic' },
              { icon: <Sprout size={24} />, label: 'Plant Protein' },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                className="feature-item" 
                variants={fadeUp}
                whileHover={{ scale: 1.08, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="feature-icon-circle">{f.icon}</div>
                <span className="feature-text">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Science Meets Heritage (Split Layout) ── */}
      <section className="science-heritage-section">
        <div className="container">
          <div className="split-layout">
            <motion.div 
              className="split-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2>Science Meets Heritage</h2>
              <p>We blend centuries of Ayurvedic knowledge with modern nutritional science to create supplements that actually work.</p>
              <img src="/image/vc.jpeg" alt="Ayurvedic Ingredients" className="split-image" />
            </motion.div>
            
            <motion.div 
              className="split-right"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="benefits-list">
                {[
                  { title: "Blood Sugar Management", desc: "Vijaysar, fenugreek, ajwain, and moringa naturally support glucose metabolism." },
                  { title: "Sustained Energy", desc: "High-quality pea protein provides a slow release of energy throughout the day." },
                  { title: "Digestive Health", desc: "Enriched with digestive enzymes and fibers to ensure maximum absorption without bloating." }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    className={`benefit-item ${expandedBenefit === i ? 'active' : ''}`} 
                    variants={fadeUp}
                    onClick={() => setExpandedBenefit(expandedBenefit === i ? null : i)}
                    style={{ cursor: 'pointer', padding: '16px', background: expandedBenefit === i ? 'var(--surface-white)' : 'transparent', borderRadius: '16px', border: expandedBenefit === i ? '1px solid rgba(20, 70, 27, 0.1)' : '1px solid transparent', transition: 'background 0.3s' }}
                    layout
                  >
                    <motion.div layout className="benefit-dot" style={{ backgroundColor: expandedBenefit === i ? 'var(--accent)' : 'rgba(20, 70, 27, 0.2)', transition: 'background 0.3s' }}></motion.div>
                    <div style={{ flex: 1 }}>
                      <motion.h4 layout style={{ color: expandedBenefit === i ? 'var(--primary)' : 'rgba(74, 88, 76, 0.8)', transition: 'color 0.3s', margin: 0 }}>
                        {benefit.title}
                      </motion.h4>
                      <AnimatePresence>
                        {expandedBenefit === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden', margin: 0 }}
                          >
                            {benefit.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ── Featured Products / Simple Pricing ── */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header center">
            <h2>Our Products</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
