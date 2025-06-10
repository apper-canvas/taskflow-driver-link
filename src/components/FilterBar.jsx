import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const FilterBar = ({ filters, onFiltersChange, taskCount }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      priority: '',
      status: 'all'
    });
  };

  const hasActiveFilters = filters.search || filters.priority || filters.status !== 'all';

  const priorities = [
    { id: '', label: 'All Priorities' },
    { id: 'high', label: 'High', color: 'bg-error' },
    { id: 'medium', label: 'Medium', color: 'bg-accent' },
    { id: 'low', label: 'Low', color: 'bg-success' }
  ];

  const statuses = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 relative">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex-shrink-0">
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex-shrink-0">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ApperIcon name="X" className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      {/* Results count */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'} found
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>
    </div>
  );
};

export default FilterBar;