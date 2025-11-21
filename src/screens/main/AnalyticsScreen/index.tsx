/**
 * Analytics Screen - Comprehensive driving analytics dashboard
 * 
 * Features:
 * - Safety score metrics and trends
 * - Interactive charts and visualizations
 * - Time period filtering
 * - Personalized insights
 * - Risk analysis heatmap
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle, Rect, Path } from 'react-native-svg';

// Icons - using simple text/symbols for now
const ArrowLeftIcon = () => <Text style={styles.iconText}>←</Text>;
const TrendingUpIcon = () => <Text style={styles.iconText}>📈</Text>;
const CalendarIcon = () => <Text style={styles.iconText}>📅</Text>;
const ClockIcon = () => <Text style={styles.iconText}>🕐</Text>;
const AlertTriangleIcon = () => <Text style={styles.iconText}>⚠️</Text>;
const HomeIcon = () => <Text style={styles.iconText}>🏠</Text>;
const BarChartIcon = () => <Text style={styles.iconText}>📊</Text>;
const SettingsIcon = () => <Text style={styles.iconText}>⚙️</Text>;
const BellIcon = () => <Text style={styles.iconText}>🔔</Text>;
const UserIcon = () => <Text style={styles.iconText}>👤</Text>;

interface AnalyticsProps {
  onNavigate?: (screen: string) => void;
}

const AnalyticsScreen: React.FC<AnalyticsProps> = ({ onNavigate }) => {
  const navigation = useNavigation();
  const [activePeriod, setActivePeriod] = useState('Week');

  const weeklyData = [
    { day: 'Mon', score: 85 },
    { day: 'Tue', score: 92 },
    { day: 'Wed', score: 88 },
    { day: 'Thu', score: 95 },
    { day: 'Fri', score: 82 },
    { day: 'Sat', score: 90 },
    { day: 'Sun', score: 87 },
  ];

  const alertsData = [
    { trip: 'T1', minor: 0, critical: 0 },
    { trip: 'T2', minor: 1, critical: 0 },
    { trip: 'T3', minor: 0, critical: 0 },
    { trip: 'T4', minor: 2, critical: 1 },
    { trip: 'T5', minor: 0, critical: 0 },
    { trip: 'T6', minor: 1, critical: 0 },
    { trip: 'T7', minor: 0, critical: 0 },
    { trip: 'T8', minor: 0, critical: 0 },
  ];

  const heatmapData = [
    { hour: '6AM', values: [0, 0, 0, 0, 0, 0, 0] },
    { hour: '9AM', values: [20, 15, 25, 18, 22, 10, 12] },
    { hour: '12PM', values: [30, 28, 32, 25, 35, 20, 18] },
    { hour: '3PM', values: [45, 50, 48, 52, 55, 30, 25] },
    { hour: '6PM', values: [65, 70, 68, 72, 75, 50, 45] },
    { hour: '9PM', values: [85, 88, 90, 92, 95, 70, 65] },
  ];

  const periods = ['Day', 'Week', 'Month', 'All Time'];

  const handleNavigate = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    } else {
      console.log(`Navigate to: ${screen}`);
      if (screen === 'dashboard') {
        navigation.goBack();
      } else if (screen === 'trip-history') {
        navigation.navigate('TripHistory' as never);
      } else if (screen === 'settings') {
        navigation.navigate('Settings' as never);
      } else if (screen === 'notifications') {
        navigation.navigate('Notifications' as never);
      }
    }
  };

  const LineChart = ({ data }: { data: typeof weeklyData }) => {
    const width = 280;
    const height = 160;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxScore = Math.max(...data.map(d => d.score));
    const minScore = Math.min(...data.map(d => d.score));
    const scoreRange = maxScore - minScore || 1;

    const points = data.map((item, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = padding + ((maxScore - item.score) * chartHeight) / scoreRange;
      return { x, y, score: item.score };
    });

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <View style={styles.chartContainer}>
        <Svg width={width} height={height}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => {
            const y = padding + ((100 - value) * chartHeight) / 100;
            return (
              <Line
                key={value}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#2A2A2A"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            );
          })}
          
          {/* Safe zone line */}
          <Line
            x1={padding}
            y1={padding + ((100 - 70) * chartHeight) / 100}
            x2={width - padding}
            y2={padding + ((100 - 70) * chartHeight) / 100}
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.5"
          />

          {/* Line */}
          <Path
            d={pathData}
            stroke="#f7c256"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((point, index) => (
            <Circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#f7c256"
            />
          ))}
        </Svg>

        {/* X-axis labels */}
        <View style={styles.chartLabels}>
          {data.map((item, index) => (
            <Text key={index} style={styles.chartLabel}>
              {item.day}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const BarChart = ({ data }: { data: typeof alertsData }) => {
    const width = 280;
    const height = 160;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length * 0.6;

    const maxValue = Math.max(...data.map(d => d.minor + d.critical)) || 1;

    return (
      <View style={styles.chartContainer}>
        <Svg width={width} height={height}>
          {data.map((item, index) => {
            const x = padding + (index * chartWidth) / data.length + (chartWidth / data.length - barWidth) / 2;
            const minorHeight = (item.minor * chartHeight) / maxValue;
            const criticalHeight = (item.critical * chartHeight) / maxValue;
            const totalHeight = minorHeight + criticalHeight;

            return (
              <React.Fragment key={index}>
                {/* Minor alerts bar */}
                {item.minor > 0 && (
                  <Rect
                    x={x}
                    y={padding + chartHeight - totalHeight}
                    width={barWidth}
                    height={minorHeight}
                    fill="#F59E0B"
                  />
                )}
                {/* Critical alerts bar */}
                {item.critical > 0 && (
                  <Rect
                    x={x}
                    y={padding + chartHeight - criticalHeight}
                    width={barWidth}
                    height={criticalHeight}
                    fill="#EF4444"
                  />
                )}
              </React.Fragment>
            );
          })}
        </Svg>

        {/* X-axis labels */}
        <View style={styles.chartLabels}>
          {data.map((item, index) => (
            <Text key={index} style={styles.chartLabel}>
              {item.trip}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const HeatmapRow = ({ hour, values }: { hour: string; values: number[] }) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
      <View style={styles.heatmapRow}>
        <Text style={styles.heatmapHour}>{hour}</Text>
        <View style={styles.heatmapCells}>
          {values.map((value, index) => {
            let backgroundColor = '#10B981';
            if (value >= 60) backgroundColor = '#EF4444';
            else if (value >= 30) backgroundColor = '#F59E0B';
            
            const opacity = Math.max(0.2, value / 100);
            
            return (
              <View
                key={index}
                style={[
                  styles.heatmapCell,
                  { backgroundColor, opacity }
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>Analytics</Text>
        </View>

        {/* Time Period Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.filterButton,
                activePeriod === period && styles.activeFilterButton
              ]}
              onPress={() => setActivePeriod(period)}
            >
              <Text style={[
                styles.filterText,
                activePeriod === period && styles.activeFilterText
              ]}>
                {period}
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
        {/* Hero Metric */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Safety Score</Text>
          <View style={styles.heroScore}>
            <Text style={styles.heroNumber}>87</Text>
            <Text style={styles.heroDenominator}>/100</Text>
          </View>
          <View style={styles.heroTrend}>
            <TrendingUpIcon />
            <Text style={styles.heroTrendText}>+5 from last week</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Excellent Driver</Text>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <CalendarIcon />
            <Text style={styles.metricNumber}>24</Text>
            <Text style={styles.metricLabel}>Total Trips</Text>
          </View>
          <View style={styles.metricCard}>
            <TrendingUpIcon />
            <Text style={styles.metricNumber}>387 mi</Text>
            <Text style={styles.metricLabel}>Total Distance</Text>
          </View>
          <View style={styles.metricCard}>
            <AlertTriangleIcon />
            <Text style={styles.metricNumber}>3</Text>
            <Text style={styles.metricLabel}>Total Alerts</Text>
          </View>
          <View style={styles.metricCard}>
            <ClockIcon />
            <Text style={styles.metricNumber}>45m</Text>
            <Text style={styles.metricLabel}>Avg Duration</Text>
          </View>
        </View>

        {/* Safety Score Over Time */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Safety Score Over Time</Text>
          <LineChart data={weeklyData} />
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Safe Zone (70+)</Text>
            </View>
          </View>
        </View>

        {/* Alerts by Trip */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Alerts by Trip</Text>
          <BarChart data={alertsData} />
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>Minor Warnings</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>Critical Alerts</Text>
            </View>
          </View>
        </View>

        {/* High-Risk Driving Times Heatmap */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>High-Risk Driving Times</Text>
          <View style={styles.heatmapContainer}>
            {heatmapData.map((row) => (
              <HeatmapRow key={row.hour} hour={row.hour} values={row.values} />
            ))}
          </View>
          <View style={styles.heatmapDays}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Text key={day} style={styles.heatmapDay}>{day}</Text>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Low Risk</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>Medium Risk</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>High Risk</Text>
            </View>
          </View>
        </View>

        {/* Personalized Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Personalized Insights</Text>
          
          <View style={[styles.insightCard, styles.successInsight]}>
            <Text style={styles.insightIcon}>✓</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Your safest day</Text>
              <Text style={styles.insightText}>You drive most safely on Tuesday mornings</Text>
            </View>
          </View>

          <View style={[styles.insightCard, styles.warningInsight]}>
            <Text style={styles.insightIcon}>⚠️</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>High-risk period</Text>
              <Text style={styles.insightText}>You're 60% more drowsy after 10pm - consider avoiding late drives</Text>
            </View>
          </View>

          <View style={[styles.insightCard, styles.infoInsight]}>
            <Text style={styles.insightIcon}>💡</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Break recommendation</Text>
              <Text style={styles.insightText}>Consider 15-minute breaks every 90 minutes for optimal alertness</Text>
            </View>
          </View>

          <View style={[styles.insightCard, styles.achievementInsight]}>
            <Text style={styles.insightIcon}>🎉</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Achievement unlocked</Text>
              <Text style={styles.insightText}>7-day safe driving streak! Keep up the great work!</Text>
            </View>
          </View>
        </View>

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
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigate('trip-history')}
        >
          <ClockIcon />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <BarChartIcon />
          <Text style={[styles.navText, styles.activeNavText]}>Analytics</Text>
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
    padding: 24,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  heroLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  heroScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  heroNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroDenominator: {
    fontSize: 24,
    color: '#6B7280',
    marginLeft: 4,
  },
  heroTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  heroTrendText: {
    fontSize: 14,
    color: '#10B981',
  },
  heroBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 20,
  },
  heroBadgeText: {
    fontSize: 14,
    color: '#10B981',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  metricCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  chartCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginTop: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    flex: 1,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  heatmapContainer: {
    gap: 8,
    marginBottom: 12,
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heatmapHour: {
    width: 48,
    fontSize: 12,
    color: '#6B7280',
  },
  heatmapCells: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  heatmapCell: {
    flex: 1,
    height: 32,
    borderRadius: 4,
  },
  heatmapDays: {
    flexDirection: 'row',
    marginLeft: 56,
    gap: 4,
    marginBottom: 16,
  },
  heatmapDay: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  insightsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  insightCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
  },
  successInsight: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  warningInsight: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  infoInsight: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  achievementInsight: {
    backgroundColor: 'rgba(247, 194, 86, 0.1)',
    borderColor: 'rgba(247, 194, 86, 0.3)',
  },
  insightIcon: {
    fontSize: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 12,
    color: '#6B7280',
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

export default AnalyticsScreen;
