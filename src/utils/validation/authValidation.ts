/**
 * Authentication Validation Utilities
 * 
 * Provides validation functions for authentication-related forms.
 * Includes email validation, password strength checking, and other
 * auth-specific validation logic.
 * 
 * Features:
 * - Email format validation
 * - Password strength validation
 * - Consistent validation rules across the app
 * - Detailed error messages
 * - TypeScript support for validation results
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validates email address format
 * Uses RFC 5322 compliant regex pattern
 */
export const validateEmail = (email: string): boolean => {
  if (!email || email.trim().length === 0) {
    return false;
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(email.trim());
};

/**
 * Validates password strength and returns detailed feedback
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.length === 0) {
    return {
      isValid: false,
      message: 'Password is required'
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: 'Password must be less than 128 characters'
    };
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const requirements = [hasUppercase, hasLowercase, hasNumber, hasSpecialChar];
  const metRequirements = requirements.filter(Boolean).length;

  if (metRequirements < 3) {
    return {
      isValid: false,
      message: 'Password must contain at least 3 of: uppercase, lowercase, number, special character'
    };
  }

  // Check for common weak patterns
  const commonPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /abc123/i,
    /admin/i,
    /letmein/i
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      return {
        isValid: false,
        message: 'Password contains common patterns and is not secure'
      };
    }
  }

  return {
    isValid: true,
    message: 'Password is strong'
  };
};

/**
 * Validates that two passwords match
 */
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword || confirmPassword.length === 0) {
    return {
      isValid: false,
      message: 'Please confirm your password'
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: 'Passwords do not match'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates a full name field
 */
export const validateFullName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      message: 'Name is required'
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      message: 'Name must be at least 2 characters long'
    };
  }

  if (name.trim().length > 50) {
    return {
      isValid: false,
      message: 'Name must be less than 50 characters'
    };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name.trim())) {
    return {
      isValid: false,
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates phone number format (basic validation)
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone || phone.trim().length === 0) {
    return {
      isValid: false,
      message: 'Phone number is required'
    };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');

  if (digitsOnly.length < 10) {
    return {
      isValid: false,
      message: 'Phone number must be at least 10 digits'
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      message: 'Phone number must be less than 15 digits'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates terms of service acceptance
 */
export const validateTermsAcceptance = (accepted: boolean): ValidationResult => {
  if (!accepted) {
    return {
      isValid: false,
      message: 'You must accept the Terms of Service to continue'
    };
  }

  return {
    isValid: true
  };
};
