import React from 'react';
import {Text, StyleSheet} from 'react-native';

const DefaultText = ({children, style}) => {
  return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'PlutoSansW04Bold',
  },
});

export default DefaultText;
