import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total, className = '' }) => {
  if (total === 0) return null;
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`mt-4 ${className}`}>
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;