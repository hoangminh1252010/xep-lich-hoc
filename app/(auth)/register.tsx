// app/(auth)/register.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { Card } from '../../components/common/Card';

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);

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
      // Xử lý đăng ký
      console.log('Đăng ký với:', data);
      Alert.alert(
        'Thành công',
        'Đăng ký thành công! Vui lòng đăng nhập.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <RegisterForm onRegister={handleRegister} loading={loading} />
        
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