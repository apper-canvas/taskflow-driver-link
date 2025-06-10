import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className, type = 'button', motionProps = {}, disabled = false, ...rest }) => {
  const { whileHover, whileTap, initial, animate, exit, transition } = motionProps;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;