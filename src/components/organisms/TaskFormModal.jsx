import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const TaskFormModal = ({ task, onSubmit, onCancel, defaultListId = 'personal' }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    dueDate: '',
    listId: defaultListId
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        listId: task.listId || defaultListId
      });
    }
  }, [task, defaultListId]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const submitData = {
      ...formData,
      title: formData.title.trim(),
      dueDate: formData.dueDate || null
    };
    
    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const lists = [
    { id: 'personal', label: 'Personal', icon: 'User' },
    { id: 'work', label: 'Work', icon: 'Briefcase' },
    { id: 'shopping', label: 'ShoppingCart' }
  ];

  const priorities = [
    { id: 'low', label: 'Low', color: 'bg-success' },
    { id: 'medium', label: 'Medium', color: 'bg-accent' },
    { id: 'high', label: 'High', color: 'bg-error' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onCancel}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {task ? 'Edit Task' : 'Add New Task'}
              </h2>
              <Button
                onClick={onCancel}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <FormField label="Task Title" id="title" error={errors.title}>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title..."
                autoFocus
              />
            </FormField>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {priorities.map((priority) => (
                  <Button
                    key={priority.id}
                    type="button"
                    onClick={() => handleChange('priority', priority.id)}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                      formData.priority === priority.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
                  >
                    <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                    <span className="text-sm">{priority.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <FormField label="Due Date (Optional)" id="dueDate">
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </FormField>

            {/* List */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List
              </label>
              <div className="space-y-2">
                {lists.map((list) => (
                  <Button
                    key={list.id}
                    type="button"
                    onClick={() => handleChange('listId', list.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg border transition-all ${
                      formData.listId === list.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    motionProps={{ whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 } }}
                  >
                    <ApperIcon name={list.icon} className="w-4 h-4" />
                    <span className="text-sm">{list.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
              >
                {task ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskFormModal;