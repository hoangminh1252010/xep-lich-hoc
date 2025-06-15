import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ProfileForm } from '../../components/profile/ProfileForm';
import { ProfileStats } from '../../components/profile/ProfileStats';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);

  const userData = {
    fullName: 'Nguyễn Văn A',
    phone: '0123456789',
    email: 'nguyenvana@email.com',
    avatar: 'https://via.placeholder.com/150',
  };

  const stats = {
    totalBookings: 10,
    completedBookings: 7,
    upcomingBookings: 3,
  };

  const handleSaveProfile = async (data: any) => {
    try {
      setLoading(true);
      console.log('Cập nhật thông tin:', data);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
    } catch (error) {
      Alert.alert('Lỗi', 'Cập nhật thông tin thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            router.replace('/(auth)/login');
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <ProfileForm
            initialData={userData}
            onSave={handleSaveProfile}
            loading={loading}
          />
        </Card>

        <Card>
          <ProfileStats {...stats} />
        </Card>

        <Button
          title="Đăng xuất"
          onPress={handleLogout}
          variant="danger"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
});