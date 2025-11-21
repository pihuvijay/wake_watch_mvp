/**
 * Trip History Screen - Shows user's driving trip history
 * 
 * Features:
 * - Search and filter trips
 * - Trip cards with route, duration, alerts
 * - Map thumbnails with route visualization
 * - Sort functionality
 * - Bottom navigation
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

// Icons - using simple text/symbols for now
const ArrowLeftIcon = () => <Text style={styles.iconText}>←</Text>;
const SearchIcon = () => <Text style={styles.iconText}>🔍</Text>;
const ClockIcon = () => <Text style={styles.iconText}>🕐</Text>;
const MapPinIcon = () => <Text style={styles.iconText}>📍</Text>;
const AlertTriangleIcon = () => <Text style={styles.iconText}>⚠️</Text>;
const HomeIcon = () => <Text style={styles.iconText}>🏠</Text>;
const BarChartIcon = () => <Text style={styles.iconText}>📊</Text>;
const SettingsIcon = () => <Text style={styles.iconText}>⚙️</Text>;
const UserIcon = () => <Text style={styles.iconText}>👤</Text>;
const ChevronRightIcon = () => <Text style={styles.iconText}>›</Text>;

interface Trip {
  id: number;
  date: string;
  route: string;
  duration: string;
  distance: string;
  alerts: number;
  score: number;
}

interface TripHistoryProps {
  onNavigate?: (screen: string) => void;
}

const TripHistoryScreen: React.FC<TripHistoryProps> = ({ onNavigate }) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const trips: Trip[] = [
    {
      id: 1,
      date: 'Today, 2:30 PM',
      route: 'Home → Downtown Office',
      duration: '1h 23m',
      distance: '45.2 mi',
      alerts: 0,
      score: 95,
    },
    {
      id: 2,
      date: 'Yesterday, 9:15 AM',
      route: 'Downtown → Airport',
      duration: '2h 15m',
      distance: '87.5 mi',
      alerts: 1,
      score: 82,
    },
    {
      id: 3,
      date: 'Nov 19, 4:45 PM',
      route: 'Office → Gym',
      duration: '45m',
      distance: '28.3 mi',
      alerts: 0,
      score: 92,
    },
    {
      id: 4,
      date: 'Nov 18, 8:00 AM',
      route: 'Home → Client Meeting',
      duration: '1h 10m',
      distance: '52.1 mi',
      alerts: 2,
      score: 75,
    },
    {
      id: 5,
      date: 'Nov 17, 3:30 PM',
      route: 'Restaurant → Home',
      duration: '35m',
      distance: '18.7 mi',
      alerts: 0,
      score: 88,
    },
    {
      id: 6,
      date: 'Nov 16, 7:00 PM',
      route: 'Office → Shopping Mall',
      duration: '55m',
      distance: '32.4 mi',
      alerts: 0,
      score: 90,
    },
    {
      id: 7,
      date: 'Nov 15, 10:30 AM',
      route: 'Home → Hospital',
      duration: '1h 5m',
      distance: '41.8 mi',
      alerts: 1,
      score: 85,
    },
  ];

  const filters = ['All', 'Today', 'This Week', 'This Month'];

  const handleNavigate = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    } else {
      console.log(`Navigate to: ${screen}`);
      // For now, just go back to dashboard
      if (screen === 'dashboard') {
        navigation.goBack();
      } else if (screen === 'settings') {
        navigation.navigate('Settings' as never);
      } else if (screen === 'analytics') {
        navigation.navigate('Analytics' as never);
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: 'rgba(16, 185, 129, 0.2)', text: '#10B981' };
    if (score >= 75) return { bg: 'rgba(245, 158, 11, 0.2)', text: '#F59E0B' };
    return { bg: 'rgba(239, 68, 68, 0.2)', text: '#EF4444' };
  };

  const MapThumbnail = ({ trip }: { trip: Trip }) => (
    <View style={styles.mapThumbnail}>
      <Svg width="100%" height="100%" style={styles.mapSvg}>
        <Path
          d="M 20 80 Q 80 60, 120 40 T 200 20"
          stroke="#f7c256"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      {trip.alerts > 0 && (
        <View style={styles.alertDot}>
          <View style={styles.alertDotInner} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => handleNavigate('dashboard')}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trip History</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SearchIcon />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search trips..."
            placeholderTextColor="#6B7280"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sort */}
        <View style={styles.sortContainer}>
          <Text style={styles.tripCount}>{trips.length} trips found</Text>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Recent ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Trip List */}
        <View style={styles.tripsList}>
          {trips.map((trip) => {
            const scoreColors = getScoreColor(trip.score);
            return (
              <TouchableOpacity key={trip.id} style={styles.tripCard}>
                <View style={styles.tripHeader}>
                  <View style={styles.tripInfo}>
                    <View style={styles.tripDate}>
                      <ClockIcon />
                      <Text style={styles.dateText}>{trip.date}</Text>
                    </View>
                    <View style={styles.tripRoute}>
                      <MapPinIcon />
                      <Text style={styles.routeText}>{trip.route}</Text>
                    </View>
                  </View>
                  <View style={styles.tripScore}>
                    <View style={[
                      styles.scoreBadge,
                      { backgroundColor: scoreColors.bg }
                    ]}>
                      <Text style={[
                        styles.scoreText,
                        { color: scoreColors.text }
                      ]}>
                        Score: {trip.score}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Map Thumbnail */}
                <MapThumbnail trip={trip} />

                {/* Trip Stats */}
                <View style={styles.tripStats}>
                  <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                      <Text style={styles.statLabel}>Duration</Text>
                      <Text style={styles.statValue}>{trip.duration}</Text>
                    </View>
                    <View style={styles.stat}>
                      <Text style={styles.statLabel}>Distance</Text>
                      <Text style={styles.statValue}>{trip.distance}</Text>
                    </View>
                    <View style={styles.stat}>
                      <Text style={styles.statLabel}>Alerts</Text>
                      <Text style={[
                        styles.statValue,
                        { color: trip.alerts > 0 ? '#F59E0B' : '#10B981' }
                      ]}>
                        {trip.alerts}
                      </Text>
                    </View>
                  </View>
                  <ChevronRightIcon />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Load More */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>

        {/* Bottom padding for navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigate('dashboard')}
        >
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <ClockIcon />
          <Text style={[styles.navText, styles.activeNavText]}>History</Text>
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
          onPress={() => handleNavigate('profile')}
        >
          <UserIcon />
          <Text style={styles.navText}>Profile</Text>
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
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filtersContent: {
    gap: 8,
    paddingBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activeFilterButton: {
    backgroundColor: '#f7c256',
    borderColor: '#f7c256',
  },
  filterText: {
    fontSize: 14,
    color: '#ffffff',
  },
  activeFilterText: {
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  tripCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  sortText: {
    fontSize: 14,
    color: '#ffffff',
  },
  tripsList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  tripCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tripInfo: {
    flex: 1,
  },
  tripDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  routeText: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },
  tripScore: {
    alignItems: 'flex-end',
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '500',
  },
  mapThumbnail: {
    width: '100%',
    height: 96,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  mapSvg: {
    position: 'absolute',
    opacity: 0.8,
  },
  alertDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  alertDotInner: {
    width: 12,
    height: 12,
    backgroundColor: '#F59E0B',
    borderRadius: 6,
  },
  tripStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 32,
  },
  stat: {
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: '#ffffff',
  },
  loadMoreButton: {
    marginHorizontal: 24,
    marginTop: 16,
    height: 48,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    fontSize: 16,
    color: '#ffffff',
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

export default TripHistoryScreen;
