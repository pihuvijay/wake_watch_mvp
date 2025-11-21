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

export type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
  ForgotPassword: undefined;
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
    </Stack.Navigator>
  );
};

export default AuthNavigator;
