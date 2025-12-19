/**
 * CameraButton - Cross-platform camera component
 * Handles camera functionality for both native and web platforms
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Platform,
  Image
} from 'react-native';
import CameraService, { CameraOptions, CameraResult } from '@/services/CameraService';

interface CameraButtonProps {
  onImageSelected?: (result: CameraResult) => void;
  style?: any;
  disabled?: boolean;
  placeholder?: string;
  currentImage?: string;
}

const CameraButton: React.FC<CameraButtonProps> = ({
  onImageSelected,
  style,
  disabled = false,
  placeholder = "📷",
  currentImage
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCameraPress = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      // Check if camera is available
      const isAvailable = await CameraService.isAvailable();
      
      if (!isAvailable) {
        Alert.alert(
          'Camera Not Available',
          'Camera access is not available on this device or browser.'
        );
        return;
      }

      // Request permissions
      const hasPermission = await CameraService.requestPermissions();
      
      if (!hasPermission) {
        Alert.alert(
          'Camera Permission Required',
          'Please allow camera access to take photos.'
        );
        return;
      }

      // Show image picker (camera or library)
      const result = await CameraService.showImagePicker({
        quality: 0.8,
        allowsEditing: true,
        base64: false
      });

      if (result && onImageSelected) {
        onImageSelected(result);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert(
        'Camera Error',
        'Failed to access camera. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={handleCameraPress}
      disabled={disabled || isLoading}
    >
      {currentImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentImage }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>📷</Text>
          </View>
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {isLoading ? '⏳' : placeholder}
          </Text>
          <Text style={styles.placeholderLabel}>
            {isLoading ? 'Loading...' : 'Tap to add photo'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  disabled: {
    opacity: 0.5
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    fontSize: 32,
    marginBottom: 4
  },
  placeholderLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 58
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },
  overlayText: {
    fontSize: 16,
    color: '#fff'
  }
});

export default CameraButton;
