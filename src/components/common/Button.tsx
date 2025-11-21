/**
 * Button - Reusable button component
 * 
 * A standardized button component that provides consistent styling,
 * loading states, and accessibility features across the app.
 * 
 * Features:
 * - Multiple variants (primary, secondary, outline)
 * - Loading state with spinner
 * - Disabled state handling
 * - Consistent design system styling
 * - Accessibility features
 * - Custom styling support
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  testID
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button, styles[size] as ViewStyle];
    
    if (variant === 'primary') {
      baseStyle.push(styles.primaryButton);
      if (isDisabled) baseStyle.push(styles.primaryButtonDisabled);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryButton);
      if (isDisabled) baseStyle.push(styles.secondaryButtonDisabled);
    } else if (variant === 'outline') {
      baseStyle.push(styles.outlineButton);
      if (isDisabled) baseStyle.push(styles.outlineButtonDisabled);
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.text, styles[`${size}Text`] as TextStyle];
    
    if (variant === 'primary') {
      baseStyle.push(styles.primaryText);
      if (isDisabled) baseStyle.push(styles.primaryTextDisabled);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryText);
      if (isDisabled) baseStyle.push(styles.secondaryTextDisabled);
    } else if (variant === 'outline') {
      baseStyle.push(styles.outlineText);
      if (isDisabled) baseStyle.push(styles.outlineTextDisabled);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      testID={testID}
    >
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? '#000000' : '#f7c256'}
            style={styles.spinner}
          />
        )}
        <Text style={[...getTextStyle(), textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },

  // Size variants
  small: {
    height: 36,
    paddingHorizontal: 16,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },

  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Primary variant
  primaryButton: {
    backgroundColor: '#f7c256',
  },
  primaryButtonDisabled: {
    backgroundColor: '#d4a847',
  },
  primaryText: {
    color: '#000000',
  },
  primaryTextDisabled: {
    color: '#000000',
  },

  // Secondary variant
  secondaryButton: {
    backgroundColor: '#333333',
  },
  secondaryButtonDisabled: {
    backgroundColor: '#1a1a1a',
  },
  secondaryText: {
    color: '#ffffff',
  },
  secondaryTextDisabled: {
    color: '#666666',
  },

  // Outline variant
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f7c256',
  },
  outlineButtonDisabled: {
    borderColor: '#d4a847',
  },
  outlineText: {
    color: '#f7c256',
  },
  outlineTextDisabled: {
    color: '#d4a847',
  },
});

export default Button;
