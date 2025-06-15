// components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface RegisterFormProps {
  onRegister: (data: RegisterData) => void;
  loading?: boolean;
}

interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  email: string;
}

export function RegisterForm({ onRegister, loading }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<RegisterData>>({});

  const validate = () => {
    const newErrors: Partial<RegisterData> = {};

    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      onRegister(formData);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Tên đăng nhập *"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        placeholder="Nhập tên đăng nhập"
        error={errors.username}
      />

      <Input
        label="Mật khẩu *"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        placeholder="Nhập mật khẩu"
        secureTextEntry
        error={errors.password}
      />

      <Input
        label="Xác nhận mật khẩu *"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        error={errors.confirmPassword}
      />

      <Input
        label="Họ và tên *"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        placeholder="Nhập họ và tên"
        error={errors.fullName}
      />

      <Input
        label="Số điện thoại"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <Input
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        placeholder="Nhập email"
        keyboardType="email-address"
        error={errors.email}
      />

      <Button
        title="Đăng ký"
        onPress={handleRegister}
        loading={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});