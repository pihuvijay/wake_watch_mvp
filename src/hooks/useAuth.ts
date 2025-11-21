/**
 * useAuth Hook
 * 
 * Custom React hook for managing authentication state and operations.
 * Provides a clean interface for components to interact with authentication
 * without directly accessing the AuthContext.
 * 
 * Features:
 * - Authentication state management
 * - Login/logout/signup operations
 * - Loading states
 * - Error handling
 * - Type safety
 */

import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

/**
 * Hook to access authentication context
 * Throws error if used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
