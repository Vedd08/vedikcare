import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 150;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="container">
          <motion.div 
            className="empty-cart-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="empty-cart-icon">
              <ShoppingCart size={64} />
            </div>
            <h1>Your cart is empty</h1>
            <p>It looks like you haven't added any of our fresh blends yet.</p>
            <Link to="/shop" className="btn btn-primary">
              <ShoppingBag size={18} />
              Browse Our Shop
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Your Selection</h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
        </div>

        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-section">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div 
                  key={item._id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <div className="ci-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="ci-details">
                    <div className="ci-header">
                      <h3 onClick={() => navigate(`/product/${item._id}`)}>{item.name}</h3>
                      <button className="ci-remove" onClick={() => removeFromCart(item._id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="ci-category">{item.category}</p>
                    <div className="ci-footer">
                      <div className="ci-qty">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      {/* Price hidden */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <p style={{marginBottom: '20px', color: 'var(--text-secondary)'}}>Pricing details will be provided at the next step.</p>
              <button className="checkout-btn">
                Proceed
                <ArrowRight size={18} />
              </button>
              <Link to="/shop" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
