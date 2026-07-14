import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AdminUser } from '../../types/user.types';

interface Props {
  user: AdminUser | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<Props> = ({ user, onClose, onConfirm, isDeleting }) => {
  const handleConfirm = async () => {
    if (!user) return;
    await onConfirm(user._id);
    onClose();
  };

  return (
    <Modal isOpen={!!user} onClose={onClose} title="Delete User" maxWidth="max-w-md">
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <div>
            <p className="text-sm text-text-primary">
              Are you sure you want to delete{' '}
              <span className="font-semibold">{user?.name}</span>?
            </p>
            <p className="mt-1 text-xs text-text-muted">{user?.email}</p>
            <p className="mt-2 text-xs text-text-secondary">
              This action cannot be undone. All data associated with this account will be permanently removed.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} loading={isDeleting}>
            Delete User
          </Button>
        </div>
      </div>
    </Modal>
  );
};
