import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Sparkles, Sprout, Recycle } from 'lucide-react';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
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
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const About = () => {
  return (
    <div className="about-page-premium">
      <div className="section-divider" style={{display:'none'}} />
      
      {/* ── Hero Section ── */}
      <section className="about-hero-premium">
        <div className="container">
          <motion.div 
            className="hero-content-premium"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="overflow-hidden">
              <motion.span variants={textReveal} className="hero-subtitle-premium">
                OUR PHILOSOPHY
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={textReveal} className="hero-title-premium">
                Crafted by Nature, <br />
                <span className="text-gold-gradient">Guided by Wisdom.</span>
              </motion.h1>
            </div>
            <motion.p variants={fadeUp} className="hero-description-premium">
              Rooted in ancient Ayurvedic wisdom, we believe that true wellness begins from within. Discover the story behind VedikCare.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Brand Story Section ── */}
      <section className="story-section-premium">
        <div className="container">
          <div className="split-layout-premium">
            <motion.div 
              className="split-image-container"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <img src="/image/vc.jpeg" alt="VedikCare Organic Ingredients" className="parallax-img" />
            </motion.div>

            <motion.div 
              className="split-text-container"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="section-title-premium">
                Pure Nourishment <br/>for Modern Living
              </motion.h2>
              <motion.p variants={fadeUp} className="body-text-premium">
                Founded with a vision to redefine daily nutrition for diabetics, VedikCare brings you specialized Ayurvedic Diabetic Care Protein Powders that support healthy glucose levels and daily vitality. We never compromise or add artificial sugar.
              </motion.p>
              <motion.p variants={fadeUp} className="body-text-premium">
                Every formulation is a harmonious blend of premium plant protein and potent Ayurvedic herbs like Jamun Seed, Karela, Vijaysar, and Gudmar, meticulously crafted to restore balance and support your journey toward holistic wellness.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Founder Section ── */}
      <section className="founder-section-premium">
        <div className="container">
          <div className="split-layout-premium reverse">
            <motion.div 
              className="split-text-container"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} className="section-badge-premium">MEET THE FOUNDER</motion.span>
              <motion.h2 variants={fadeUp} className="section-title-premium">Sakshi Singla</motion.h2>
              <motion.p variants={fadeUp} className="founder-role-premium">Founder & Visionary behind VedikCare</motion.p>
              
              <motion.p variants={fadeUp} className="body-text-premium">
                With a deep-rooted passion for holistic health and sustainable living, Sakshi Singla founded VedikCare to bridge the gap between traditional Ayurvedic wisdom and modern lifestyles.
              </motion.p>

            </motion.div>

            <motion.div 
              className="split-image-container editorial-portrait"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            >
              <img src="/image/vc.jpeg" alt="Sakshi Singla" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="values-section-premium">
        <div className="container">
          <motion.div 
            className="values-header-premium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="section-title-premium text-center">Our Core Commitments</motion.h2>
            <motion.p variants={fadeUp} className="body-text-premium text-center mx-auto">
              Everything we do is guided by these fundamental principles.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="values-grid-premium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { icon: <Leaf size={32} />, title: '100% Organic', text: 'Certified organic ingredients, completely free from pesticides and synthetic chemicals.' },
              { icon: <Sparkles size={32} />, title: 'Ayurvedic Essentials', text: 'Crafted with time-tested Ayurvedic herbs and holistic wellness principles.' },
              { icon: <Sprout size={32} />, title: 'Deep Rooted', text: 'Deeply rooted in authentic traditions and pure, sustainable sourcing.' },
              { icon: <Recycle size={32} />, title: 'Sustainable', text: 'Committed to minimizing our environmental footprint through eco-friendly practices.' }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                className="value-card-premium"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="value-icon-premium">{value.icon}</div>
                <h3 className="value-title-premium">{value.title}</h3>
                <p className="value-text-premium">{value.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default About;
