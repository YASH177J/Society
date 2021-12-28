import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import YourComplaints from '../Screens/YourComplaints';
import AddComplaintsScreen from '../Screens/AddComplaintsScreen';
import ViewComplaints from '../Screens/ViewComplaintScreen';

export const ComplaintStack = createStackNavigator(
  {
    YourComplaints: {
      screen: YourComplaints,
      navigationOptions: { headerShown: false },
    },
     AddComplaintsScreen: {
      screen: AddComplaintsScreen,
      navigationOptions: { headerShown: false },
    },
     ViewComplaintScreen: {
      screen: ViewComplaints,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'YourComplaints',
  }
);
