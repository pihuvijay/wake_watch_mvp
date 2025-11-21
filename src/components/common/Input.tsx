/**
 * Input - Reusable input component
 * 
 * A standardized input component that provides consistent styling,
 * validation feedback, and accessibility features across the app.
 * 
 * Features:
 * - Consistent design system styling
 * - Error state handling and display
 * - Label and placeholder support
 * - Accessibility features (labels, hints)
 * - Support for different keyboard types
 * - Secure text entry for passwords
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: object;
  inputStyle?: object;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      {/* Input Field */}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          inputStyle
        ]}
        placeholderTextColor="#666666"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />

      {/* Error Message */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Hint Text */}
      {hint && !error && (
        <Text style={styles.hintText}>{hint}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
  },
  inputFocused: {
    borderColor: '#f7c256',
    borderWidth: 2,
  },
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 4,
  },
  hintText: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
