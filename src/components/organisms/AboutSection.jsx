import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About TaskFlow</h2>
        
        <div className="space-y-3 text-sm text-gray-600">
          <p>TaskFlow is a streamlined task management application designed to help you stay organized and productive.</p>
          <p>Version 1.0.0</p>
          <p>Built with React, Tailwind CSS, and Framer Motion</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;