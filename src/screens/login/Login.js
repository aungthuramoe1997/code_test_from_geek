import React from 'react';
import {Pressable, View} from 'react-native';
import {DefaultText} from '../../components/text';
import TEXT from '../../values/Text';

const Login = ({navigation}) => {
  const onLogin = () => {
    console.log('on login');
    navigation.navigate(TEXT.navigation.home);
  };
  return (
    <View>
      <Pressable
        style={{width: 100, height: 40, backgroundColor: 'red'}}
        onPress={onLogin}>
        <DefaultText>Login</DefaultText>
      </Pressable>
    </View>
  );
};

export default React.memo(Login);
