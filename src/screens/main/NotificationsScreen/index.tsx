/**
 * Notifications Screen - Shows grouped alerts, achievements, tips, and updates
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Simple emoji icons like other screens
const ArrowLeftIcon = () => <Text style={styles.iconText}>←</Text>;
const BellIcon = () => <Text style={styles.iconText}>🔔</Text>;
const AlertIcon = () => <Text style={styles.iconText}>⚠️</Text>;
const TrendIcon = () => <Text style={styles.iconText}>📈</Text>;
const BulbIcon = () => <Text style={styles.iconText}>💡</Text>;
const SparklesIcon = () => <Text style={styles.iconText}>✨</Text>;
const HomeIcon = () => <Text style={styles.iconText}>🏠</Text>;
const ClockIcon = () => <Text style={styles.iconText}>🕐</Text>;
const BarChartIcon = () => <Text style={styles.iconText}>📊</Text>;
const SettingsCogIcon = () => <Text style={styles.iconText}>⚙️</Text>;
const UserIcon = () => <Text style={styles.iconText}>👤</Text>;

interface NotificationItem {
  id: number;
  type: 'alert' | 'achievement' | 'tip' | 'update';
  icon: string;
  color: string; // hex color
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();

  const notifications: NotificationItem[] = [
    { id: 1, type: 'alert', icon: '⚠️', color: '#EF4444', title: 'Drowsiness detected at 2:45 PM', description: 'Safety alert during your afternoon drive', time: '2 hours ago', unread: true },
    { id: 2, type: 'alert', icon: '⏰', color: '#F59E0B', title: 'Break reminder: 2 hours of driving', description: 'Consider taking a rest break', time: '3 hours ago', unread: true },
    { id: 3, type: 'achievement', icon: '🎉', color: '#10B981', title: '7-day safe streak!', description: 'Keep up the excellent driving', time: '1 day ago', unread: false },
    { id: 4, type: 'achievement', icon: '🏆', color: '#FFD700', title: '100 trips completed', description: 'Milestone achievement unlocked', time: '2 days ago', unread: false },
    { id: 5, type: 'tip', icon: '💡', color: '#3B82F6', title: "You're most drowsy after 10 PM", description: 'Consider avoiding late night drives', time: '3 days ago', unread: false },
    { id: 6, type: 'tip', icon: '✨', color: '#FF8C00', title: 'Drive safer: Take breaks every 90 min', description: 'Research shows regular breaks improve alertness', time: '4 days ago', unread: false },
    { id: 7, type: 'update', icon: '🆕', color: '#8B5CF6', title: 'New feature: Video incident recording', description: 'Now you can review critical moments', time: '5 days ago', unread: false },
    { id: 8, type: 'update', icon: '📈', color: '#10B981', title: 'Your safety score improved to 87', description: 'Up from 82 last week', time: '1 week ago', unread: false },
  ];

  const handleNavigate = (screen: string) => {
    if (screen === 'dashboard') navigation.goBack();
    else if (screen === 'trip-history') navigation.navigate('TripHistory' as never);
    else if (screen === 'analytics') navigation.navigate('Analytics' as never);
    else if (screen === 'settings') navigation.navigate('Settings' as never);
  };

  const getCategoryIcon = (type: string) => {
    if (type === 'alert') return <AlertIcon />;
    if (type === 'achievement') return <TrendIcon />;
    if (type === 'tip') return <BulbIcon />;
    if (type === 'update') return <SparklesIcon />;
    return null;
  };

  const getCategoryTitle = (type: string) => {
    if (type === 'alert') return 'Alerts';
    if (type === 'achievement') return 'Achievements';
    if (type === 'tip') return 'Tips';
    if (type === 'update') return 'Updates';
    return '';
  };

  const grouped = notifications.reduce<Record<string, NotificationItem[]>>((acc, n) => {
    if (!acc[n.type]) acc[n.type] = [];
    acc[n.type].push(n);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => handleNavigate('dashboard')}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.headerAction}>Mark all read</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {Object.entries(grouped).map(([type, items]) => (
          <View key={type} style={{ marginBottom: 24 }}>
            <View style={styles.sectionHeading}>
              <View style={{ marginRight: 6 }}>
                <Text style={styles.accentText}>{getCategoryIcon(type)}</Text>
              </View>
              <Text style={styles.sectionSubtitle}>{getCategoryTitle(type)}</Text>
              <View style={styles.flexDivider} />
            </View>
            <View style={{ gap: 12 }}>
              {items.map((n) => (
                <TouchableOpacity
                  key={n.id}
                  style={[
                    styles.card,
                    n.unread ? styles.cardUnread : undefined,
                  ]}
                  activeOpacity={0.8}
                >
                  {n.unread && <View style={styles.unreadDot} />}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                    <View
                      style={[styles.avatarCircle, { backgroundColor: hexToBg(n.color, 0.12) }]}
                    >
                      <Text style={{ fontSize: 20 }}>{n.icon}</Text>
                    </View>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                      <Text style={styles.itemTitle}>{n.title}</Text>
                      <Text style={styles.itemDesc}>{n.description}</Text>
                      <Text style={styles.itemTime}>{n.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {notifications.length === 0 && (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 80, paddingHorizontal: 24 }}>
            <View style={[styles.avatarCircle, { width: 96, height: 96, borderRadius: 48, marginBottom: 16 }]}>
              <BellIcon />
            </View>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>You're all caught up! We'll notify you of any important updates.</Text>
          </View>
        )}

        <View style={{ height: 120 }} />
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
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigate('settings')}>
          <SettingsCogIcon />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <View style={[styles.navItem, { position: 'relative' }]}
        >
          <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
          <UserIcon />
          <Text style={[styles.navText, styles.accentText]}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

function hexToBg(hex: string, opacity: number) {
  // convert hex to rgba background color string for subtle tints
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: { backgroundColor: 'rgba(0,0,0,0.95)', paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#2A2A2A' },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 40, height: 40, backgroundColor: '#1E1E1E', borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2A2A2A' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#ffffff' },
  headerAction: { color: '#f7c256', fontSize: 12, padding: 8 },

  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 120 },

  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionSubtitle: { color: '#6B7280', fontSize: 14 },
  flexDivider: { flex: 1, height: 1, backgroundColor: '#2A2A2A', marginLeft: 8 },

  card: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2A2A2A', position: 'relative' },
  cardUnread: { borderColor: '#f7c256' },
  unreadDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, backgroundColor: '#f7c256', borderRadius: 4 },

  avatarCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { color: '#ffffff', marginBottom: 4 },
  itemDesc: { color: '#6B7280', fontSize: 12, marginBottom: 6 },
  itemTime: { color: '#6B7280', fontSize: 10 },

  emptyTitle: { color: '#ffffff', fontSize: 16, marginBottom: 4 },
  emptySubtitle: { color: '#6B7280', fontSize: 12, textAlign: 'center' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1E1E1E', borderTopWidth: 1, borderTopColor: '#2A2A2A', flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 24 },
  navItem: { flex: 1, alignItems: 'center', gap: 4 },
  navText: { color: '#6B7280', fontSize: 12 },
  iconText: { fontSize: 20 },
  accentText: { color: '#f7c256' },

  badge: { position: 'absolute', top: -2, right: 32, width: 16, height: 16, borderRadius: 8, backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#ffffff', fontSize: 10, fontWeight: '600' },
});

export default NotificationsScreen;
