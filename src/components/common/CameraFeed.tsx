/**
 * CameraFeed - Real-time camera feed component for Active Driving
 * Provides live camera stream for drowsiness detection
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';

interface CameraFeedProps {
  style?: any;
  onCameraReady?: (stream: MediaStream) => void;
  onError?: (error: Error) => void;
  facingMode?: 'user' | 'environment';
}

const CameraFeed: React.FC<CameraFeedProps> = ({
  style,
  onCameraReady,
  onError,
  facingMode = 'user'
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setError('Camera feed only available on web platform');
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });

      streamRef.current = stream;

      // Create video element if it doesn't exist
      if (!videoRef.current) {
        const video = document.createElement('video');
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.transform = facingMode === 'user' ? 'scaleX(-1)' : 'none';
        videoRef.current = video;
      }

      // Set video source
      videoRef.current.srcObject = stream;

      // Wait for video to be ready
      videoRef.current.onloadedmetadata = () => {
        setIsLoading(false);
        if (onCameraReady) {
          onCameraReady(stream);
        }
      };

      videoRef.current.onerror = (err) => {
        const errorMsg = 'Failed to load camera feed';
        setError(errorMsg);
        if (onError) {
          onError(new Error(errorMsg));
        }
      };

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Camera access denied';
      setError(errorMsg);
      setIsLoading(false);
      if (onError) {
        onError(new Error(errorMsg));
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // For React Native Web, we need to render the video element
  useEffect(() => {
    if (Platform.OS === 'web' && videoRef.current) {
      const container = document.getElementById('camera-feed-container');
      if (container && !container.contains(videoRef.current)) {
        container.appendChild(videoRef.current);
      }
    }
  }, [videoRef.current]);

  if (Platform.OS !== 'web') {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📷</Text>
          <Text style={styles.placeholderLabel}>Camera feed not available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <div 
        id="camera-feed-container" 
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLoading && (
          <div style={{ 
            position: 'absolute', 
            zIndex: 10, 
            color: 'white', 
            fontSize: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
            <div>Starting camera...</div>
          </div>
        )}
        {error && (
          <div style={{ 
            position: 'absolute', 
            zIndex: 10, 
            color: 'white', 
            fontSize: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>❌</div>
            <div>{error}</div>
          </div>
        )}
      </div>
      
      {/* Face detection overlay */}
      <View style={styles.overlay}>
        <View style={styles.faceOval} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative'
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a'
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 16
  },
  placeholderLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none'
  },
  faceOval: {
    width: 192,
    height: 256,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 128,
    borderStyle: 'dashed'
  }
});

export default CameraFeed;
