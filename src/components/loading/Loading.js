import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../styles';

const Loading = ({color = Colors.primaryColor, size = 'large'}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={size} color={color} animating={true} />
    </View>
  );
};

export default React.memo(Loading);
