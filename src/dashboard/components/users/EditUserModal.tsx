import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { AdminUser, UserRole, SubscriptionStatus } from '../../types/user.types';
import { useAuthStore } from '../../store/auth.store';

interface Props {
  user: AdminUser | null;
  onClose: () => void;
  onSave: (id: string, updates: Record<string, unknown>, role?: UserRole) => Promise<void>;
  isSaving: boolean;
}

const ROLE_OPTIONS = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'superadmin', label: 'Super Admin' },
];

const SUB_OPTIONS: { value: SubscriptionStatus; label: string }[] = [
  { value: 'inactive', label: 'Inactive' },
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Trial' },
  { value: 'expired', label: 'Expired' },
];

export const EditUserModal: React.FC<Props> = ({ user, onClose, onSave, isSaving }) => {
  const { user: currentAdmin } = useAuthStore();
  const isSuperAdmin = currentAdmin?.role === 'superadmin';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('inactive');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setSubscriptionStatus(user.subscriptionStatus);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updates: Record<string, unknown> = { name, subscriptionStatus };
    if (isSuperAdmin) updates.email = email;

    const roleChanged = role !== user.role;
    await onSave(user._id, updates, roleChanged ? role : undefined);
    onClose();
  };

  return (
    <Modal isOpen={!!user} onClose={onClose} title="Edit User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isSuperAdmin}
          required
        />
        <Select
          label="Subscription Status"
          value={subscriptionStatus}
          onChange={(e) => setSubscriptionStatus(e.target.value as SubscriptionStatus)}
          options={SUB_OPTIONS}
        />
        {isSuperAdmin && (
          <Select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            options={ROLE_OPTIONS}
          />
        )}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isSaving}>Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};
