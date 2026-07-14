import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UserFilters } from '../components/users/UserFilters';
import { UserTable } from '../components/users/UserTable';
import { EditUserModal } from '../components/users/EditUserModal';
import { DeleteConfirmModal } from '../components/users/DeleteConfirmModal';
import { Button } from '../components/ui/Button';
import { useUsers } from '../hooks/useUsers';
import { useAuthStore } from '../store/auth.store';
import { AdminUser, UserRole, UpdateUserPayload } from '../types/user.types';

export const UsersPage: React.FC = () => {
  const { user: currentAdmin } = useAuthStore();
  const {
    data, isLoading, isError, filters, updateFilters,
    updateUser, deleteUser, updateRole,
    isUpdating, isDeleting,
  } = useUsers();

  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const handleSave = async (id: string, updates: Record<string, unknown>, role?: UserRole) => {
    await updateUser({ id, payload: updates as UpdateUserPayload });
    if (role) await updateRole({ id, role });
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
  };

  const { users = [], pagination } = data ?? {};

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">User Management</h1>
          {pagination && (
            <p className="mt-0.5 text-sm text-text-muted">{pagination.total} total users</p>
          )}
        </div>
      </div>

      {/* Filters */}
      <UserFilters filters={filters} onChange={updateFilters} />

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 py-12 text-center">
          <p className="text-sm text-red-400">Failed to load users. Please try again.</p>
        </div>
      ) : (
        <UserTable
          users={users}
          currentUserId={currentAdmin?.id}
          onEdit={setEditTarget}
          onDelete={setDeleteTarget}
        />
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => updateFilters({ page: pagination.page - 1 })}
            >
              <ChevronLeft size={14} /> Prev
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => updateFilters({ page: pagination.page + 1 })}
            >
              Next <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <EditUserModal
        user={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
        isSaving={isUpdating}
      />
      <DeleteConfirmModal
        user={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};
