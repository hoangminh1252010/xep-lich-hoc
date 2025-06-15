// components/teacher/StudentBookingCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../common/Card';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

interface StudentBookingCardProps {
  booking: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    bookingTime: string;
    status: BookingStatus;
  };
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

export function StudentBookingCard({ booking, onConfirm, onCancel }: StudentBookingCardProps) {
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return '#52c41a';
      case 'cancelled':
        return '#ff4d4f';
      default:
        return '#faad14';
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Chờ xác nhận';
    }
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{booking.fullName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
          <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>{booking.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{booking.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Thời gian:</Text>
          <Text style={styles.value}>{booking.bookingTime}</Text>
        </View>
      </View>

      {booking.status === 'pending' && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={() => onConfirm(booking.id)}
          >
            <Text style={styles.buttonText}>Xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => onCancel(booking.id)}
          >
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontSize: 14,
    color: '#666',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#52c41a',
  },
  cancelButton: {
    backgroundColor: '#ff4d4f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});