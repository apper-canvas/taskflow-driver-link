import React from 'react';
import MainFeature from '../components/MainFeature';

const Shopping = () => {
  return (
    <MainFeature 
      listType="shopping"
      filterByList="shopping"
      title="Shopping List"
      showAddButton={true}
    />
  );
};

export default Shopping;