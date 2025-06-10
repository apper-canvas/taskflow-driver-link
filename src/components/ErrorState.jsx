import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const ErrorState = ({ message = "Something went wrong", onRetry = null }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-12"
    >
      <div className="mb-4">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{message}</p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors duration-200"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorState;