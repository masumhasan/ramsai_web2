import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, LogOut, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

const NAV_ITEMS = [
  { to: '/dashboard/users', icon: Users, label: 'Users' },
];

export const Sidebar: React.FC = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/dashboard/login');
  };

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border-soft bg-surface">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border-soft px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
          <Shield size={16} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-text-primary">GoCal Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand/15 text-accent-blue'
                  : 'text-text-secondary hover:bg-overlay-soft hover:text-text-primary'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-border-soft px-4 py-4">
        <div className="mb-3 rounded-lg bg-surface-raised px-3 py-2.5">
          <p className="truncate text-xs font-medium text-text-primary">{user?.name}</p>
          <p className="truncate text-xs text-text-muted">{user?.email}</p>
          <p className="mt-1 text-xs capitalize text-accent-purple">{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-overlay-soft hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
};
