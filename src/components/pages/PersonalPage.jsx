import React from 'react';
import TaskManagementSection from '@/components/organisms/TaskManagementSection';

const PersonalPage = () => {
  return (
    <TaskManagementSection 
      listType="personal"
      filterByList="personal"
      title="Personal Tasks"
      showAddButton={true}
    />
  );
};

export default PersonalPage;