import React from 'react';
import MainFeature from '../components/MainFeature';

const Today = () => {
  return (
    <MainFeature 
      listType="today"
      filterByDate="today"
      title="Today's Tasks"
      showAddButton={true}
    />
  );
};

export default Today;