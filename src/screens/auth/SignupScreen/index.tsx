/**
 * SignupScreen - Main signup page component
 * 
 * This is the primary signup screen that users see when creating a new account.
 * Based on the Figma wireframe, it includes:
 * - Email and password input fields
 * - Social login options (Google, Apple)
 * - Form validation and error handling
 * - Navigation to login screen
 * 
 * Architecture: This screen acts as a container component that orchestrates
 * the signup flow by combining form components, validation, and authentication services.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignupForm from './SignupForm';
import SocialLogin from './SocialLogin';
import { useAuth } from '@hooks/useAuth';
import { validateEmail, validatePassword, validatePhoneNumber } from '@utils/validation/authValidation';

interface SignupFormData {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  /**
   * Validates the entire signup form
   * Returns true if all fields are valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    const phoneValidation = validatePhoneNumber(formData.phoneNumber);
    if (!phoneValidation.isValid) {
      newErrors.phoneNumber = phoneValidation.message;
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission for email/password signup
   */
  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await signUp(formData.email, formData.password);
      // Navigation will be handled by AuthContext based on auth state
    } catch (error) {
      Alert.alert('Signup Error', error instanceof Error ? error.message : 'An error occurred during signup');
    }
  };

  /**
   * Handles social login (Google, Apple)
   */
  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      // Social login logic will be implemented in useAuth hook
      console.log(`Social login with ${provider}`);
    } catch (error) {
      Alert.alert('Login Error', `Failed to login with ${provider}`);
    }
  };

  /**
   * Updates form data and clears related errors
   */
  const updateFormData = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* App Branding/Header */}
      <View style={styles.header}>
        <Image 
          source={require('@assets/icons/app-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>WakeWatch</Text>
        <Text style={styles.subtitle}>Start your wellness journey</Text>
      </View>

      {/* Main Signup Form */}
      <SignupForm
        formData={formData}
        errors={errors}
        loading={loading}
        onUpdateField={updateFormData}
        onSubmit={handleSignup}
      />

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Login Options */}
      <SocialLogin onSocialLogin={handleSocialLogin} />

      {/* Navigation to Login */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text 
            style={styles.linkText}
            onPress={() => navigation.navigate('Login' as never)}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#cccccc',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#cccccc',
  },
  linkText: {
    color: '#f7c256',
    fontWeight: '600',
  },
});

export default SignupScreen;
