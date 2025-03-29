
import api from './index';

export const register = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (profileData: {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};
