import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../Screens/HomeScreen';

export const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);
