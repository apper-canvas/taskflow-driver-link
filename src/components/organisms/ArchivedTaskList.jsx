import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import ArchiveTaskCard from '@/components/molecules/ArchiveTaskCard';
import EmptyState from '@/components/molecules/EmptyState';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import HeaderSection from '@/components/molecules/HeaderSection';
import Button from '@/components/atoms/Button';
import { taskService } from '@/services';

const ArchivedTaskList = () => {
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
      <HeaderSection
        title="Archived Tasks"
        description={`${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} in archive`}
        actionLabel={tasks.length > 0 ? "Clear Archive" : null}
        onAction={tasks.length > 0 ? handleClearArchive : null}
        actionIcon="Trash2"
        className="bg-error hover:bg-red-600" // Custom class for header button
      />

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
                >
                  <ArchiveTaskCard
                    task={task}
                    onRestore={handleRestoreTask}
                    onDelete={handleDeleteTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArchivedTaskList;