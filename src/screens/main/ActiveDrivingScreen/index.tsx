/**
 * Active Driving Screen - Simulates an active trip with drowsiness alerts
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Emoji icons for consistency
const PauseIcon = () => <Text style={styles.iconText}>⏸️</Text>;
const MapPinIcon = () => <Text style={styles.iconText}>📍</Text>;
const CloseIcon = () => <Text style={styles.iconText}>✖️</Text>;
const PhoneIcon = () => <Text style={styles.iconText}>📞</Text>;

const ActiveDrivingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [drowsinessLevel, setDrowsinessLevel] = useState(20); // 0-100
  const [speed, setSpeed] = useState(45);
  const [distance, setDistance] = useState(12.3);
  const [warningCount, setWarningCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'warning' | 'critical'>('warning');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
      // Simulate drowsiness detection
      const randomChange = Math.random() * 10 - 5;
      setDrowsinessLevel((prev) => Math.max(0, Math.min(100, prev + randomChange)));
      // Simulate speed changes
      setSpeed((prev) => Math.max(0, Math.min(80, prev + (Math.random() * 4 - 2))));
      // Simulate distance
      setDistance((prev) => prev + 0.015);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (drowsinessLevel > 70 && drowsinessLevel < 85 && !showAlert) {
      setAlertType('warning');
      setShowAlert(true);
      setWarningCount((prev) => prev + 1);
    } else if (drowsinessLevel >= 85 && !showAlert) {
      setAlertType('critical');
      setShowAlert(true);
      setWarningCount((prev) => prev + 1);
    }
  }, [drowsinessLevel, showAlert]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const getDrowsinessColor = () => {
    if (drowsinessLevel < 40) return '#10B981'; // Green
    if (drowsinessLevel < 60) return '#F59E0B'; // Yellow
    if (drowsinessLevel < 80) return '#FF8C00'; // Orange
    return '#EF4444'; // Red
  };

  const getDrowsinessLabel = () => {
    if (drowsinessLevel < 40) return 'Alert';
    if (drowsinessLevel < 60) return 'Normal';
    if (drowsinessLevel < 80) return 'Tired';
    return 'Drowsy';
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'map-view') {
      // Placeholder: send to TripHistory for now
      navigation.navigate('TripHistory' as never);
    } else if (screen === 'dashboard') {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera feed simulation background */}
      <View style={styles.cameraBg}>
        <View style={styles.cameraOverlay}>
          <View style={styles.faceOval} />
        </View>
      </View>

      {/* Warning Overlay */}
      {showAlert && alertType === 'warning' && (
        <View style={styles.warningOverlay}>
          <View style={styles.warningCard}>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <View style={styles.warningIconWrap}>
                <Text style={{ fontSize: 32 }}>⚠️</Text>
              </View>
              <Text style={[styles.title, { color: '#F59E0B', marginTop: 8 }]}>Fatigue Detected</Text>
              <Text style={styles.subtitle}>Consider taking a break soon</Text>
            </View>
            <View style={{ gap: 12 }}>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowAlert(false)}>
                <Text style={styles.primaryBtnText}>I'm Okay</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} onPress={() => handleNavigate('map-view')}>
                <Text style={styles.outlineBtnText}>Find Rest Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Critical Overlay */}
      {showAlert && alertType === 'critical' && (
        <View style={styles.criticalOverlay}>
          <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 72, marginBottom: 16 }}>⚠️</Text>
            <Text style={[styles.hero, { marginBottom: 12 }]}>WAKE UP!</Text>
            <Text style={styles.subtitle}>Drowsiness Detected - Pull Over Safely</Text>
            <View style={{ gap: 12, marginTop: 24, width: '100%' }}>
              <TouchableOpacity style={[styles.primaryBtn, { height: 64 }]} onPress={() => setShowAlert(false)}>
                <Text style={[styles.primaryBtnText, { fontSize: 18 }]}>I'M AWAKE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.outlineBtn, { height: 64 }]} onPress={() => handleNavigate('map-view')}>
                <Text style={[styles.outlineBtnText, { fontSize: 18 }]}>FIND REST STOP</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.smallMuted, { marginTop: 16 }]}>Emergency contact will be notified in 30 seconds</Text>
          </View>
        </View>
      )}

      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarRow}>
          <View style={styles.topLeft}>
            <Text style={styles.topBarText}>{formatTime(elapsedTime)}</Text>
            <View style={styles.gpsRow}>
              <View style={styles.gpsDot} />
              <Text style={styles.smallMuted}>GPS</Text>
            </View>
          </View>
          <View style={styles.topRight}>
            <Text style={styles.topBarText}>98%</Text>
            <Text style={styles.smallMuted}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </View>
      </View>

      {/* Drowsiness meter */}
      <View style={styles.meterWrap}>
        <View style={styles.meterTrack}>
          <View style={[styles.meterFill, { height: `${drowsinessLevel}%`, marginTop: `${100 - drowsinessLevel}%`, backgroundColor: getDrowsinessColor() }]} />
        </View>
        <View style={{ marginTop: 8, alignItems: 'center' }}>
          <Text style={{ color: getDrowsinessColor(), fontSize: 12 }}>{getDrowsinessLabel()}</Text>
        </View>
      </View>

      {/* Eye status */}
      <View style={styles.eyeStatus}>
        <View style={styles.eyeCard}>
          <Text style={styles.smallMuted}>Eye Aspect</Text>
          <Text style={{ color: getDrowsinessColor() }}>{(1 - drowsinessLevel / 100).toFixed(2)}</Text>
        </View>
      </View>

      {/* Bottom stats & controls */}
      <View style={styles.bottomBar}>
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={styles.smallMuted}>Speed</Text>
            <Text style={styles.statValue}>{Math.round(speed)}</Text>
            <Text style={styles.smallMuted}>mph</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.smallMuted}>Distance</Text>
            <Text style={styles.statValue}>{distance.toFixed(1)}</Text>
            <Text style={styles.smallMuted}>miles</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.smallMuted}>Warnings</Text>
            <Text style={styles.statValue}>{warningCount}</Text>
            <Text style={styles.smallMuted}>alerts</Text>
          </View>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.mapBtn} onPress={() => handleNavigate('map-view')}>
            <MapPinIcon />
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.endBtn} onPress={() => handleNavigate('dashboard')}>
            <CloseIcon />
            <Text style={styles.buttonText}>End Trip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Controls */}
      <View style={styles.floatingTop}>
        <TouchableOpacity style={styles.fabCircle}>
          <PauseIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.floatingBottom}>
        <TouchableOpacity style={[styles.fabCircle, { backgroundColor: '#EF4444' }]}>
          <PhoneIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  cameraBg: { position: 'absolute', inset: 0 as any, left: 0, right: 0, top: 0, bottom: 0 },
  cameraOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 0.1 },
  faceOval: { width: 192, height: 256, borderWidth: 2, borderColor: '#FF8C00', borderRadius: 128 },

  warningOverlay: { position: 'absolute', inset: 0 as any, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(245, 158, 11, 0.2)', borderWidth: 4, borderColor: '#F59E0B', zIndex: 40, alignItems: 'center', justifyContent: 'center' },
  warningCard: { backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: 24, padding: 24, marginHorizontal: 16, maxWidth: 360 },
  warningIconWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(245, 158, 11, 0.2)', alignItems: 'center', justifyContent: 'center' },

  criticalOverlay: { position: 'absolute', inset: 0 as any, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center', zIndex: 50 },

  topBar: { position: 'absolute', left: 0, right: 0, top: 0, padding: 24, backgroundColor: 'rgba(0,0,0,0.5)' },
  topBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  gpsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 12 },
  gpsDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  topBarText: { color: '#ffffff' },
  smallMuted: { color: '#6B7280', fontSize: 12 },

  meterWrap: { position: 'absolute', left: 24, top: '50%', marginTop: -128 },
  meterTrack: { width: 12, height: 256, backgroundColor: '#1E1E1E', borderRadius: 6, overflow: 'hidden', borderWidth: 1, borderColor: '#2A2A2A' },
  meterFill: { width: '100%' },

  eyeStatus: { position: 'absolute', top: 96, right: 24 },
  eyeCard: { backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#2A2A2A' },

  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, backgroundColor: 'rgba(0,0,0,0.6)' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCol: { alignItems: 'center' },
  statValue: { color: '#ffffff', fontSize: 24 },
  actionsRow: { flexDirection: 'row', gap: 12 },
  mapBtn: { flex: 1, height: 48, backgroundColor: '#1E1E1E', borderRadius: 12, borderWidth: 1, borderColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  endBtn: { flex: 1, height: 48, backgroundColor: '#EF4444', borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  buttonText: { color: '#ffffff' },

  floatingTop: { position: 'absolute', top: 24, right: 24 },
  floatingBottom: { position: 'absolute', bottom: 96, right: 24 },
  fabCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2A2A2A' },

  title: { fontSize: 18, color: '#ffffff' },
  hero: { fontSize: 48, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { color: '#6B7280' },
  primaryBtn: { height: 56, backgroundColor: '#FF8C00', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: '#000000', fontWeight: '600' },
  outlineBtn: { height: 56, backgroundColor: 'transparent', borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff' },
  outlineBtnText: { color: '#ffffff' },
  iconText: { fontSize: 20 },
});

export default ActiveDrivingScreen;
