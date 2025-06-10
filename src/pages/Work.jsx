import React from 'react';
import MainFeature from '../components/MainFeature';

const Work = () => {
  return (
    <MainFeature 
      listType="work"
      filterByList="work"
      title="Work Tasks"
      showAddButton={true}
    />
  );
};

export default Work;