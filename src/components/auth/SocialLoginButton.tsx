/**
 * SocialLoginButton - Social authentication button component
 * 
 * Provides styled buttons for social login providers (Google, Apple).
 * Each button includes the appropriate branding, colors, and icons
 * according to the provider's brand guidelines.
 * 
 * Features:
 * - Provider-specific styling and branding
 * - Loading states
 * - Consistent sizing and spacing
 * - Accessibility features
 * - Icon integration (placeholder for now)
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: object;
  testID?: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  loading = false,
  disabled = false,
  style,
  testID
}) => {
  const isDisabled = disabled || loading;

  const getButtonConfig = () => {
    switch (provider) {
      case 'google':
        return {
          title: 'Continue with Google',
          backgroundColor: '#ffffff',
          textColor: '#1a1a1a',
          borderColor: '#e0e0e0',
          icon: 'G', // Placeholder - would use actual Google icon
        };
      case 'apple':
        return {
          title: 'Continue with Apple',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          borderColor: '#000000',
          icon: '', // Placeholder - would use actual Apple icon
        };
      default:
        return {
          title: 'Continue',
          backgroundColor: '#ffffff',
          textColor: '#1a1a1a',
          borderColor: '#e0e0e0',
          icon: '?',
        };
    }
  };

  const config = getButtonConfig();

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: config.backgroundColor,
      borderColor: config.borderColor,
    },
    isDisabled && styles.buttonDisabled,
    style
  ];

  const textStyle = [
    styles.text,
    { color: config.textColor },
    isDisabled && styles.textDisabled
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      testID={testID}
    >
      <View style={styles.content}>
        {/* Icon placeholder - would use actual provider icons */}
        <View style={[styles.iconContainer, { backgroundColor: config.textColor }]}>
          <Text style={[styles.icon, { color: config.backgroundColor }]}>
            {config.icon}
          </Text>
        </View>

        {/* Button Text */}
        <Text style={textStyle}>
          {config.title}
        </Text>

        {/* Loading Spinner */}
        {loading && (
          <ActivityIndicator
            size="small"
            color={config.textColor}
            style={styles.spinner}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  textDisabled: {
    opacity: 0.6,
  },
  spinner: {
    marginLeft: 8,
  },
});

export default SocialLoginButton;
