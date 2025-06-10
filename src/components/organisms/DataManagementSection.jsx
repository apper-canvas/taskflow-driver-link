import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { taskService } from '@/services';

const DataManagementSection = () => {

  const handleExportData = async () => {
    try {
      const tasks = await taskService.getAll();
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Data exported successfully!');
    } catch (err) {
      toast.error('Failed to export data');
    }
  };

  const handleClearData = async () => {
    if (!window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      return;
    }

    try {
      const tasks = await taskService.getAll();
      await Promise.all(tasks.map(task => taskService.delete(task.id)));
      toast.success('All data cleared successfully!');
    } catch (err) {
      toast.error('Failed to clear data');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-500 mt-1">Download a backup of all your tasks</p>
            </div>
            <Button
              onClick={handleExportData}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors duration-200"
              motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
            >
              <ApperIcon name="Download" className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Clear All Data</h3>
                <p className="text-sm text-gray-500 mt-1">Permanently delete all tasks and lists</p>
              </div>
              <Button
                onClick={handleClearData}
                className="flex items-center space-x-2 bg-error text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
                <span>Clear Data</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataManagementSection;