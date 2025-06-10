import React from 'react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  return (
    <MainFeature 
      listType="all"
      title="All Tasks"
      showAddButton={true}
    />
  );
};

export default Home;