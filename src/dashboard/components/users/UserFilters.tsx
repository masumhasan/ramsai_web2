import React from 'react';
import { Search } from 'lucide-react';
import { Input, Select } from '../ui/Input';
import { UserFilters as IUserFilters, UserRole } from '../../types/user.types';

interface Props {
  filters: IUserFilters;
  onChange: (updates: Partial<IUserFilters>) => void;
}

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'superadmin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Joined Date' },
  { value: 'lastActiveAt', label: 'Last Active' },
  { value: 'role', label: 'Role' },
  { value: 'name', label: 'Name' },
];

const ORDER_OPTIONS = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

export const UserFilters: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[220px] flex-1">
        <Input
          placeholder="Search name or email..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          icon={<Search size={16} />}
        />
      </div>
      <div className="w-40">
        <Select
          value={filters.role}
          onChange={(e) => onChange({ role: e.target.value as UserRole | '' })}
          options={ROLE_OPTIONS}
        />
      </div>
      <div className="w-40">
        <Select
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as IUserFilters['sortBy'] })}
          options={SORT_OPTIONS}
        />
      </div>
      <div className="w-36">
        <Select
          value={filters.sortOrder}
          onChange={(e) => onChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
          options={ORDER_OPTIONS}
        />
      </div>
    </div>
  );
};
