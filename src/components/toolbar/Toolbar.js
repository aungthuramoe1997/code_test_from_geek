import React from 'react';
import {View, Text} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';
import TEXT from '../../values/Text';

const Toolbar = ({name = TEXT.toolbarTitle}) => {
  return (
    <View
      style={{
        minHeight: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
      }}>
      <Text
        style={{
          color: Colors.black,
          marginStart: Spacing.spacing16,
          fontSize: Typography.text18,
          fontWeight: '900',
        }}>
        {name}
      </Text>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: Colors.white,
          borderRadius: 25,
          position: 'absolute',
          bottom: -20,
        }}></View>
    </View>
  );
};

export default Toolbar;
