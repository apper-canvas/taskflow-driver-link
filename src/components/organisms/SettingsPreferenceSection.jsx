import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FormField from '@/components/molecules/FormField';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import Select from '@/components/atoms/Select';

const SettingsPreferenceSection = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false, // This isn't implemented functionality-wise, but keep the setting
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
    <>
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
                      <ToggleSwitch
                        checked={settings[setting.key]}
                        onChange={() => handleSettingChange(setting.key, !settings[setting.key])}
                      />
                    ) : setting.type === 'select' ? (
                      <Select
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        options={setting.options}
                        className="text-sm"
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default SettingsPreferenceSection;