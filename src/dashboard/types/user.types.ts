export type UserRole = 'superadmin' | 'admin' | 'user';
export type SubscriptionStatus = 'inactive' | 'active' | 'trial' | 'expired';

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastActiveAt?: string;
  subscriptionStatus: SubscriptionStatus;
  hasCompletedOnboarding: boolean;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
}

export interface UserListResponse {
  users: AdminUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserFilters {
  search: string;
  role: UserRole | '';
  sortBy: 'createdAt' | 'lastActiveAt' | 'role' | 'name';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface UpdateUserPayload {
  name?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  subscriptionStatus?: SubscriptionStatus;
  hasCompletedOnboarding?: boolean;
  email?: string;
}
