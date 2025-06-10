import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const HeaderSection = ({ title, description, actionLabel, onAction, actionIcon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
        
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors duration-200"
            motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
          >
            {actionIcon && <ApperIcon name={actionIcon} className="w-4 h-4" />}
            <span>{actionLabel}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderSection;