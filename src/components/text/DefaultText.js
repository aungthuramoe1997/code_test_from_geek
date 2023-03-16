import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../../styles';

const DefaultText = ({children, style}) => {
  return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: Colors.primaryColor,
  },
});

export default DefaultText;
