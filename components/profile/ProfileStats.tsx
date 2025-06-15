import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileStatsProps {
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  totalBookings,
  completedBookings,
  upcomingBookings,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thống kê đặt lịch</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalBookings}</Text>
          <Text style={styles.statLabel}>Tổng số lịch</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedBookings}</Text>
          <Text style={styles.statLabel}>Đã hoàn thành</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{upcomingBookings}</Text>
          <Text style={styles.statLabel}>Sắp tới</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});