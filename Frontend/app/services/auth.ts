import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  createdAt: string;
}

export const signUp = async (data: SignUpData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'An error occurred during sign up';
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'An error occurred during sign in';
  }
};

export const updateProfile = async (data: { fullName?: string; profilePicture?: string }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await axios.patch(`${API_URL}/updateProfile`, data, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    const updatedUser = { user: response.data.data, token: user.token };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'An error occurred while updating profile';
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): { user: User; token: string } | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
};