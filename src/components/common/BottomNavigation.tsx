/**
 * BottomNavigation - Fixed bottom navigation component
 * Ensures navigation stays visible at bottom of screen in PWA
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  active?: boolean;
}

interface BottomNavigationProps {
  items: NavItem[];
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.navItem, item.active && styles.activeNavItem]}
          onPress={item.onPress}
        >
          {item.icon}
          <Text style={[styles.navText, item.active && styles.activeNavText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: Platform.OS === 'web' ? 'fixed' as any : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    zIndex: 1000,
    ...(Platform.OS === 'web' && {
      position: 'fixed',
      zIndex: 1000
    })
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    color: '#6B7280',
    fontSize: 12,
  },
  activeNavText: {
    color: '#f7c256',
  }
});

export default BottomNavigation;
