import { create } from 'zustand';
import api from './api';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/shared/types';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    localStorage.setItem('token', data.token);
    set({ user: data.user, isAuthenticated: true });
  },
  register: async (data) => {
    await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
}));

