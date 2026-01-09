/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
  email: string;
  password: string;
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://stagingapi.iprescribe.online/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const useLogin = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (response) => {
      const { user, token } = response.data;
      
      // Use auth context to login
      authLogin(token, user);
      
      console.log('Login successful:', response.message);
      
      // Navigate to dashboard
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      console.error('Login error:', message);
      throw new Error(message);
    },
  });
};

// Export the api instance for use in other files
export { api };