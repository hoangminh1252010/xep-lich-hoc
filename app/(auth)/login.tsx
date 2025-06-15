// // app/(auth)/login.tsx
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import { Alert, StyleSheet, Text, View } from 'react-native';
// import { LoginForm } from '../../components/auth/LoginForm';

// export default function LoginScreen() {
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (username: string, password: string) => {
//     try {
//       setLoading(true);
//       // Tạm thời chỉ log ra console để test
//       console.log('Đăng nhập với:', { username, password });
//       // Sau này sẽ thêm logic gọi API
//       router.replace('/(tabs)');
//     } catch (error) {
//       Alert.alert('Lỗi', 'Đăng nhập thất bại');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Đăng nhập</Text>
//       <LoginForm onLogin={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
// });

// app/(auth)/login.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoginForm } from '../../components/auth/LoginForm';
import { Card } from '../../components/common/Card';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        // Có thể lưu token vào AsyncStorage nếu muốn
        // await AsyncStorage.setItem('token', result.token);
        router.replace('/(tabs)');
      } else {
        Alert.alert('Lỗi', result.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối tới server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Đăng nhập</Text>
        <LoginForm onLogin={handleLogin} loading={loading} />
        
        <TouchableOpacity 
          style={styles.registerLink}
          onPress={() => router.push('/(auth)/register')}
        >
          <Text style={styles.registerLinkText}>
            Chưa có tài khoản? Đăng ký ngay
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0a7ea4',
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#0a7ea4',
    fontSize: 16,
  },
});