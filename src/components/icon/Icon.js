import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../styles';

export const FontAwesomeIcon = ({
  name,
  size = 24,
  color = Colors.white,
  onPress,
  style,
  solid = false,
}) => {
  return (
    <FontAwesome5
      style={style}
      name={name}
      size={size}
      color={color}
      onPress={onPress}
      solid={solid}
    />
  );
};

export const AntDesignIcon = ({
  name,
  size = 24,
  color = Colors.primaryColor,
  onPress,
  style,
  solid = false,
}) => {
  return (
    <AntDesign
      style={style}
      name={name}
      size={size}
      color={color}
      onPress={onPress}
      solid={solid}
    />
  );
};
