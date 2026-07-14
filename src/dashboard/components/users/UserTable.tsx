import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { AdminUser } from '../../types/user.types';
import { RoleBadge, SubscriptionBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface Props {
  users: AdminUser[];
  currentUserId?: string;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

const fmtRelative = (d?: string) => {
  if (!d) return '—';
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const UserTable: React.FC<Props> = ({ users, currentUserId, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-text-muted">
        <p className="text-sm">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border-soft">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-soft bg-surface">
            <th className="px-4 py-3 text-left font-medium text-text-muted">Name</th>
            <th className="px-4 py-3 text-left font-medium text-text-muted">Email</th>
            <th className="px-4 py-3 text-left font-medium text-text-muted">Role</th>
            <th className="px-4 py-3 text-left font-medium text-text-muted">Joined</th>
            <th className="px-4 py-3 text-left font-medium text-text-muted">Last Active</th>
            <th className="px-4 py-3 text-left font-medium text-text-muted">Subscription</th>
            <th className="px-4 py-3 text-right font-medium text-text-muted">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-border-soft bg-dark-card hover:bg-surface-raised transition-colors"
            >
              <td className="px-4 py-3 font-medium text-text-primary">{user.name}</td>
              <td className="px-4 py-3 text-text-secondary">{user.email}</td>
              <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
              <td className="px-4 py-3 text-text-secondary">{fmt(user.createdAt)}</td>
              <td className="px-4 py-3 text-text-secondary">{fmtRelative(user.lastActiveAt)}</td>
              <td className="px-4 py-3"><SubscriptionBadge status={user.subscriptionStatus} /></td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(user)} title="Edit user">
                    <Pencil size={14} />
                  </Button>
                  {user._id !== currentUserId && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(user)} title="Delete user"
                      className="hover:text-red-400">
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
