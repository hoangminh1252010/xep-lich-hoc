// app/(auth)/register.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { Card } from '../../components/common/Card';

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleRegister = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    email: string;
  }) => {
    try {
      setLoading(true);
      // Gọi API backend
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Đăng ký thành công');
setTimeout(() => {
  router.replace('/(auth)/login');
}, 2000);
      } else {
        Alert.alert('Lỗi', result.message || 'Đăng ký thất bại. Vui lòng thử lại.');
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
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <RegisterForm onRegister={handleRegister} loading={loading} />
        {message !== '' && (
  <Text style={styles.successMessage}>{message}</Text>
)}
        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.loginLinkText}>
            Đã có tài khoản? Đăng nhập
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
    padding: 20,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0a7ea4',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  loginLinkText: {
    color: '#0a7ea4',
    fontSize: 16,
  },
});