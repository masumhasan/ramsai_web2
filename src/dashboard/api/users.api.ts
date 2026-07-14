import { apiClient } from './client';
import { AdminUser, UserFilters, UserListResponse, UpdateUserPayload, UserRole } from '../types/user.types';

export const usersApi = {
  getUsers: (filters: Partial<UserFilters>) =>
    apiClient
      .get<UserListResponse>('/admin/users', { params: filters })
      .then((r) => r.data),

  getUser: (id: string) =>
    apiClient.get<{ user: AdminUser }>(`/admin/users/${id}`).then((r) => r.data.user),

  updateUser: (id: string, payload: UpdateUserPayload) =>
    apiClient
      .put<{ message: string; user: AdminUser }>(`/admin/users/${id}`, payload)
      .then((r) => r.data),

  deleteUser: (id: string) =>
    apiClient.delete<{ message: string }>(`/admin/users/${id}`).then((r) => r.data),

  updateRole: (id: string, role: UserRole) =>
    apiClient
      .patch<{ message: string; user: AdminUser }>(`/admin/users/${id}/role`, { role })
      .then((r) => r.data),
};
