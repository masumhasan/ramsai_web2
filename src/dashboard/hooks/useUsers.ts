import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import { UserFilters, UpdateUserPayload, UserRole } from '../types/user.types';

const DEFAULT_FILTERS: UserFilters = {
  search: '',
  role: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 20,
};

export const useUsers = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<UserFilters>(DEFAULT_FILTERS);

  const query = useQuery({
    queryKey: ['admin-users', filters],
    queryFn: () => usersApi.getUsers(filters),
    staleTime: 30_000,
  });

  const updateFilters = useCallback((updates: Partial<UserFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates, page: updates.page ?? 1 }));
  }, []);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin-users'] });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      usersApi.updateUser(id, payload),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: invalidate,
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      usersApi.updateRole(id, role),
    onSuccess: invalidate,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    filters,
    updateFilters,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    updateRole: roleMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isRoleUpdating: roleMutation.isPending,
  };
};
