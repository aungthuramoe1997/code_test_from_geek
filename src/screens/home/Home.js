import React from 'react';
import {Text} from 'react-native';
import ScreenContainer from '../../components/container/ScreenContainer';
import Toolbar from '../../components/toolbar/Toolbar';

const Home = () => {
  return (
    <ScreenContainer>
      <Toolbar />
    </ScreenContainer>
  );
};

export default React.memo(Home);
