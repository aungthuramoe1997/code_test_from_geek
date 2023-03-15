import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import TEXT from '../values/Text';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={TEXT.navigation.login}
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={TEXT.navigation.home}
            component={Home}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name={TEXT.navigation.login}
            component={Login}
            options={{cardStyleInterpolator: forFade}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default StackNavigator;
