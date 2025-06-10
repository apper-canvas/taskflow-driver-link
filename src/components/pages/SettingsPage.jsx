import React from 'react';
import HeaderSection from '@/components/molecules/HeaderSection';
import SettingsPreferenceSection from '@/components/organisms/SettingsPreferenceSection';
import DataManagementSection from '@/components/organisms/DataManagementSection';
import AboutSection from '@/components/organisms/AboutSection';

const SettingsPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <HeaderSection
        title="Settings"
        description="Customize your TaskFlow experience"
      />
      
      <SettingsPreferenceSection />

      <DataManagementSection />

      <AboutSection />
    </div>
  );
};

export default SettingsPage;