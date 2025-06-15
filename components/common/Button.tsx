// // components/common/Button.tsx
// import React from 'react';
// import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

// interface ButtonProps {
//   title: string;
//   onPress: () => void;
//   loading?: boolean;
//   disabled?: boolean;
// }

// export function Button({ title, onPress, loading, disabled }: ButtonProps) {
//   return (
//     <TouchableOpacity
//       style={[styles.button, disabled && styles.disabled]}
//       onPress={onPress}
//       disabled={disabled || loading}
//     >
//       {loading ? (
//         <ActivityIndicator color="#fff" />
//       ) : (
//         <Text style={styles.text}>{title}</Text>
//       )}
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#0a7ea4',
//     height: 50,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   disabled: {
//     opacity: 0.5,
//   },
//   text: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });


// components/common/Button.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading, 
  disabled,
  style 
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#0a7ea4',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  danger: {
    backgroundColor: '#ff4d4f',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#0a7ea4',
  },
  dangerText: {
    color: '#fff',
  },
});