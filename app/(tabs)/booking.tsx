// app/(tabs)/booking.tsx
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { BookingCalendar } from '../../components/booking/BookingCalendar';
import { TimeSlotList } from '../../components/booking/TimeSlotList';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

// Dữ liệu mẫu
const MOCK_TIME_SLOTS = [
  { id: '1', time: '07:00 - 09:00', available: 3, maxStudents: 5 },
  { id: '2', time: '09:00 - 11:00', available: 5, maxStudents: 5 },
  { id: '3', time: '13:00 - 15:00', available: 2, maxStudents: 5 },
  { id: '4', time: '15:00 - 17:00', available: 4, maxStudents: 5 },
  { id: '5', time: '17:00 - 19:00', available: 5, maxStudents: 5 },
];

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlotId) {
      Alert.alert('Lỗi', 'Vui lòng chọn ngày và buổi học');
      return;
    }

    try {
      setLoading(true);
      // Xử lý đặt lịch
      console.log('Đặt lịch:', {
        date: selectedDate,
        slotId: selectedSlotId,
      });

      Alert.alert(
        'Thành công',
        'Đặt lịch học thành công!',
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedDate('');
              setSelectedSlotId(null);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Đặt lịch thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.calendarCard}>
          <BookingCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </Card>

        <Card>
          <TimeSlotList
            timeSlots={MOCK_TIME_SLOTS}
            selectedSlotId={selectedSlotId}
            onSelectSlot={setSelectedSlotId}
          />
        </Card>

        <Button
          title="Đặt lịch học"
          onPress={handleBooking}
          loading={loading}
          disabled={!selectedDate || !selectedSlotId}
        />
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
  calendarCard: {
    marginBottom: 20,
  },
});