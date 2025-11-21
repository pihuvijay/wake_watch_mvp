/**
 * MainNavigator - Main app navigation
 * 
 * Handles navigation for the main authenticated app.
 * Includes Dashboard and other main app screens.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '@screens/main/DashboardScreen';

export type MainStackParamList = {
  Dashboard: undefined;
  TripHistory: undefined;
  Analytics: undefined;
  Settings: undefined;
  Profile: undefined;
  ActiveDriving: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      {/* Placeholder screens for other main app features */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
