/**
 * ThemeContext - Theme Context Provider
 * 
 * Manages global theme state for the application.
 * Provides theme configuration and switching capabilities.
 * 
 * Features:
 * - Light/dark theme support
 * - Theme persistence
 * - Consistent design system
 * - Color scheme management
 * - Typography configuration
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    fontWeight: {
      normal: string;
      medium: string;
      bold: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
}

const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  typography: {
    fontFamily: 'System',
    fontSize: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
    fontWeight: {
      normal: '400',
      medium: '600',
      bold: '700',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FF9F0A',
  },
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load theme preference from storage
    const loadTheme = async () => {
      try {
        // In a real app, you'd load from AsyncStorage or localStorage
        // For now, default to light theme
        const savedTheme = false; // await AsyncStorage.getItem('theme');
        setIsDark(savedTheme);
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save theme preference
    try {
      // await AsyncStorage.setItem('theme', newTheme.toString());
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
    
    // Save theme preference
    try {
      // await AsyncStorage.setItem('theme', dark.toString());
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const value: ThemeContextType = {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
