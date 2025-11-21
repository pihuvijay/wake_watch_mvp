/**
 * PasswordStrengthIndicator - Password strength visualization component
 * 
 * Provides visual feedback on password strength to help users create
 * secure passwords. Shows strength level and specific requirements.
 * 
 * Features:
 * - Visual strength meter (weak, fair, good, strong)
 * - Color-coded feedback
 * - Specific requirement checklist
 * - Real-time validation as user types
 * - Accessibility features
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  /**
   * Calculates password strength and requirements
   */
  const getPasswordAnalysis = () => {
    const requirements: PasswordRequirement[] = [
      {
        label: 'At least 8 characters',
        met: password.length >= 8
      },
      {
        label: 'Contains uppercase letter',
        met: /[A-Z]/.test(password)
      },
      {
        label: 'Contains lowercase letter',
        met: /[a-z]/.test(password)
      },
      {
        label: 'Contains number',
        met: /\d/.test(password)
      },
      {
        label: 'Contains special character',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }
    ];

    const metRequirements = requirements.filter(req => req.met).length;
    
    let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
    let color = '#FF3B30';
    
    if (metRequirements >= 5) {
      strength = 'strong';
      color = '#34C759';
    } else if (metRequirements >= 4) {
      strength = 'good';
      color = '#32D74B';
    } else if (metRequirements >= 2) {
      strength = 'fair';
      color = '#FF9500';
    }

    return {
      requirements,
      strength,
      color,
      metRequirements,
      totalRequirements: requirements.length
    };
  };

  const analysis = getPasswordAnalysis();

  if (password.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Strength Meter */}
      <View style={styles.strengthMeter}>
        <View style={styles.strengthBarContainer}>
          {[1, 2, 3, 4].map((level) => (
            <View
              key={level}
              style={[
                styles.strengthBar,
                {
                  backgroundColor: level <= analysis.metRequirements 
                    ? analysis.color 
                    : '#e0e0e0'
                }
              ]}
            />
          ))}
        </View>
        <Text style={[styles.strengthText, { color: analysis.color }]}>
          {analysis.strength.charAt(0).toUpperCase() + analysis.strength.slice(1)}
        </Text>
      </View>

      {/* Requirements Checklist */}
      <View style={styles.requirementsList}>
        {analysis.requirements.map((requirement, index) => (
          <View key={index} style={styles.requirementItem}>
            <View style={[
              styles.requirementIndicator,
              { backgroundColor: requirement.met ? '#34C759' : '#e0e0e0' }
            ]}>
              <Text style={[
                styles.requirementIcon,
                { color: requirement.met ? '#ffffff' : '#999999' }
              ]}>
                {requirement.met ? '✓' : '○'}
              </Text>
            </View>
            <Text style={[
              styles.requirementText,
              { color: requirement.met ? '#34C759' : '#666666' }
            ]}>
              {requirement.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  strengthMeter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  strengthBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 4,
    marginRight: 12,
    gap: 2,
  },
  strengthBar: {
    flex: 1,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'right',
  },
  requirementsList: {
    gap: 6,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  requirementIcon: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  requirementText: {
    fontSize: 12,
    flex: 1,
  },
});

export default PasswordStrengthIndicator;
