// components/booking/TimeSlotCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TimeSlotCardProps {
  time: string;
  available: number;
  maxStudents: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function TimeSlotCard({
  time,
  available,
  maxStudents,
  isSelected,
  onSelect,
}: TimeSlotCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer
      ]}
      onPress={onSelect}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.available}>
          Còn {available}/{maxStudents} chỗ
        </Text>
      </View>
      
      <View style={styles.statusContainer}>
        {available === 0 ? (
          <Text style={styles.fullText}>Đã đầy</Text>
        ) : (
          <View style={[
            styles.availabilityIndicator,
            available <= 2 ? styles.lowAvailability : styles.highAvailability
          ]} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedContainer: {
    borderColor: '#0a7ea4',
    backgroundColor: '#f0f9ff',
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  available: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statusContainer: {
    marginLeft: 10,
  },
  availabilityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  highAvailability: {
    backgroundColor: '#52c41a',
  },
  lowAvailability: {
    backgroundColor: '#faad14',
  },
  fullText: {
    color: '#ff4d4f',
    fontSize: 14,
    fontWeight: '500',
  },
});