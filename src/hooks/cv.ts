import { useState, useEffect, useRef } from 'react';

// Types
interface BlinkDetectionResult {
  isBlinkingTooMuch: boolean;
  blinkRate: number; // blinks per minute
  eyeAspectRatio: number;
  alertLevel: 'normal' | 'warning' | 'critical';
}

interface CVConfig {
  blinkThreshold: number; // blinks per minute threshold
  earThreshold: number; // eye aspect ratio threshold for closed eyes
  alertAfterSeconds: number; // seconds of excessive blinking before alert
}

// Default configuration
const DEFAULT_CONFIG: CVConfig = {
  blinkThreshold: 30, // More than 30 blinks per minute = excessive
  earThreshold: 0.25, // Below 0.25 = eyes closed
  alertAfterSeconds: 10, // Alert after 10 seconds of excessive blinking
};

/**
 * Computer Vision Hook for Blink Detection
 * Detects excessive blinking patterns that indicate drowsiness
 */
export const useBlinkDetection = (config: Partial<CVConfig> = {}): BlinkDetectionResult => {
  const fullConfig = { ...DEFAULT_CONFIG, ...config };
  
  // State
  const [blinkRate, setBlinkRate] = useState(0);
  const [eyeAspectRatio, setEyeAspectRatio] = useState(0.3);
  const [alertLevel, setAlertLevel] = useState<'normal' | 'warning' | 'critical'>('normal');
  
  // Refs for tracking
  const blinkHistory = useRef<number[]>([]);
  const lastBlinkTime = useRef<number>(0);
  const excessiveBlinkingStart = useRef<number | null>(null);

  // Simulate computer vision processing (replace with real MediaPipe later)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate eye aspect ratio (0.1 = closed, 0.4 = open)
      const simulatedEAR = 0.15 + Math.random() * 0.25;
      setEyeAspectRatio(simulatedEAR);
      
      // Detect blink (when EAR drops below threshold)
      const currentTime = Date.now();
      const isBlink = simulatedEAR < fullConfig.earThreshold;
      
      if (isBlink && currentTime - lastBlinkTime.current > 200) {
        // Record blink (minimum 200ms between blinks to avoid double counting)
        blinkHistory.current.push(currentTime);
        lastBlinkTime.current = currentTime;
        
        // Keep only last minute of blinks
        const oneMinuteAgo = currentTime - 60000;
        blinkHistory.current = blinkHistory.current.filter(time => time > oneMinuteAgo);
        
        // Calculate blinks per minute
        const currentBlinkRate = blinkHistory.current.length;
        setBlinkRate(currentBlinkRate);
        
        // Check for excessive blinking
        if (currentBlinkRate > fullConfig.blinkThreshold) {
          if (!excessiveBlinkingStart.current) {
            excessiveBlinkingStart.current = currentTime;
          }
          
          const excessiveDuration = (currentTime - excessiveBlinkingStart.current) / 1000;
          
          if (excessiveDuration > fullConfig.alertAfterSeconds) {
            setAlertLevel(excessiveDuration > fullConfig.alertAfterSeconds * 2 ? 'critical' : 'warning');
          }
        } else {
          // Reset if blinking returns to normal
          excessiveBlinkingStart.current = null;
          setAlertLevel('normal');
        }
      }
    }, 100); // Check every 100ms for real-time detection

    return () => clearInterval(interval);
  }, [fullConfig]);

  return {
    isBlinkingTooMuch: blinkRate > fullConfig.blinkThreshold,
    blinkRate,
    eyeAspectRatio,
    alertLevel,
  };
};

// Utility function to calculate Eye Aspect Ratio (for future MediaPipe integration)
export const calculateEAR = (eyeLandmarks: { x: number; y: number }[]): number => {
  if (eyeLandmarks.length < 6) return 0.3; // Default open eye value
  
  // Standard EAR formula: (|p2-p6| + |p3-p5|) / (2 * |p1-p4|)
  // Where p1-p6 are eye landmark points
  const p1 = eyeLandmarks[0];
  const p2 = eyeLandmarks[1];
  const p3 = eyeLandmarks[2];
  const p4 = eyeLandmarks[3];
  const p5 = eyeLandmarks[4];
  const p6 = eyeLandmarks[5];
  
  const verticalDist1 = Math.sqrt(Math.pow(p2.x - p6.x, 2) + Math.pow(p2.y - p6.y, 2));
  const verticalDist2 = Math.sqrt(Math.pow(p3.x - p5.x, 2) + Math.pow(p3.y - p5.y, 2));
  const horizontalDist = Math.sqrt(Math.pow(p1.x - p4.x, 2) + Math.pow(p1.y - p4.y, 2));
  
  return (verticalDist1 + verticalDist2) / (2 * horizontalDist);
};

// Export for easy integration
export default useBlinkDetection;