import { apiClient } from './client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>('/admin/auth/login', payload).then((r) => r.data),

  sendOtp: (email: string) =>
    apiClient.post<{ message: string }>('/admin/auth/forgot-password', { email }).then((r) => r.data),

  verifyOtp: (email: string, otp: string) =>
    apiClient.post<{ message: string }>('/admin/auth/verify-otp', { email, otp }).then((r) => r.data),

  resetPassword: (email: string, otp: string, newPassword: string) =>
    apiClient
      .post<{ message: string }>('/admin/auth/reset-password', { email, otp, newPassword })
      .then((r) => r.data),
};
