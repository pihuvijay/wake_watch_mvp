/**
 * SocialLogin - Social authentication component
 * 
 * Provides social login options (Google, Facebook) for user authentication.
 * This component is designed to be reusable across different auth screens
 * (signup, login, etc.)
 * 
 * Features:
 * - Google OAuth integration
 * - Facebook OAuth integration
 * - Consistent styling with app design system
 * - Loading states for each provider
 * - Error handling for failed authentications
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SocialLoginButton from '@components/auth/SocialLoginButton';

interface SocialLoginProps {
  onSocialLogin: (provider: 'google' | 'facebook') => Promise<void>;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onSocialLogin }) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  /**
   * Handles social login with loading state management
   */
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setLoadingProvider(provider);
    
    try {
      await onSocialLogin(provider);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Google Login Button */}
      <SocialLoginButton
        provider="google"
        onPress={() => handleSocialLogin('google')}
        loading={loadingProvider === 'google'}
        disabled={loadingProvider !== null}
        style={styles.socialButton}
        testID="google-login-button"
      />

      {/* Facebook Login Button */}
      <SocialLoginButton
        provider="facebook"
        onPress={() => handleSocialLogin('facebook')}
        loading={loadingProvider === 'facebook'}
        disabled={loadingProvider !== null}
        style={styles.socialButton}
        testID="facebook-login-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  socialButton: {
    marginBottom: 12,
  },
});

export default SocialLogin;
