import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScreenContainer = ({children}) => {
  return <SafeAreaView style={{flex:1}}>{children}</SafeAreaView>;
};

export default React.memo(ScreenContainer);
