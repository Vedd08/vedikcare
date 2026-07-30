import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Droplet } from 'lucide-react';
import './JuiceToast.css';

const JuiceToast = () => {
  const { toastConfig, hideToast } = useCart();

  useEffect(() => {
    if (toastConfig.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toastConfig.show, hideToast]);

  return (
    <AnimatePresence>
      {toastConfig.show && (
        <motion.div
          className="juice-toast-container"
          initial={{ y: -100, opacity: 0, scale: 0.9 }}
          animate={{ y: 20, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="juice-toast">
            <div className="juice-icon-wrapper">
              <Droplet size={24} className="juice-droplet-outline" />
              <motion.div 
                className="juice-fill"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="juice-toast-content">
              <h4>Added to Cart</h4>
              <p>{toastConfig.message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JuiceToast;
