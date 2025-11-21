/**
 * AppNavigator - Main navigation component
 * 
 * Handles the main navigation structure for the application.
 * Switches between authenticated and unauthenticated flows
 * based on user authentication state.
 * 
 * Features:
 * - Authentication-based navigation
 * - Stack navigation setup
 * - Screen configuration
 * - Loading states
 * - Deep linking support
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import LoadingScreen from '@screens/common/LoadingScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      {user ? (
        // User is authenticated - show main app
        <Stack.Screen 
          name="Main" 
          component={MainNavigator}
          options={{
            animationTypeForReplace: 'push',
          }}
        />
      ) : (
        // User is not authenticated - show auth flow
        <Stack.Screen 
          name="Auth" 
          component={AuthNavigator}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
