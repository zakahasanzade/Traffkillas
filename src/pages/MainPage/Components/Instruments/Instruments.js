import React from "react";
import "./Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";

const Instruments = () => {
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
    
    </motion.div>
  );
};

export default Instruments;
