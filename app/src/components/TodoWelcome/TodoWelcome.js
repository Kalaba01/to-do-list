import React from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList } from 'react-icons/fa';
import './TodoWelcome.css';

const TodoWelcome = ({ onAnimationComplete, t }) => {
  return (
    <motion.div
      className="welcome-screen"
      initial={{ y: 0 }}
      animate={{ y: window.innerHeight }}
      transition={{ duration: 2, delay: 2, ease: "easeInOut"  }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.h1 className="welcome-text">
        {t("todoWelcome.header")} <FaClipboardList />
      </motion.h1>
    </motion.div>
  );
};

export default TodoWelcome;
