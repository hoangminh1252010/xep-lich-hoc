// components/teacher/BookingFilter.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../common/Input';
import { Picker } from '../common/Picker';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

interface BookingFilterProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterChange: (filter: BookingStatus | 'all') => void;
}

export function BookingFilter({
  searchQuery,
  onSearchChange,
  onFilterChange,
}: BookingFilterProps) {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Tìm kiếm học viên..."
        value={searchQuery}
        onChangeText={onSearchChange}
        style={styles.searchInput}
      />
      <Picker<BookingStatus | 'all'>
        items={[
          { label: 'Tất cả', value: 'all' },
          { label: 'Chờ xác nhận', value: 'pending' },
          { label: 'Đã xác nhận', value: 'confirmed' },
          { label: 'Đã hủy', value: 'cancelled' },
        ]}
        onValueChange={onFilterChange}
        placeholder="Lọc theo trạng thái"
        style={styles.filterPicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchInput: {
    marginBottom: 10,
  },
  filterPicker: {
    marginBottom: 0,
  },
});