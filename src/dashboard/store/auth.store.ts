import { create } from 'zustand';
import { AuthUser } from '../api/auth.api';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
}

const stored = (): { token: string | null; user: AuthUser | null } => {
  try {
    return {
      token: localStorage.getItem('admin_token'),
      user: JSON.parse(localStorage.getItem('admin_user') ?? 'null'),
    };
  } catch {
    return { token: null, user: null };
  }
};

const { token: storedToken, user: storedUser } = stored();

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: storedUser,
  isAuthenticated: !!storedToken && !!storedUser,

  setAuth: (token, user) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
