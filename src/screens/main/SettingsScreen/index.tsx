/**
 * Settings Screen - Comprehensive app configuration
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

// Simple emoji icons as placeholders
const ArrowLeftIcon = () => <Text style={styles.iconText}>←</Text>;
const CameraIcon = () => <Text style={styles.iconText}>📷</Text>;
const BellIcon = () => <Text style={styles.iconText}>🔔</Text>;
const ShieldIcon = () => <Text style={styles.iconText}>🛡️</Text>;
const InfoIcon = () => <Text style={styles.iconText}>ℹ️</Text>;
const ChevronRightIcon = () => <Text style={styles.iconText}>›</Text>;
const HomeIcon = () => <Text style={styles.iconText}>🏠</Text>;
const ClockIcon = () => <Text style={styles.iconText}>🕐</Text>;
const BarChartIcon = () => <Text style={styles.iconText}>📊</Text>;
const UserIcon = () => <Text style={styles.iconText}>👤</Text>;
const VolumeIcon = () => <Text style={styles.iconText}>🔊</Text>;
const VibrateIcon = () => <Text style={styles.iconText}>📳</Text>;
const SettingsCogIcon = () => <Text style={styles.iconText}>⚙️</Text>;

interface SettingsProps {
  onNavigate?: (screen: string) => void;
}

const SettingsScreen: React.FC<SettingsProps> = ({ onNavigate }) => {
  const navigation = useNavigation();

  const [sensitivity, setSensitivity] = useState<number>(60);
  const [volume, setVolume] = useState<number>(80);
  const [breakReminder, setBreakReminder] = useState<boolean>(true);
  const [vibration, setVibration] = useState<boolean>(true);
  const [flashScreen, setFlashScreen] = useState<boolean>(true);
  const [voiceAlerts, setVoiceAlerts] = useState<boolean>(true);
  const [facialLandmarks, setFacialLandmarks] = useState<boolean>(false);
  const [saveVideos, setSaveVideos] = useState<boolean>(true);

  const [alertThreshold, setAlertThreshold] = useState<string>('3');
  const [breakInterval, setBreakInterval] = useState<string>('90');
  const [alertType, setAlertType] = useState<string>('standard');
  const [cameraQuality, setCameraQuality] = useState<string>('medium');
  const [autoDelete, setAutoDelete] = useState<string>('7');

  const handleNavigate = (screen: string) => {
    if (onNavigate) return onNavigate(screen);
    if (screen === 'dashboard') navigation.goBack();
    else if (screen === 'trip-history') navigation.navigate('TripHistory' as never);
    else if (screen === 'analytics') navigation.navigate('Analytics' as never);
    else if (screen === 'settings') navigation.navigate('Settings' as never);
    else if (screen === 'notifications') navigation.navigate('Notifications' as never);
  };

  const openPicker = (
    title: string,
    options: { label: string; value: string }[],
    onPick: (value: string) => void
  ) => {
    Alert.alert(
      title,
      '',
      [
        ...options.map((o) => ({ text: o.label, onPress: () => onPick(o.value) })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const sensitivityLabel = sensitivity < 33 ? 'Low' : sensitivity < 66 ? 'Medium' : 'High';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => handleNavigate('dashboard')}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatarCircle}>
              <UserIcon />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Alex Driver</Text>
              <Text style={styles.profileEmail}>alex.driver@email.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Detection Settings */}
        <View>
          <View style={styles.sectionHeading}>
            <CameraIcon />
            <Text style={styles.sectionTitle}>Detection Settings</Text>
          </View>
          <View style={styles.card}>
            {/* Sensitivity */}
            <View style={styles.settingBlock}>
              <Text style={styles.label}>Sensitivity Level</Text>
              <Text style={styles.helpText}>Higher sensitivity detects drowsiness earlier</Text>
              <View style={styles.sliderWrap}>
                <Slider
                  value={sensitivity}
                  onValueChange={(v: number) => setSensitivity(v)}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#f7c256"
                  maximumTrackTintColor="#2A2A2A"
                  thumbTintColor="#ffffff"
                  style={{ height: 40 }}
                />
                <View style={styles.sliderLabelsRow}>
                  <Text style={styles.mutedText}>Low</Text>
                  <Text style={styles.accentText}>{sensitivityLabel}</Text>
                  <Text style={styles.mutedText}>High</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Alert Threshold */}
            <View style={styles.settingBlock}>
              <Text style={styles.label}>Alert Threshold</Text>
              <Text style={styles.helpText}>Eye closure time before alert</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() =>
                  openPicker('Alert Threshold', [
                    { label: '1 second', value: '1' },
                    { label: '2 seconds', value: '2' },
                    { label: '3 seconds', value: '3' },
                    { label: '5 seconds', value: '5' },
                    { label: '10 seconds', value: '10' },
                  ], setAlertThreshold)
                }
              >
                <Text style={styles.dropdownText}>{`${alertThreshold} ${alertThreshold === '1' ? 'second' : 'seconds'}`}</Text>
                <ChevronRightIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Break Reminder */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.label}>Break Reminder</Text>
                <Text style={styles.helpText}>Remind me to take breaks</Text>
              </View>
              <Switch
                value={breakReminder}
                onValueChange={setBreakReminder}
                trackColor={{ false: '#2A2A2A', true: '#f7c256' }}
                thumbColor={breakReminder ? '#ffffff' : '#6B7280'}
              />
            </View>

            {breakReminder && (
              <View style={styles.subSetting}>
                <Text style={styles.subLabel}>Break Interval</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() =>
                    openPicker('Break Interval', [
                      { label: '60 minutes', value: '60' },
                      { label: '90 minutes', value: '90' },
                      { label: '120 minutes', value: '120' },
                    ], setBreakInterval)
                  }
                >
                  <Text style={styles.dropdownText}>{`${breakInterval} minutes`}</Text>
                  <ChevronRightIcon />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Alert Settings */}
        <View>
          <View style={styles.sectionHeading}>
            <BellIcon />
            <Text style={styles.sectionTitle}>Alert Settings</Text>
          </View>
          <View style={styles.card}>
            {/* Volume */}
            <View style={styles.settingBlock}>
              <View style={styles.inlineHeader}>
                <VolumeIcon />
                <Text style={styles.label}>Sound Volume</Text>
              </View>
              <View style={styles.sliderWrap}>
                <Slider
                  value={volume}
                  onValueChange={(v: number) => setVolume(v)}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#f7c256"
                  maximumTrackTintColor="#2A2A2A"
                  thumbTintColor="#ffffff"
                  style={{ height: 40 }}
                />
                <View style={styles.sliderLabelsRow}>
                  <Text style={styles.smallMuted}>Silent</Text>
                  <Text style={styles.accentText}>{Math.round(volume)}%</Text>
                  <Text style={styles.smallMuted}>Max</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Toggles */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <View style={styles.inlineHeader}>
                  <VibrateIcon />
                  <Text style={styles.label}>Vibration</Text>
                </View>
              </View>
              <Switch
                value={vibration}
                onValueChange={setVibration}
                trackColor={{ false: '#2A2A2A', true: '#f7c256' }}
                thumbColor={vibration ? '#ffffff' : '#6B7280'}
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.label}>Flash Screen</Text>
              </View>
              <Switch
                value={flashScreen}
                onValueChange={setFlashScreen}
                trackColor={{ false: '#2A2A2A', true: '#f7c256' }}
                thumbColor={flashScreen ? '#ffffff' : '#6B7280'}
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.label}>Voice Alerts</Text>
              </View>
              <Switch
                value={voiceAlerts}
                onValueChange={setVoiceAlerts}
                trackColor={{ false: '#2A2A2A', true: '#f7c256' }}
                thumbColor={voiceAlerts ? '#ffffff' : '#6B7280'}
              />
            </View>

            <View style={styles.divider} />

            {/* Alert Type */}
            <View style={styles.settingBlock}>
              <Text style={styles.label}>Alert Type</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() =>
                  openPicker('Alert Type', [
                    { label: 'Gentle', value: 'gentle' },
                    { label: 'Standard', value: 'standard' },
                    { label: 'Aggressive', value: 'aggressive' },
                  ], setAlertType)
                }
              >
                <Text style={styles.dropdownText}>
                  {alertType === 'gentle' ? 'Gentle' : alertType === 'aggressive' ? 'Aggressive' : 'Standard'}
                </Text>
                <ChevronRightIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Camera Settings */}
        <View>
          <View style={styles.sectionHeading}>
            <CameraIcon />
            <Text style={styles.sectionTitle}>Camera Settings</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={styles.label}>Show Facial Landmarks</Text>
                <Text style={styles.helpText}>Display detection points on face</Text>
              </View>
              <Switch
                value={facialLandmarks}
                onValueChange={setFacialLandmarks}
                trackColor={{ false: '#2A2A2A', true: '#f7c256' }}
                thumbColor={facialLandmarks ? '#ffffff' : '#6B7280'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingBlock}>
              <Text style={styles.label}>Camera Quality</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() =>
                  openPicker('Camera Quality', [
                    { label: 'Low (Battery Saver)', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ], setCameraQuality)
                }
              >
                <Text style={styles.dropdownText}>
                  {cameraQuality === 'low' ? 'Low (Battery Saver)' : cameraQuality === 'high' ? 'High' : 'Medium'}
                </Text>
                <ChevronRightIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingBlock}>
              <View style={styles.inlineHeader}>
                <Text style={styles.label}>Save Incident Videos</Text>
              </View>
              <View style={styles.toggleRowSpace}>
                <Switch
                  value={saveVideos}
                  onValueChange={setSaveVideos}
                  trackColor={{ false: '#2A2A2A', true: '#f7c256' }}
                  thumbColor={saveVideos ? '#ffffff' : '#6B7280'}
                />
              </View>

              {saveVideos && (
                <View style={styles.subSetting}>
                  <Text style={styles.subLabel}>Auto-delete After</Text>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() =>
                      openPicker('Auto-delete After', [
                        { label: '7 days', value: '7' },
                        { label: '30 days', value: '30' },
                        { label: 'Never', value: 'never' },
                      ], setAutoDelete)
                    }
                  >
                    <Text style={styles.dropdownText}>
                      {autoDelete === 'never' ? 'Never' : `${autoDelete} days`}
                    </Text>
                    <ChevronRightIcon />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View>
          <View style={styles.sectionHeading}>
            <ShieldIcon />
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          </View>
          <View style={{ gap: 12 }}>
            <TouchableOpacity style={styles.listItem}>
              <View>
                <Text style={styles.listTitle}>John Doe</Text>
                <Text style={styles.listSubtitle}>+1 (555) 123-4567</Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <View>
                <Text style={styles.listTitle}>Jane Smith</Text>
                <Text style={styles.listSubtitle}>+1 (555) 987-6543</Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Add Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy & Data */}
        <View>
          <View style={styles.sectionHeading}>
            <ShieldIcon />
            <Text style={styles.sectionTitle}>Privacy & Data</Text>
          </View>
          <View style={styles.listCard}>
            <TouchableOpacity style={[styles.listRow, styles.listRowRoundedTop]}>
              <Text style={styles.listRowText}>Manage Trip History</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listRow}>
              <Text style={styles.listRowText}>Download My Data</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.listRow, styles.listRowRoundedBottom]}>
              <Text style={[styles.listRowText, { color: '#EF4444' }]}>Delete Account</Text>
              <Text style={{ color: '#EF4444' }}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View>
          <View style={styles.sectionHeading}>
            <InfoIcon />
            <Text style={styles.sectionTitle}>About</Text>
          </View>
          <View style={styles.listCard}>
            <TouchableOpacity style={[styles.listRow, styles.listRowRoundedTop]}>
              <Text style={styles.listRowText}>Terms of Service</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listRow}>
              <Text style={styles.listRowText}>Privacy Policy</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listRow}>
              <Text style={styles.listRowText}>Help & Support</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
            <View style={[styles.listRow, styles.listRowRoundedBottom]}>
              <View>
                <Text style={styles.listRowText}>App Version</Text>
                <Text style={styles.listSubtitle}>v1.2.3</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigate('dashboard')}>
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigate('trip-history')}>
          <ClockIcon />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigate('analytics')}>
          <BarChartIcon />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        <View style={[styles.navItem, styles.activeNavItem]}>
          <SettingsCogIcon />
          <Text style={[styles.navText, styles.activeNavText]}>Settings</Text>
        </View>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigate('notifications')}>
          <BellIcon />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { backgroundColor: 'rgba(0,0,0,0.95)', paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#2A2A2A' },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  backButton: { width: 40, height: 40, backgroundColor: '#1E1E1E', borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2A2A2A' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#ffffff' },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 120, gap: 24 },

  card: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { color: '#ffffff', fontSize: 16, fontWeight: '600' },

  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12 },
  avatarCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#f7c256', alignItems: 'center', justifyContent: 'center' },
  profileInfo: { flex: 1 },
  profileName: { color: '#ffffff', fontSize: 16, marginBottom: 4 },
  profileEmail: { color: '#6B7280', fontSize: 12 },

  primaryBtn: { height: 48, backgroundColor: '#f7c256', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryBtnText: { color: '#000000', fontWeight: '600' },

  settingBlock: { marginBottom: 12 },
  label: { color: '#ffffff', fontSize: 14, marginBottom: 6 },
  subLabel: { color: '#ffffff', fontSize: 13, marginBottom: 6 },
  helpText: { color: '#6B7280', fontSize: 12, marginBottom: 10 },
  sliderWrap: { },
  sliderLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  mutedText: { color: '#6B7280' },
  smallMuted: { color: '#6B7280', fontSize: 12 },
  accentText: { color: '#f7c256' },
  inlineHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },

  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
  toggleRowSpace: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 6 },
  toggleInfo: { flex: 1, paddingRight: 12 },
  subSetting: { marginTop: 8, paddingLeft: 8 },

  divider: { height: 1, backgroundColor: '#2A2A2A', marginVertical: 10 },

  dropdownButton: { height: 48, backgroundColor: '#000000', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownText: { color: '#ffffff' },

  listCard: { backgroundColor: '#1E1E1E', borderRadius: 16, borderWidth: 1, borderColor: '#2A2A2A' },
  listRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#2A2A2A' },
  listRowRoundedTop: { borderTopWidth: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  listRowRoundedBottom: { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  listRowText: { color: '#ffffff' },
  listItem: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2A2A2A', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  listTitle: { color: '#ffffff' },
  listSubtitle: { color: '#6B7280', fontSize: 12 },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1E1E1E', borderTopWidth: 1, borderTopColor: '#2A2A2A', flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 24 },
  navItem: { flex: 1, alignItems: 'center', gap: 4 },
  activeNavItem: { },
  navText: { color: '#6B7280', fontSize: 12 },
  activeNavText: { color: '#f7c256' },
  iconText: { fontSize: 20 },
});

export default SettingsScreen;
