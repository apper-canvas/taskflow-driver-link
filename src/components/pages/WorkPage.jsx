import React from 'react';
import TaskManagementSection from '@/components/organisms/TaskManagementSection';

const WorkPage = () => {
  return (
    <TaskManagementSection 
      listType="work"
      filterByList="work"
      title="Work Tasks"
      showAddButton={true}
    />
  );
};

export default WorkPage;