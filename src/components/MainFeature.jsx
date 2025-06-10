import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';
import EmptyState from './EmptyState';
import SkeletonLoader from './SkeletonLoader';
import ErrorState from './ErrorState';
import { taskService } from '../services';

const MainFeature = ({ 
  listType = 'all', 
  filterByList = null, 
  filterByDate = null,
  title = "All Tasks",
  showAddButton = true 
}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    status: 'all'
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await taskService.getAll();
      setTasks(result);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        listId: filterByList || 'personal',
        completed: false,
        archived: false,
        createdAt: new Date().toISOString(),
        completedAt: null
      });
      setTasks(prev => [newTask, ...prev]);
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await taskService.update(id, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task reopened');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleArchiveTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await taskService.update(id, {
        ...task,
        archived: true
      });
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task archived');
    } catch (err) {
      toast.error('Failed to archive task');
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks.filter(task => !task.archived);

    // Filter by list
    if (filterByList) {
      filtered = filtered.filter(task => task.listId === filterByList);
    }

    // Filter by date
    if (filterByDate === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(task => 
        task.dueDate && task.dueDate.split('T')[0] === today
      );
    } else if (filterByDate === 'upcoming') {
      const today = new Date();
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return taskDate > today;
      });
    }

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(task => {
        if (filters.status === 'completed') return task.completed;
        if (filters.status === 'pending') return !task.completed;
        return true;
      });
    }

    return filtered.sort((a, b) => {
      // Sort by completion status first (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      // Finally by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = filteredTasks.filter(task => task.completed).length;

  if (loading) {
    return <SkeletonLoader count={5} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="max-w-full space-y-6">
      {/* Header with stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-1">
              {filteredTasks.length} tasks total • {completedCount} completed
            </p>
          </div>
          
          {showAddButton && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors duration-200"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Task</span>
            </motion.button>
          )}
        </div>

        {/* Progress bar */}
        {filteredTasks.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedCount / filteredTasks.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / filteredTasks.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <FilterBar 
        filters={filters}
        onFiltersChange={setFilters}
        taskCount={filteredTasks.length}
      />

      {/* Task Form Modal */}
      <AnimatePresence>
        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? 
              (data) => handleUpdateTask(editingTask.id, data) : 
              handleCreateTask
            }
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            defaultListId={filterByList}
          />
        )}
      </AnimatePresence>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            description={filters.search || filters.priority || filters.status !== 'all' 
              ? "Try adjusting your filters to see more tasks."
              : "Create your first task to get started!"
            }
            actionLabel={showAddButton ? "Add Task" : null}
            onAction={showAddButton ? () => setShowForm(true) : null}
            icon="CheckSquare"
          />
        ) : (
          <motion.div layout className="space-y-3">
            <AnimatePresence>
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskItem
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onArchive={handleArchiveTask}
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

export default MainFeature;