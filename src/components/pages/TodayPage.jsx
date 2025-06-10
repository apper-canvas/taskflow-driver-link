import React from 'react';
import TaskManagementSection from '@/components/organisms/TaskManagementSection';

const TodayPage = () => {
  return (
    <TaskManagementSection 
      listType="today"
      filterByDate="today"
      title="Today's Tasks"
      showAddButton={true}
    />
  );
};

export default TodayPage;