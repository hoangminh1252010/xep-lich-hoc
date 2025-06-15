// // components/auth/LoginForm.tsx
// import React, { useState } from 'react';
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => void }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (!username || !password) {
//       Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
//       return;
//     }
//     onLogin(username, password);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Tên đăng nhập"
//         value={username}
//         onChangeText={setUsername}
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mật khẩu"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Đăng nhập</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#0a7ea4',
//     height: 50,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  loading?: boolean;
}

export function LoginForm({ onLogin, loading }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const validate = () => {
    const newErrors = {
      username: '',
      password: '',
    };

    if (!username) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = () => {
    if (validate()) {
      onLogin(username, password);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        placeholder="Nhập tên đăng nhập"
        error={errors.username}
      />

      <Input
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        placeholder="Nhập mật khẩu"
        secureTextEntry
        error={errors.password}
      />

      <Button
        title="Đăng nhập"
        onPress={handleLogin}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});