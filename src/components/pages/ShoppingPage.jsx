import React from 'react';
import TaskManagementSection from '@/components/organisms/TaskManagementSection';

const ShoppingPage = () => {
  return (
    <TaskManagementSection 
      listType="shopping"
      filterByList="shopping"
      title="Shopping List"
      showAddButton={true}
    />
  );
};

export default ShoppingPage;