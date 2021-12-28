import * as React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {HomeStack} from './HomeStack';
import {ComplaintStack} from './ComplaintStack';
import Settings from '../Screens/Settings';
import Complaint from '../Screens/AddComplaintsScreen'
import ViewComplaints from '../Screens/YourComplaints'
import HelperScreen from '../Screens/HelperScreen'
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';



export const AppTabNavigator = createBottomTabNavigator({

  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Ionicons name="home" size={30} color={tintColor}></Ionicons>
        </View>
      ),
      tabBarOptions: { activeTintColor: 'green', inactiveTintColor: 'gray' },
      tabBarLabel: 'Dashboard',
    },
  },
    Complaint: {
    screen: ComplaintStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Ionicons name="help-circle" size={30} color={tintColor}></Ionicons>
        </View>
      ),
      tabBarOptions: { activeTintColor: 'green', inactiveTintColor: 'gray' },
      tabBarLabel: 'Complaints',
    },
  },
    Helpers: {
    screen: HelperScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Ionicons name="people" size={30} color={tintColor}></Ionicons>
        </View>
      ),
      tabBarOptions: { activeTintColor: 'green', inactiveTintColor: 'gray' },
      tabBarLabel: 'Helpers',
    },
  },
    

  Profile: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Feather name="user" size={30} color={tintColor}/>
        </View>
      ),
      tabBarOptions: { activeTintColor: 'green', inactiveTintColor: 'gray' },
      tabBarLabel: 'Settings',
    },
  },
  

});
