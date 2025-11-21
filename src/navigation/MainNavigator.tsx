/**
 * MainNavigator - Main app navigation (placeholder)
 * 
 * This will handle navigation for the main authenticated app.
 * Will be implemented in future phases.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainNavigator: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main App</Text>
      <Text style={styles.subtitle}>Dashboard coming in Phase 2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});

export default MainNavigator;
