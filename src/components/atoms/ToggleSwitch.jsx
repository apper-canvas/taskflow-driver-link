import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ checked, onChange, className = '' }) => {
  return (
    <Button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? 'bg-primary' : 'bg-gray-200'
      } ${className}`}
      motionProps={{ whileTap: { scale: 0.95 } }}
      // Do not pass the original onClick here as it's handled by Button's onClick prop
    >
      <motion.span
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
      />
    </Button>
  );
};

export default ToggleSwitch;