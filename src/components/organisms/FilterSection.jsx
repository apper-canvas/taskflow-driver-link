import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';

const FilterSection = ({ filters, onFiltersChange, taskCount }) => {
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
          <Input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex-shrink-0">
          <Select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            options={priorities}
          />
        </div>

        {/* Status Filter */}
        <div className="flex-shrink-0">
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            options={statuses}
          />
        </div>

        {/* Clear Filters */}
        <AnimatePresence>
          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              motionProps={{ initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }}
            >
              <ApperIcon name="X" className="w-4 h-4" />
              <span>Clear</span>
            </Button>
          )}
        </AnimatePresence>
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

export default FilterSection;