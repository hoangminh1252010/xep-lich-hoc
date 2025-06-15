// app/(tabs)/teacher.tsx
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { BookingFilter } from '../../components/teacher/BookingFilter';
import { StudentBookingCard } from '../../components/teacher/StudentBookingCard';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  bookingTime: string;
  status: BookingStatus;
}

export default function TeacherScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      fullName: 'Nguyễn Văn A',
      phone: '0123456789',
      email: 'nguyenvana@email.com',
      bookingTime: '20/03/2024 - 07:00-09:00',
      status: 'pending',
    },
    {
      id: '2',
      fullName: 'Trần Thị B',
      phone: '0987654321',
      email: 'tranthib@email.com',
      bookingTime: '20/03/2024 - 09:00-11:00',
      status: 'confirmed',
    },
    // Thêm dữ liệu mẫu khác
  ]);

  const handleConfirm = (id: string) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xác nhận buổi học này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            // Xử lý xác nhận
            setBookings(bookings.map(booking =>
              booking.id === id ? { ...booking, status: 'confirmed' } : booking
            ));
          },
        },
      ],
    );
  };

  const handleCancel = (id: string) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn hủy buổi học này?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            // Xử lý hủy
            setBookings(bookings.map(booking =>
              booking.id === id ? { ...booking, status: 'cancelled' } : booking
            ));
          },
        },
      ],
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <BookingFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterChange={setStatusFilter}
        />

        {filteredBookings.map(booking => (
          <StudentBookingCard
            key={booking.id}
            booking={booking}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
});