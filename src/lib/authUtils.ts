
import axios from 'axios';

// Define the API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Define the types for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Real authentication service that calls our API
export const authService = {
  loginWithGoogle: async (googleToken: string): Promise<{token: string, user: User}> => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, { token: googleToken });
      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Google login failed');
      }
      throw new Error('Google login failed. Please check your connection.');
    }
  },
  login: async (credentials: LoginCredentials): Promise<{token: string, user: User}> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Login failed. Please check your connection.');
    }
  },

  register: async (credentials: RegisterCredentials): Promise<{token: string, user: User}> => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, credentials);
      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Registration failed. Please check your connection.');
    }
  },

  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser: (): User | null => {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // Get user profile from API
  getProfile: async (): Promise<User> => {
    try {
      const response = await axios.get(`${API_URL}/users/me`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        authService.logout();
      }
      throw new Error('Failed to fetch user profile');
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await axios.put(`${API_URL}/users/me`, userData);

      // Update stored user data
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update profile');
      }
      throw new Error('Failed to update profile. Please check your connection.');
    }
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await axios.put(`${API_URL}/users/password`, { currentPassword, newPassword });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to change password');
      }
      throw new Error('Failed to change password. Please check your connection.');
    }
  }
};

// Setup axios interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);
