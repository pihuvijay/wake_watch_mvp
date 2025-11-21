/**
 * ProfileSetupScreen - Profile completion screen
 * 
 * This screen appears after successful signup to collect additional user information
 * for personalizing the safety experience. Includes:
 * - Profile photo upload
 * - Driver type selection
 * - Vehicle type selection
 * - Daily driving hours
 * - Typical driving times
 * - Emergency contacts
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '@components/common/Input';
import Button from '@components/common/Button';

interface EmergencyContact {
  name: string;
  phone: string;
}

interface ProfileData {
  driverType: string;
  vehicleType: string;
  drivingHours: number;
  drivingTimes: string[];
  emergencyContacts: EmergencyContact[];
}

interface ProfileSetupScreenProps {
  onComplete?: (profile: ProfileData) => void;
}

const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ onComplete }) => {
  const navigation = useNavigation();
  
  // Form state
  const [driverType, setDriverType] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [drivingHours, setDrivingHours] = useState<number>(4);
  const [drivingTimes, setDrivingTimes] = useState<string[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: '', phone: '' }
  ]);

  // Driver type options
  const driverTypes = [
    { label: 'Personal', value: 'personal' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Fleet', value: 'fleet' }
  ];

  // Vehicle type options
  const vehicleTypes = [
    { label: 'Car', value: 'car' },
    { label: 'Van', value: 'van' },
    { label: 'HGV', value: 'hgv' },
    { label: 'Motorcycle', value: 'motorcycle' }
  ];

  // Driving time options
  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

  /**
   * Toggle driving time selection
   */
  const toggleDrivingTime = (time: string) => {
    setDrivingTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  /**
   * Add new emergency contact
   */
  const addEmergencyContact = () => {
    setEmergencyContacts(prev => [...prev, { name: '', phone: '' }]);
  };

  /**
   * Update emergency contact
   */
  const updateEmergencyContact = (index: number, field: 'name' | 'phone', value: string) => {
    setEmergencyContacts(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    // Basic validation
    if (!driverType || !vehicleType) {
      Alert.alert('Missing Information', 'Please select both driver type and vehicle type.');
      return;
    }

    if (emergencyContacts[0].name === '' || emergencyContacts[0].phone === '') {
      Alert.alert('Missing Information', 'Please provide at least one emergency contact.');
      return;
    }

    const profileData: ProfileData = {
      driverType,
      vehicleType,
      drivingHours,
      drivingTimes,
      emergencyContacts: emergencyContacts.filter(contact => contact.name && contact.phone)
    };

    if (onComplete) {
      onComplete(profileData);
    } else {
      // Navigate to main app dashboard
      console.log('Profile setup completed:', profileData);
      navigation.navigate('Dashboard' as never);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Help us personalize your safety experience</Text>
      </View>

      {/* Profile Photo Section */}
      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>👤</Text>
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.photoText}>Tap to upload photo</Text>
      </View>

      {/* Driver Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Driver Type</Text>
        <View style={styles.optionsGrid}>
          {driverTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.optionButton,
                driverType === type.value && styles.optionButtonSelected
              ]}
              onPress={() => setDriverType(type.value)}
            >
              <Text style={[
                styles.optionText,
                driverType === type.value && styles.optionTextSelected
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vehicle Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Vehicle Type</Text>
        <View style={styles.optionsGrid}>
          {vehicleTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.optionButton,
                vehicleType === type.value && styles.optionButtonSelected
              ]}
              onPress={() => setVehicleType(type.value)}
            >
              <Text style={[
                styles.optionText,
                vehicleType === type.value && styles.optionTextSelected
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Driving Hours Slider */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Average Daily Driving Hours</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderValue}>{drivingHours} hours</Text>
          <View style={styles.sliderButtons}>
            <TouchableOpacity 
              style={styles.sliderButton}
              onPress={() => setDrivingHours(Math.max(1, drivingHours - 1))}
            >
              <Text style={styles.sliderButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sliderButton}
              onPress={() => setDrivingHours(Math.min(12, drivingHours + 1))}
            >
              <Text style={styles.sliderButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>1 hour</Text>
          <Text style={styles.sliderLabel}>12 hours</Text>
        </View>
      </View>

      {/* Driving Times */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Typical Driving Times</Text>
        <View style={styles.timeGrid}>
          {timeOptions.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                drivingTimes.includes(time) && styles.timeButtonSelected
              ]}
              onPress={() => toggleDrivingTime(time)}
            >
              <Text style={[
                styles.timeText,
                drivingTimes.includes(time) && styles.timeTextSelected
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Emergency Contact</Text>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactContainer}>
            <Input
              label="Name"
              placeholder="Enter contact name"
              value={contact.name}
              onChangeText={(value) => updateEmergencyContact(index, 'name', value)}
              containerStyle={styles.contactInput}
            />
            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              value={contact.phone}
              onChangeText={(value) => updateEmergencyContact(index, 'phone', value)}
              keyboardType="phone-pad"
              containerStyle={styles.contactInput}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addContactButton} onPress={addEmergencyContact}>
          <Text style={styles.addContactText}>+ Add Another Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <Button
        title="Complete Setup"
        onPress={handleSubmit}
        style={styles.submitButton}
      />
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1E1E1E',
    borderWidth: 2,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: 48,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f7c256',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 16,
  },
  photoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    minWidth: 100,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#f7c256',
    borderColor: '#f7c256',
  },
  optionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#000000',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f7c256',
  },
  sliderButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  sliderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeButton: {
    flex: 1,
    minWidth: '45%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#f7c256',
    borderColor: '#f7c256',
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeTextSelected: {
    color: '#000000',
  },
  contactContainer: {
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 12,
  },
  contactInput: {
    marginBottom: 12,
  },
  addContactButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  addContactText: {
    fontSize: 14,
    color: '#f7c256',
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default ProfileSetupScreen;
