// components/booking/BookingCalendar.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface BookingCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  markedDates?: { [date: string]: any };
}

export function BookingCalendar({
  selectedDate,
  onSelectDate,
  markedDates,
}: BookingCalendarProps) {
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => onSelectDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            selectedColor: '#0a7ea4',
          },
        }}
        theme={{
          todayTextColor: '#0a7ea4',
          selectedDayBackgroundColor: '#0a7ea4',
          arrowColor: '#0a7ea4',
          dotColor: '#0a7ea4',
          selectedDotColor: '#fff',
        }}
        minDate={new Date().toISOString().split('T')[0]}
        maxDate="2024-12-31"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});