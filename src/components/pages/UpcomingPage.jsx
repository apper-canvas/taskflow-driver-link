import React from 'react';
import TaskManagementSection from '@/components/organisms/TaskManagementSection';

const UpcomingPage = () => {
  return (
    <TaskManagementSection 
      listType="upcoming"
      filterByDate="upcoming"
      title="Upcoming Tasks"
      showAddButton={true}
    />
  );
};

export default UpcomingPage;