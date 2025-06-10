import React from 'react';
import MainFeature from '../components/MainFeature';

const Personal = () => {
  return (
    <MainFeature 
      listType="personal"
      filterByList="personal"
      title="Personal Tasks"
      showAddButton={true}
    />
  );
};

export default Personal;