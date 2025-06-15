// app/(tabs)/my-bookings.tsx
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MyBookingsScreen() {
  const bookings = [
    {
      id: '1',
      date: '2024-03-20',
      time: '07:00 - 09:00',
      status: 'confirmed',
    },
    {
      id: '2',
      date: '2024-03-22',
      time: '13:00 - 15:00',
      status: 'pending',
    },
  ];

  const handleCancel = (id: string) => {
    Alert.alert(
      'Xác nhận hủy',
      'Bạn có chắc chắn muốn hủy buổi học này?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            // Xử lý hủy lịch
            console.log('Hủy lịch:', id);
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Lịch học của tôi</Text>

        {bookings.map(booking => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <Text style={styles.bookingDate}>
                {new Date(booking.date).toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <View style={[
                styles.statusBadge,
                booking.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge
              ]}>
                <Text style={styles.statusText}>
                  {booking.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                </Text>
              </View>
            </View>

            <Text style={styles.bookingTime}>{booking.time}</Text>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancel(booking.id)}
            >
              <Text style={styles.cancelButtonText}>Hủy lịch</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0a7ea4',
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  confirmedBadge: {
    backgroundColor: '#e6f4ea',
  },
  pendingBadge: {
    backgroundColor: '#fff3e0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookingTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ff4d4f',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ff4d4f',
    fontSize: 14,
    fontWeight: '500',
  },
});