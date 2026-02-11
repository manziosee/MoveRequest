const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  register: (data: any) =>
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  forgotPassword: (email: string) =>
    fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    }),

  // Dashboard
  getDashboardStats: (token: string) =>
    fetch(`${API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Requests
  getRequests: (token: string, filters?: any) => {
    const params = new URLSearchParams(filters);
    return fetch(`${API_URL}/requests?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getRequestStats: (token: string) =>
    fetch(`${API_URL}/requests/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getRequest: (token: string, id: string) =>
    fetch(`${API_URL}/requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createRequest: (token: string, data: any) =>
    fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  updateRequest: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  cancelRequest: (token: string, id: string, reason: string) =>
    fetch(`${API_URL}/requests/${id}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    }),

  // Approvals
  getPendingApprovals: (token: string) =>
    fetch(`${API_URL}/approvals/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getApprovalStats: (token: string) =>
    fetch(`${API_URL}/approvals/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  approveRequest: (token: string, requestId: string, comment: string) =>
    fetch(`${API_URL}/approvals/${requestId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    }),

  rejectRequest: (token: string, requestId: string, reason: string) =>
    fetch(`${API_URL}/approvals/${requestId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    }),

  bulkApprove: (token: string, requestIds: string[]) =>
    fetch(`${API_URL}/approvals/bulk-approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requestIds }),
    }),

  // Notifications
  getNotifications: (token: string) =>
    fetch(`${API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUnreadCount: (token: string) =>
    fetch(`${API_URL}/notifications/unread-count`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  markAsRead: (token: string, id: string) =>
    fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  markAllAsRead: (token: string) =>
    fetch(`${API_URL}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Users
  getUsers: (token: string) =>
    fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUserStats: (token: string) =>
    fetch(`${API_URL}/users/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getProfile: (token: string) =>
    fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getActivity: (token: string) =>
    fetch(`${API_URL}/users/activity`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateProfile: (token: string, data: any) =>
    fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  createUser: (token: string, data: any) =>
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  updateUser: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  changePassword: (token: string, newPassword: string) =>
    fetch(`${API_URL}/users/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
    }),

  toggleUserActive: (token: string, id: string) =>
    fetch(`${API_URL}/users/${id}/toggle-active`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Admin - Categories
  getCategories: (token: string) =>
    fetch(`${API_URL}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createCategory: (token: string, data: any) =>
    fetch(`${API_URL}/admin/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  updateCategory: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  deleteCategory: (token: string, id: string) =>
    fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Admin - Departments
  getDepartments: (token: string) =>
    fetch(`${API_URL}/admin/departments`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createDepartment: (token: string, data: any) =>
    fetch(`${API_URL}/admin/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  updateDepartment: (token: string, id: string, data: any) =>
    fetch(`${API_URL}/admin/departments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  deleteDepartment: (token: string, id: string) =>
    fetch(`${API_URL}/admin/departments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  toggleDepartmentStatus: (token: string, id: string) =>
    fetch(`${API_URL}/admin/departments/${id}/toggle-status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Admin - System
  getSystemConfig: (token: string) =>
    fetch(`${API_URL}/admin/system-config`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateSystemConfig: (token: string, data: any) =>
    fetch(`${API_URL}/admin/system-config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getSystemStats: (token: string) =>
    fetch(`${API_URL}/admin/system-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Reports
  getReportStats: (token: string) =>
    fetch(`${API_URL}/reports/dashboard-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMonthlyTrends: (token: string) =>
    fetch(`${API_URL}/reports/monthly-trends`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getDepartmentStats: (token: string) =>
    fetch(`${API_URL}/reports/department-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getStatusDistribution: (token: string) =>
    fetch(`${API_URL}/reports/status-distribution`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPriorityBreakdown: (token: string) =>
    fetch(`${API_URL}/reports/priority-breakdown`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  exportReport: (token: string, format: string = 'csv') =>
    fetch(`${API_URL}/reports/export?format=${format}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Health
  health: () => fetch(`${API_URL}/health`),
};
