import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import { taskService } from '../services';

const Archive = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArchivedTasks();
  }, []);

  const loadArchivedTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const allTasks = await taskService.getAll();
      const archivedTasks = allTasks.filter(task => task.archived);
      setTasks(archivedTasks);
    } catch (err) {
      setError(err.message || 'Failed to load archived tasks');
      toast.error('Failed to load archived tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await taskService.update(id, {
        ...task,
        archived: false
      });
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task restored successfully!');
    } catch (err) {
      toast.error('Failed to restore task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task permanently deleted!');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleClearArchive = async () => {
    if (!window.confirm('Are you sure you want to permanently delete all archived tasks? This action cannot be undone.')) {
      return;
    }

    try {
      await Promise.all(tasks.map(task => taskService.delete(task.id)));
      setTasks([]);
      toast.success('Archive cleared successfully!');
    } catch (err) {
      toast.error('Failed to clear archive');
    }
  };

  if (loading) {
    return <SkeletonLoader count={5} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadArchivedTasks} />;
  }

  return (
    <div className="max-w-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Archived Tasks</h1>
            <p className="text-gray-500 mt-1">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} in archive
            </p>
          </div>
          
          {tasks.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearArchive}
              className="flex items-center space-x-2 bg-error text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
              <span>Clear Archive</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <EmptyState
            title="No archived tasks"
            description="Completed tasks that you archive will appear here. You can restore them or delete them permanently."
            icon="Archive"
          />
        ) : (
          <motion.div layout className="space-y-3">
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.05 }}
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
                          <div className={`w-2 h-2 rounded-full ${
                            task.priority === 'high' ? 'bg-error' :
                            task.priority === 'medium' ? 'bg-accent' : 'bg-success'
                          }`} />
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
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRestoreTask(task.id)}
                        className="p-1 rounded hover:bg-green-50 text-gray-400 hover:text-green-600"
                        title="Restore task"
                      >
                        <ApperIcon name="RotateCcw" className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"
                        title="Delete permanently"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Archive;