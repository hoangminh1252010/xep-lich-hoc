import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#666' : '#999',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#ddd',
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Đặt lịch',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-booking"
        options={{
          title: 'Lịch của tôi',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teacher"
        options={{
          title: 'Quản lý',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}