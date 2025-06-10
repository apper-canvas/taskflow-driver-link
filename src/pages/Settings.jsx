import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { taskService } from '../services';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoArchive: true,
    defaultPriority: 'medium',
    defaultList: 'personal'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Setting updated!');
  };

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

  const settingSections = [
    {
      title: 'Preferences',
      settings: [
        {
          key: 'notifications',
          label: 'Enable Notifications',
          description: 'Get notified about due dates and reminders',
          type: 'toggle'
        },
        {
          key: 'autoArchive',
          label: 'Auto Archive Completed Tasks',
          description: 'Automatically archive tasks after 7 days of completion',
          type: 'toggle'
        },
        {
          key: 'defaultPriority',
          label: 'Default Priority',
          description: 'Default priority level for new tasks',
          type: 'select',
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' }
          ]
        },
        {
          key: 'defaultList',
          label: 'Default List',
          description: 'Default list for new tasks',
          type: 'select',
          options: [
            { value: 'personal', label: 'Personal' },
            { value: 'work', label: 'Work' },
            { value: 'shopping', label: 'Shopping' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Customize your TaskFlow experience</p>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h2>
            
            <div className="space-y-6">
              {section.settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{setting.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                  </div>
                  
                  <div className="ml-4">
                    {setting.type === 'toggle' ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSettingChange(setting.key, !settings[setting.key])}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          settings[setting.key] ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <motion.span
                          animate={{ x: settings[setting.key] ? 20 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        />
                      </motion.button>
                    ) : setting.type === 'select' ? (
                      <select
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                      >
                        {setting.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Data Management */}
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportData}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors duration-200"
              >
                <ApperIcon name="Download" className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Clear All Data</h3>
                  <p className="text-sm text-gray-500 mt-1">Permanently delete all tasks and lists</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearData}
                  className="flex items-center space-x-2 bg-error text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                  <span>Clear Data</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About TaskFlow</h2>
          
          <div className="space-y-3 text-sm text-gray-600">
            <p>TaskFlow is a streamlined task management application designed to help you stay organized and productive.</p>
            <p>Version 1.0.0</p>
            <p>Built with React, Tailwind CSS, and Framer Motion</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;