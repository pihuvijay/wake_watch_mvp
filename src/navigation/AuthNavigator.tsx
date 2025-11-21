/**
 * AuthNavigator - Authentication flow navigation
 * 
 * Handles navigation within the authentication flow.
 * Includes signup, login, forgot password, and related screens.
 * 
 * Features:
 * - Stack navigation for auth screens
 * - Screen transitions
 * - Header configuration
 * - Back navigation handling
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '@screens/auth/SignupScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';
import ProfileSetupScreen from '@screens/auth/ProfileSetupScreen';
import DashboardScreen from '@screens/main/DashboardScreen';
import TripHistoryScreen from '@screens/main/TripHistoryScreen';
import AnalyticsScreen from '@screens/main/AnalyticsScreen';
import SettingsScreen from '@screens/main/SettingsScreen';
import NotificationsScreen from '@screens/main/NotificationsScreen';
import ActiveDrivingScreen from '@screens/main/ActiveDrivingScreen';

export type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ProfileSetup: undefined;
  Dashboard: undefined;
  TripHistory: undefined;
  Analytics: undefined;
  Settings: undefined;
  Notifications: undefined;
  ActiveDriving: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          title: 'Reset Password',
        }}
      />
      <Stack.Screen 
        name="ProfileSetup" 
        component={ProfileSetupScreen}
        options={{
          title: 'Profile Setup',
        }}
      />
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen 
        name="TripHistory" 
        component={TripHistoryScreen}
        options={{
          title: 'Trip History',
        }}
      />
      <Stack.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          title: 'Analytics',
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen 
        name="ActiveDriving" 
        component={ActiveDrivingScreen}
        options={{
          title: 'Active Driving',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
