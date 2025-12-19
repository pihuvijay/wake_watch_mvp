/**
 * Main App Component
 * Entry point for the WakeWatch cross-platform application
 * Handles navigation, authentication state, and global providers
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider } from '@contexts/ThemeContext';
import AppNavigator from '@/navigation/AppNavigator';
import { Platform } from 'react-native';

// Import CSS for web platform to fix PWA scrolling
if (Platform.OS === 'web') {
  require('./web-styles.css');
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
