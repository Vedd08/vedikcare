import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, Plus, Minus, ShoppingBag, Leaf, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    
    const fetchProduct = async () => {
      const MOCK_PRODUCT = {
        _id: 'mock-1',
        name: 'VedikCare Diabetic Protein Powder',
        description: 'Ayurvedic diabetic protein powder crafted with Jamun Seed, Karela, and Vijaysar to support healthy blood sugar levels and daily strength.',
        image: '/image/chocolate_diabetic_protein.png',
        category: 'Diabetic Care',
        badge: 'Signature Blend',
        isComingSoon: true,
        ingredients: 'Pea Protein, Jamun Seed, Karela, Vijaysar, Monk Fruit Extract, Prebiotics',
        benefits: 'Blood Sugar Management, Sustained Energy, Digestive Health'
      };

      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        if (data && data._id) {
          setProduct(data);
        } else {
          if (id === 'mock-1') setProduct(MOCK_PRODUCT);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        if (id === 'mock-1') setProduct(MOCK_PRODUCT);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (loading) {
    return (
      <div className="pd-loading">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="pd-spinner"
        />
        <p>Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-error">
        <h2>Product not found</h2>
        <button className="pd-back-btn" onClick={() => navigate('/shop')}>
          <ArrowLeft size={20} /> Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="pd-back-link" onClick={() => navigate('/shop')}>
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="pd-wrapper">
          {/* Left Side: Image */}
          <motion.div 
            className="pd-image-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {product.badge && <div className="pd-badge">{product.badge}</div>}
            <div className="pd-image-container">
              <img src={product.image} alt={product.name} className="pd-image" />
            </div>
          </motion.div>

          {/* Right Side: Details */}
          <motion.div 
            className="pd-info-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="pd-meta">
              <Leaf size={16} className="pd-leaf" />
              <span>{product.category || 'Wellness'}</span>
            </div>

            <h1 className="pd-title">{product.name}</h1>
            {product.isComingSoon && (
              <p className="pd-price" style={{ color: 'var(--metallic-gold)' }}>Coming Soon</p>
            )}
            
            <p className="pd-description">{product.description}</p>

            {/* Ingredients & Benefits */}
            <div className="pd-details-box">
              <div className="pd-detail-item">
                <h3>Key Ingredients</h3>
                <p>{product.ingredients || 'Organic, cold-pressed goodness.'}</p>
              </div>
              <div className="pd-detail-item">
                <h3>Primary Benefits</h3>
                <p>{product.benefits || 'Supports overall health and vitality.'}</p>
              </div>
            </div>

            {/* Features list */}
            <ul className="pd-features">
              <li><CheckCircle2 size={16} /> 100% Organic & Cold-Pressed</li>
              <li><CheckCircle2 size={16} /> No Added Sugar or Preservatives</li>
              <li><CheckCircle2 size={16} /> Made Fresh Daily</li>
            </ul>

            {/* ── Nutrition Facts Table ── */}
            {product.nutrition && product.nutrition.length > 0 && (
              <div className="pd-nutrition-wrap">
                <h3 className="pd-nutrition-heading">Nutrition Facts</h3>
                <p className="pd-nutrition-sub">Per serving · % Daily Value*</p>
                <div className="pd-nutrition-table">
                  {product.nutrition.map((row, i) => (
                    <div key={i} className={`pd-nut-row ${i === 0 ? 'serving-row' : ''}`}>
                      <span className="pd-nut-label">{row.label}</span>
                      <span className="pd-nut-value">
                        {row.value}{row.unit}
                        {row.percent != null && (
                          <span className="pd-nut-bar-wrap">
                            <span
                              className="pd-nut-bar"
                              style={{ width: `${Math.min(row.percent, 100)}%` }}
                            />
                          </span>
                        )}
                      </span>
                      {row.percent != null && (
                        <span className="pd-nut-pct">{row.percent}%</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="pd-nutrition-disclaimer">
                  * Percent Daily Values based on a 2,000 kcal diet.
                </p>
              </div>
            )}

            {/* Actions */}
            {!product.isComingSoon && (
              <div className="pd-action-bar">
                <div className="pd-qty-selector">
                  <button onClick={handleDecrement}><Minus size={16} /></button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrement}><Plus size={16} /></button>
                </div>
                
                <button className="pd-add-to-cart" onClick={() => addToCart(product, quantity)}>
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
