import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ArchiveTaskCard = ({ task, onRestore, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-success';
      default: return 'bg-gray-400';
    }
  };

  return (
    <motion.div 
        layout
        className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
    >
      <div className="flex items-start space-x-4">
        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-500 line-through break-words">
            {task.title}
          </h3>
          
          <div className="flex items-center space-x-4 mt-2">
            {/* Priority */}
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
              <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
            </div>

            {/* List */}
            <div className="flex items-center space-x-1">
              <ApperIcon name="Tag" className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 capitalize">{task.listId}</span>
            </div>

            {/* Completed Date */}
            {task.completedAt && (
              <div className="flex items-center space-x-1">
                <ApperIcon name="Check" className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  Completed {new Date(task.completedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1">
          <Button
            onClick={() => onRestore(task.id)}
            className="p-1 rounded hover:bg-green-50 text-gray-400 hover:text-green-600"
            title="Restore task"
            motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
          </Button>

          <Button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"
            title="Delete permanently"
            motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchiveTaskCard;