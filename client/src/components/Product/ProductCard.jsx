import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingBag, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(q => q + 1);
  };
  const handleDecrement = (e) => {
    e.stopPropagation();
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, quantity);
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="pc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
      as={motion.div}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="pc-badge">{product.badge}</div>
      )}

      {/* Image area */}
      <div className="pc-image-wrap">
        <img src={product.image} alt={product.name} className="pc-image" />

        {/* Hover reveal overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="pc-overlay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
              {product.ingredients && (
                <div className="pc-overlay-block">
                  <span className="pc-overlay-label">Ingredients</span>
                  <p className="pc-overlay-text">{product.ingredients}</p>
                </div>
              )}
              {product.benefits && (
                <div className="pc-overlay-block">
                  <span className="pc-overlay-label">Benefits</span>
                  <p className="pc-overlay-text">{product.benefits}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="pc-body">
        {/* Top row: name + price */}
        <div className="pc-header">
          <div className="pc-meta">
            <Leaf size={13} className="pc-leaf" />
            <span className="pc-category">{product.category || 'Wellness'}</span>
          </div>
          <h3 className="pc-name">{product.name}</h3>
          <p className="pc-desc">{product.description}</p>
        </div>

        {/* Bottom: price + actions */}
        <div className="pc-footer">
          {product.isComingSoon ? (
            <div className="pc-coming-soon-text">Coming Soon</div>
          ) : (
            <>
              <span className="pc-price">₹{product.price}</span>

              <div className="pc-actions">
                {/* Quantity */}
                <div className="pc-qty">
                  <button className="pc-qty-btn" onClick={handleDecrement} aria-label="Decrease">
                    <Minus size={14} />
                  </button>
                  <span className="pc-qty-val">{quantity}</span>
                  <button className="pc-qty-btn" onClick={handleIncrement} aria-label="Increase">
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to cart */}
                <button className="pc-add-btn" onClick={handleAddToCart}>
                  <ShoppingBag size={16} />
                  <span>Add</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;