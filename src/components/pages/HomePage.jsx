import React from 'react';
import TaskManagementSection from '@/components/organisms/TaskManagementSection';

const HomePage = () => {
  return (
    <TaskManagementSection 
      listType="all"
      title="All Tasks"
      showAddButton={true}
    />
  );
};

export default HomePage;