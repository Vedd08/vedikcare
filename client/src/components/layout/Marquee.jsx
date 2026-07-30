import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import './Marquee.css';

const Marquee = () => {
  const words = [
    "100% ORGANIC", "COLD PRESSED", "ZERO PRESERVATIVES", "NO ADDED SUGAR", "PURE WELLNESS",
    "100% ORGANIC", "COLD PRESSED", "ZERO PRESERVATIVES", "NO ADDED SUGAR", "PURE WELLNESS",
  ];

  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {words.map((word, index) => (
          <div className="marquee-item" key={index}>
            <span>{word}</span>
            <Leaf size={24} className="marquee-icon" />
          </div>
        ))}
        {/* Duplicate for seamless looping */}
        {words.map((word, index) => (
          <div className="marquee-item" key={`dup-${index}`}>
            <span>{word}</span>
            <Leaf size={24} className="marquee-icon" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
