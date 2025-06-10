import React from 'react';
import MainFeature from '../components/MainFeature';

const Upcoming = () => {
  return (
    <MainFeature 
      listType="upcoming"
      filterByDate="upcoming"
      title="Upcoming Tasks"
      showAddButton={true}
    />
  );
};

export default Upcoming;