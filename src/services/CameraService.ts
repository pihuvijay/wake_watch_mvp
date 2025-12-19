/**
 * Camera Service - Web API implementation
 * Provides camera functionality for PWA using getUserMedia()
 */

import { Platform } from 'react-native';

export interface CameraOptions {
  quality?: number;
  allowsEditing?: boolean;
  aspect?: [number, number];
  base64?: boolean;
}

export interface CameraResult {
  uri: string;
  base64?: string;
  width?: number;
  height?: number;
}

class CameraService {
  private stream: MediaStream | null = null;

  /**
   * Check if camera is available
   */
  async isAvailable(): Promise<boolean> {
    if (Platform.OS !== 'web') return false;
    
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some(device => device.kind === 'videoinput');
    } catch (error) {
      console.warn('Camera availability check failed:', error);
      return false;
    }
  }

  /**
   * Request camera permissions
   */
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS !== 'web') return false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      // Stop the stream immediately after permission check
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.warn('Camera permission denied:', error);
      return false;
    }
  }

  /**
   * Take a photo using web camera
   */
  async takePhoto(options: CameraOptions = {}): Promise<CameraResult | null> {
    if (Platform.OS !== 'web') {
      throw new Error('Web camera API only available on web platform');
    }

    try {
      // Request camera access
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      // Create video element to capture frame
      const video = document.createElement('video');
      video.srcObject = this.stream;
      video.autoplay = true;
      video.playsInline = true;

      // Wait for video to be ready
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      // Create canvas to capture image
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Canvas context not available');
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0);

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/jpeg', options.quality || 0.8);
      
      // Stop camera stream
      this.stopCamera();

      const result: CameraResult = {
        uri: dataUrl,
        width: canvas.width,
        height: canvas.height
      };

      if (options.base64) {
        result.base64 = dataUrl.split(',')[1];
      }

      return result;
    } catch (error) {
      console.error('Camera capture failed:', error);
      this.stopCamera();
      return null;
    }
  }

  /**
   * Launch camera picker (web implementation)
   */
  async launchCamera(options: CameraOptions = {}): Promise<CameraResult | null> {
    return this.takePhoto(options);
  }

  /**
   * Launch image library picker (web implementation)
   */
  async launchImageLibrary(options: CameraOptions = {}): Promise<CameraResult | null> {
    if (Platform.OS !== 'web') {
      throw new Error('Web image picker only available on web platform');
    }

    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          const result: CameraResult = {
            uri: dataUrl
          };

          if (options.base64) {
            result.base64 = dataUrl.split(',')[1];
          }

          resolve(result);
        };
        reader.readAsDataURL(file);
      };

      input.click();
    });
  }

  /**
   * Stop camera stream
   */
  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  /**
   * Show action sheet for camera/library selection
   */
  async showImagePicker(options: CameraOptions = {}): Promise<CameraResult | null> {
    if (Platform.OS !== 'web') {
      throw new Error('Web image picker only available on web platform');
    }

    // For web, show a simple choice
    const useCamera = window.confirm('Take a photo with camera? (Cancel to choose from files)');
    
    if (useCamera) {
      return this.launchCamera(options);
    } else {
      return this.launchImageLibrary(options);
    }
  }
}

export default new CameraService();
