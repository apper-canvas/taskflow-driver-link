import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8"
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        
        <Button
          onClick={() => navigate('/today')}
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors duration-200"
          motionProps={{ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }}
        >
          <ApperIcon name="Home" className="w-5 h-5" />
          <span>Go to Today's Tasks</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;