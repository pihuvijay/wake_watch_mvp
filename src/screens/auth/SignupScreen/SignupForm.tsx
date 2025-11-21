/**
 * SignupForm - Reusable signup form component
 * 
 * This component handles the email/password signup form UI and validation.
 * It's separated from the main screen to maintain clean separation of concerns
 * and enable easy testing and reusability.
 * 
 * Features:
 * - Email input with validation
 * - Password input with strength indicator
 * - Confirm password field
 * - Real-time validation feedback
 * - Loading states during submission
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import PasswordStrengthIndicator from '@components/auth/PasswordStrengthIndicator';

interface SignupFormData {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  formData: SignupFormData;
  errors: Partial<SignupFormData>;
  loading: boolean;
  onUpdateField: (field: keyof SignupFormData, value: string) => void;
  onSubmit: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  errors,
  loading,
  onUpdateField,
  onSubmit
}) => {
  return (
    <View style={styles.container}>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => onUpdateField('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.email}
          testID="signup-email-input"
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Input
          label="Phone Number"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChangeText={(value) => onUpdateField('phoneNumber', value)}
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.phoneNumber}
          testID="signup-phone-input"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Input
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChangeText={(value) => onUpdateField('password', value)}
          secureTextEntry
          error={errors.password}
          testID="signup-password-input"
        />
        
        {/* Password Strength Indicator */}
        {formData.password.length > 0 && (
          <PasswordStrengthIndicator password={formData.password} />
        )}
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChangeText={(value) => onUpdateField('confirmPassword', value)}
          secureTextEntry
          error={errors.confirmPassword}
          testID="signup-confirm-password-input"
        />
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By creating an account, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Submit Button */}
      <Button
        title="Create Account"
        onPress={onSubmit}
        loading={loading}
        disabled={loading || !formData.email || !formData.password || !formData.confirmPassword}
        style={styles.submitButton}
        testID="signup-submit-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  termsContainer: {
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  submitButton: {
    marginTop: 8,
  },
});

export default SignupForm;
