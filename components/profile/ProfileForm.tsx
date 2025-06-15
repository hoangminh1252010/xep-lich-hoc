import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface ProfileFormProps {
  initialData: {
    fullName: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  onSave: (data: any) => void;
  loading?: boolean;
}

export function ProfileForm({ initialData, onSave, loading }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};

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

  const handleSave = () => {
    if (validate()) {
      onSave(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <Image
          source={formData.avatar ? { uri: formData.avatar } : require('../../assets/images/avatar.png')}
          style={styles.avatar}
        />
        {isEditing && (
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarText}>Đổi ảnh</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.form}>
        <Input
          label="Họ và tên"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          editable={isEditing}
          error={errors.fullName}
        />

        <Input
          label="Số điện thoại"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          editable={isEditing}
          error={errors.phone}
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          editable={isEditing}
          error={errors.email}
        />

        {isEditing ? (
          <View style={styles.buttonContainer}>
            <Button
              title="Hủy"
              onPress={handleCancel}
              variant="secondary"
              style={styles.button}
            />
            <Button
              title="Lưu"
              onPress={handleSave}
              loading={loading}
              style={styles.button}
            />
          </View>
        ) : (
          <Button
            title="Chỉnh sửa"
            onPress={() => setIsEditing(true)}
            variant="primary"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changeAvatarButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  changeAvatarText: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});