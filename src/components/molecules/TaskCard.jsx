import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isToday, isPast, isFuture } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete, onArchive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-success';
      default: return 'bg-gray-400';
    }
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    
    if (isPast(date) && !isToday(date)) {
      return { label: 'Overdue', color: 'text-error', icon: 'AlertCircle' };
    }
    if (isToday(date)) {
      return { label: 'Due today', color: 'text-accent', icon: 'Clock' };
    }
    if (isFuture(date)) {
      return { label: format(date, 'MMM d'), color: 'text-gray-500', icon: 'Calendar' };
    }
    return null;
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const isOverdue = dueDateStatus?.label === 'Overdue';

  return (
    <motion.div
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      className={`bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 ${
        isHovered ? 'shadow-lg' : 'shadow-sm'
      } ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <Button
          onClick={() => onToggleComplete(task.id)}
          className="relative flex-shrink-0 mt-1"
          motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
        >
          <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
            task.completed 
              ? 'bg-primary border-primary' 
              : 'border-gray-300 hover:border-primary hover:scale-105'
          }`}>
            {task.completed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <ApperIcon name="Check" className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </div>
        </Button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h3 className={`text-sm font-medium break-words ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900'
              }`}>
                {task.title}
              </h3>

              {/* Meta information */}
              <div className="flex items-center space-x-4 mt-2">
                {/* Priority */}
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)} ${
                    isOverdue && !task.completed ? 'animate-pulse' : ''
                  }`} />
                  <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
                </div>

                {/* Due Date */}
                {dueDateStatus && (
                  <div className={`flex items-center space-x-1 ${dueDateStatus.color}`}>
                    <ApperIcon name={dueDateStatus.icon} className="w-3 h-3" />
                    <span className="text-xs font-medium">{dueDateStatus.label}</span>
                  </div>
                )}

                {/* List */}
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Tag" className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500 capitalize">{task.listId}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <motion.div 
              className={`flex items-center space-x-1 transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Button
                onClick={() => onEdit(task)}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                title="Edit task"
                motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => onArchive(task.id)}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                title="Archive task"
                motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
              >
                <ApperIcon name="Archive" className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => onDelete(task.id)}
                className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"
                title="Delete task"
                motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;