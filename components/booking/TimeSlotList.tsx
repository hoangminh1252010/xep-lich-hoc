// components/booking/TimeSlotList.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TimeSlotCard } from './TimeSlotCard';

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  maxStudents: number;
}

interface TimeSlotListProps {
  timeSlots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
}

export function TimeSlotList({
  timeSlots,
  selectedSlotId,
  onSelectSlot,
}: TimeSlotListProps) {
  const renderItem = ({ item }: { item: TimeSlot }) => (
    <TimeSlotCard
      time={item.time}
      available={item.available}
      maxStudents={item.maxStudents}
      isSelected={selectedSlotId === item.id}
      onSelect={() => onSelectSlot(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn buổi học</Text>
      <FlatList
        data={timeSlots}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
});