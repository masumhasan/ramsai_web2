import React from 'react';
import { UserRole, SubscriptionStatus } from '../../types/user.types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-overlay-soft text-text-secondary',
  success: 'bg-accent-green/15 text-accent-green',
  warning: 'bg-accent-orange/15 text-accent-orange',
  danger: 'bg-red-500/15 text-red-400',
  info: 'bg-brand/15 text-accent-blue',
  purple: 'bg-accent-purple/15 text-accent-purple',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => {
  const map: Record<UserRole, { label: string; variant: BadgeProps['variant'] }> = {
    superadmin: { label: 'Super Admin', variant: 'purple' },
    admin: { label: 'Admin', variant: 'info' },
    user: { label: 'User', variant: 'default' },
  };
  const { label, variant } = map[role] ?? { label: role, variant: 'default' };
  return <Badge variant={variant}>{label}</Badge>;
};

export const SubscriptionBadge: React.FC<{ status: SubscriptionStatus }> = ({ status }) => {
  const map: Record<SubscriptionStatus, { label: string; variant: BadgeProps['variant'] }> = {
    active: { label: 'Active', variant: 'success' },
    trial: { label: 'Trial', variant: 'warning' },
    expired: { label: 'Expired', variant: 'danger' },
    inactive: { label: 'Inactive', variant: 'default' },
  };
  const { label, variant } = map[status] ?? { label: status, variant: 'default' };
  return <Badge variant={variant}>{label}</Badge>;
};
