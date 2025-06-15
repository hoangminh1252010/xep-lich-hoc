import { Picker as RNPicker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PickerItem {
  label: string;
  value: string;
}

interface PickerProps<T extends string> {
  items: PickerItem[];
  onValueChange: (value: T) => void;
  placeholder?: string;
  style?: any;
}

export function Picker<T extends string>({ items, onValueChange, placeholder, style }: PickerProps<T>) {
  return (
    <View style={[styles.container, style]}>
      <RNPicker
        onValueChange={(value) => onValueChange(value as T)}
        style={styles.picker}
      >
        {placeholder && (
          <RNPicker.Item
            label={placeholder}
            value=""
            enabled={false}
          />
        )}
        {items.map((item, index) => (
          <RNPicker.Item
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </RNPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    height: 50,
  },
}); 