import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ProductCard from '../components/Product/ProductCard';
import './Products.css';

const categories = ['All', 'Diabetic Care', 'Daily Nutrition'];

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter(product => 
    activeCategory === 'All' || product.category === activeCategory
  );

  return (
    <div className="products-page">
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1>Our Diabetic Care Range</h1>
            <p>100% plant-based Ayurvedic protein powders formulated to support healthy blood sugar & daily strength.</p>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="products-grid">
            <AnimatePresence>
              {loading ? (
                <div className="products-empty">
                  <h3>Loading products...</h3>
                  <p>Preparing your selection</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="comparison-section">
        <div className="container">
          <div className="section-title">
            <h2>Why VedikCare Diabetic Care?</h2>
            <p className="section-subtitle">See how our Ayurvedic Diabetic Protein Powder compares to standard protein supplements.</p>
          </div>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>VedikCare Diabetic Care</th>
                  <th>Standard Protein Powders</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blood Sugar Support</td>
                  <td><span className="text-gold">VijaySar Enrich, fenugreek, Ajwain, Moringa</span></td>
                  <td>No Sugar Management Botanicals</td>
                </tr>
                <tr>
                  <td>Sweetener</td>
                  <td><span className="text-gold">Monk Fruit Extract</span></td>
                  <td>High Spike Risk / Added Sugar</td>
                </tr>
                <tr>
                  <td>Digestibility</td>
                  <td><span className="text-gold">Herbal Blend Prebiotics</span></td>
                  <td>Heavy Synthetic Fillers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
