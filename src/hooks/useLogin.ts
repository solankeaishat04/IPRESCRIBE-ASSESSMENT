/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface Role {
  id: number;
  name: string;
  slug: string;
  default: number;
}

interface User {
  id: number;
  email: string;
  roles: Role[];
  first_name: string | null;
  last_name: string | null;
  // Add other properties from your API response
}

interface LoginResponseData {
  user: User;
  token: string;
  token_type: string;
}

interface LoginResponse {
  data: LoginResponseData;
  message: string;
  status: number;
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
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await api.post<LoginResponse>('/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Store token and user data in localStorage
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('userData', JSON.stringify(data.data.user));
      
      // Also set the token in axios defaults for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
      
      console.log('Login successful:', data.message);
    },
    onError: (error: any) => {
      console.error('Login error:', error.response?.data?.message || error.message);
    },
  });
};

// Export the api instance for use in other files
export { api };