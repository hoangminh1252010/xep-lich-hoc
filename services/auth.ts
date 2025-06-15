// services/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.143:5000/api';

export const authService = {
  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },

  async register(userData: {
    username: string;
    password: string;
    fullName: string;
    phone?: string;
    email?: string;
  }) {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  async saveToken(token: string) {
    await AsyncStorage.setItem('token', token);
  },

  async getToken() {
    return await AsyncStorage.getItem('token');
  },

  async logout() {
    await AsyncStorage.removeItem('token');
  },
};