/**
 * Dashboard Screen - Main home screen of the app
 * 
 * Features:
 * - Greeting and user info
 * - Safety score circular progress
 * - Quick stats grid
 * - Start trip button
 * - Recent trips list
 * - Bottom navigation
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

// Icons - using simple text/symbols for now, can be replaced with icon library
const PlayIcon = () => <Text style={styles.iconText}>▶</Text>;
const CalendarIcon = () => <Text style={styles.iconText}>📅</Text>;
const AlertTriangleIcon = () => <Text style={styles.iconText}>⚠️</Text>;
const AlertCircleIcon = () => <Text style={styles.iconText}>🟢</Text>;
const ClockIcon = () => <Text style={styles.iconText}>🕐</Text>;
const FlameIcon = () => <Text style={styles.iconText}>🔥</Text>;
const HomeIcon = () => <Text style={styles.iconText}>🏠</Text>;
const BarChartIcon = () => <Text style={styles.iconText}>📊</Text>;
const BellIcon = () => <Text style={styles.iconText}>🔔</Text>;
const SettingsIcon = () => <Text style={styles.iconText}>⚙️</Text>;
const UserIcon = () => <Text style={styles.iconText}>👤</Text>;
const ChevronRightIcon = () => <Text style={styles.iconText}>›</Text>;

interface DashboardProps {
  onNavigate?: (screen: string) => void;
}

const DashboardScreen: React.FC<DashboardProps> = ({ onNavigate }) => {
  const navigation = useNavigation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const recentTrips = [
    {
      date: 'Today, 2:30 PM',
      duration: '1h 23m',
      distance: '45.2 mi',
      incidents: 0,
    },
    {
      date: 'Yesterday, 9:15 AM',
      duration: '2h 15m',
      distance: '87.5 mi',
      incidents: 1,
    },
    {
      date: 'Nov 19, 4:45 PM',
      duration: '45m',
      distance: '28.3 mi',
      incidents: 0,
    },
  ];

  const handleNavigate = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    } else {
      console.log(`Navigate to: ${screen}`);
      // Handle navigation based on screen
      if (screen === 'trip-history') {
        navigation.navigate('TripHistory' as never);
      } else if (screen === 'analytics') {
        navigation.navigate('Analytics' as never);
      } else if (screen === 'settings') {
        navigation.navigate('Settings' as never);
      } else if (screen === 'notifications') {
        navigation.navigate('Notifications' as never);
      } else if (screen === 'active-driving') {
        navigation.navigate('ActiveDriving' as never);
      }
    }
  };

  const SafetyScoreCircle = ({ score }: { score: number }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

    return (
      <View style={styles.safetyScoreContainer}>
        <Svg width={160} height={160} style={styles.safetyScoreSvg}>
          {/* Background circle */}
          <Circle
            cx={80}
            cy={80}
            r={radius}
            stroke="#1E1E1E"
            strokeWidth={12}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={80}
            cy={80}
            r={radius}
            stroke="#f7c256"
            strokeWidth={12}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            transform={`rotate(-90 80 80)`}
          />
        </Svg>
        <View style={styles.safetyScoreText}>
          <Text style={styles.safetyScoreNumber}>{score}</Text>
          <Text style={styles.safetyScoreLabel}>Safety Score</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, Alex</Text>
        </View>

        {/* Safety Score Card */}
        <View style={styles.section}>
          <View style={styles.safetyCard}>
            <SafetyScoreCircle score={87} />
            <View style={styles.safetyImprovement}>
              <Text style={styles.improvementText}>↑ +5 this week</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <CalendarIcon />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Safe Trips</Text>
            </View>
            <View style={styles.statCard}>
              <AlertTriangleIcon />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Warnings</Text>
            </View>
            <View style={styles.statCard}>
              <AlertCircleIcon />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Critical</Text>
            </View>
          </View>
        </View>

        {/* Start Trip Button */}
        <View style={styles.section}>
          <View style={styles.startTripContainer}>
            <TouchableOpacity
              style={styles.startTripButton}
              onPress={() => handleNavigate('active-driving')}
              activeOpacity={0.8}
            >
              <PlayIcon />
              <Text style={styles.startTripText}>START TRIP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Secondary Actions */}
        <View style={styles.section}>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleNavigate('trip-history')}
            >
              <CalendarIcon />
              <Text style={styles.actionText}>View History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleNavigate('analytics')}
            >
              <BarChartIcon />
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Streak Section */}
        <View style={styles.section}>
          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <FlameIcon />
              <Text style={styles.streakTitle}>7-Day Safe Driving Streak</Text>
            </View>
            <View style={styles.streakBars}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <View key={day} style={styles.streakBar} />
              ))}
            </View>
            <Text style={styles.streakMessage}>Keep it up! 🎉</Text>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>
            <TouchableOpacity onPress={() => handleNavigate('trip-history')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tripsList}>
            {recentTrips.map((trip, index) => (
              <TouchableOpacity key={index} style={styles.tripCard}>
                <View style={styles.tripHeader}>
                  <View style={styles.tripDateContainer}>
                    <ClockIcon />
                    <Text style={styles.tripDate}>{trip.date}</Text>
                  </View>
                  <View style={[
                    styles.tripBadge,
                    trip.incidents === 0 ? styles.safeBadge : styles.warningBadge
                  ]}>
                    <Text style={[
                      styles.badgeText,
                      trip.incidents === 0 ? styles.safeText : styles.warningText
                    ]}>
                      {trip.incidents === 0 ? 'Safe' : `${trip.incidents} warning`}
                    </Text>
                  </View>
                </View>
                <View style={styles.tripDetails}>
                  <View style={styles.tripStats}>
                    <View style={styles.tripStat}>
                      <Text style={styles.tripStatLabel}>Duration</Text>
                      <Text style={styles.tripStatValue}>{trip.duration}</Text>
                    </View>
                    <View style={styles.tripStat}>
                      <Text style={styles.tripStatLabel}>Distance</Text>
                      <Text style={styles.tripStatValue}>{trip.distance}</Text>
                    </View>
                  </View>
                  <ChevronRightIcon />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom padding for navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <HomeIcon />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigate('trip-history')}
        >
          <ClockIcon />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigate('analytics')}
        >
          <BarChartIcon />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigate('settings')}
        >
          <SettingsIcon />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigate('notifications')}
        >
          <BellIcon />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom navigation
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  safetyCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  safetyScoreContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyScoreSvg: {
    position: 'absolute',
  },
  safetyScoreText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  safetyScoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  safetyScoreLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  safetyImprovement: {
    marginTop: 16,
  },
  improvementText: {
    color: '#10B981',
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  startTripContainer: {
    alignItems: 'center',
  },
  startTripButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f7c256',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f7c256',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startTripText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  streakCard: {
    backgroundColor: 'rgba(247, 194, 86, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(247, 194, 86, 0.3)',
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  streakTitle: {
    color: '#ffffff',
    fontSize: 16,
  },
  streakBars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  streakBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f7c256',
    borderRadius: 4,
  },
  streakMessage: {
    color: '#6B7280',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#f7c256',
    fontSize: 14,
  },
  tripsList: {
    gap: 12,
  },
  tripCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripDate: {
    color: '#6B7280',
    fontSize: 14,
  },
  tripBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  safeBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  warningBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  badgeText: {
    fontSize: 12,
  },
  safeText: {
    color: '#10B981',
  },
  warningText: {
    color: '#F59E0B',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripStats: {
    flexDirection: 'row',
    gap: 32,
  },
  tripStat: {
    alignItems: 'flex-start',
  },
  tripStatLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 4,
  },
  tripStatValue: {
    color: '#ffffff',
    fontSize: 14,
  },
  bottomPadding: {
    height: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    color: '#6B7280',
    fontSize: 12,
  },
  activeNavText: {
    color: '#f7c256',
  },
  iconText: {
    fontSize: 20,
  },
});

export default DashboardScreen;
