import React from 'react';
import {View, Text, Image} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';
import TEXT from '../../values/Text';

const Toolbar = ({name = TEXT.toolbarTitle}) => {
  const logo = require('../../assets/images/logo.png');
  return (
    <View
      style={{
        minHeight: 97,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        zIndex: 10,
      }}>
      <Text
        style={{
          color: Colors.primaryColor,
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={logo} />
      </View>
    </View>
  );
};

export default Toolbar;
